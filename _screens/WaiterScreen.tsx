import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import menuData, { DataMenuItem } from "../_data/menuItems";
import { palette, waiterStyles as s } from "../styles/styles";

const MENU_KEY = "classy_menu_items_v1";
const ORDERS_KEY = "classy_table_orders_v1";

interface OrderLine {
  id: string;
  name: string;
  quantity: number;
}

interface TableOrder {
  id: string;
  tableNumber: string;
  guestCount: number;
  lines: OrderLine[];
  createdAt: string;
}

const isMenuItem = (value: unknown): value is DataMenuItem => {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<DataMenuItem>;
  return (
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    typeof item.description === "string" &&
    typeof item.price === "number" &&
    (item.course === "Starter" ||
      item.course === "Main Course" ||
      item.course === "Dessert")
  );
};

const isOrder = (value: unknown): value is TableOrder => {
  if (!value || typeof value !== "object") return false;
  const order = value as Partial<TableOrder>;
  return (
    typeof order.id === "string" &&
    typeof order.tableNumber === "string" &&
    typeof order.guestCount === "number" &&
    typeof order.createdAt === "string" &&
    Array.isArray(order.lines) &&
    order.lines.every(
      (line) =>
        line &&
        typeof line.id === "string" &&
        typeof line.name === "string" &&
        typeof line.quantity === "number",
    )
  );
};

const readMenu = (raw: string | null): DataMenuItem[] => {
  if (!raw) return menuData;
  const value: unknown = JSON.parse(raw);
  if (!Array.isArray(value) || !value.every(isMenuItem)) {
    throw new Error("The saved menu could not be read.");
  }
  return value;
};

const readOrders = (raw: string | null): TableOrder[] => {
  if (!raw) return [];
  const value: unknown = JSON.parse(raw);
  if (!Array.isArray(value) || !value.every(isOrder)) {
    throw new Error("The saved table orders could not be read.");
  }
  return value;
};

export default function WaiterScreen({ navigation }: any) {
  const [menu, setMenu] = useState<DataMenuItem[]>(menuData);
  const [orders, setOrders] = useState<TableOrder[]>([]);
  const [tableNumber, setTableNumber] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [savedMenu, savedOrders] = await Promise.all([
        AsyncStorage.getItem(MENU_KEY),
        AsyncStorage.getItem(ORDERS_KEY),
      ]);
      setMenu(readMenu(savedMenu));
      setOrders(readOrders(savedOrders));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Please try again.";
      Alert.alert("Unable to load service data", message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    const unsubscribe = navigation.addListener?.("focus", loadData);
    return unsubscribe;
  }, [navigation, loadData]);

  const totalItems = useMemo(
    () =>
      Object.values(quantities).reduce(
        (total, quantity) => total + quantity,
        0,
      ),
    [quantities],
  );

  const updateQuantity = (itemId: string, change: number) => {
    setQuantities((current) => {
      const quantity = Math.max(0, (current[itemId] || 0) + change);
      const next = { ...current };
      if (quantity === 0) delete next[itemId];
      else next[itemId] = quantity;
      return next;
    });
  };

  const saveOrder = async () => {
    const table = tableNumber.trim();
    const guests = Number(guestCount);
    const lines = menu
      .filter((item) => (quantities[item.id] || 0) > 0)
      .map((item) => ({
        id: item.id,
        name: item.name,
        quantity: quantities[item.id],
      }));

    if (!table || !/^\d+$/.test(table) || Number(table) < 1) {
      Alert.alert("Table required", "Enter a valid table number to continue.");
      return;
    }
    if (!Number.isInteger(guests) || guests < 1) {
      Alert.alert(
        "Guest count required",
        "Enter how many guests are seated at this table.",
      );
      return;
    }
    if (!lines.length) {
      Alert.alert(
        "Add a dish",
        "Choose at least one menu item for this table.",
      );
      return;
    }

    setSaving(true);
    try {
      const savedOrders = await AsyncStorage.getItem(ORDERS_KEY);
      const nextOrders = [
        {
          id: `${Date.now()}`,
          tableNumber: table,
          guestCount: guests,
          lines,
          createdAt: new Date().toISOString(),
        },
        ...readOrders(savedOrders),
      ];
      await AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(nextOrders));
      setOrders(nextOrders);
      setTableNumber("");
      setGuestCount("");
      setQuantities({});
      Alert.alert("Order recorded", `Table ${table}'s order has been saved.`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Please try again.";
      Alert.alert("Could not save order", message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={s.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={palette.canvas} />
      <View style={s.header}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => navigation.goBack()}
          style={s.back}
        >
          <Text style={s.backText}>‹</Text>
        </TouchableOpacity>
        <View>
          <Text style={s.eyebrow}>FRONT OF HOUSE</Text>
          <Text style={s.title}>Table service</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={s.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={s.hero}>
          <Text style={s.heroEyebrow}>A NOTE FOR THE KITCHEN</Text>
          <Text style={s.heroTitle}>Every table, beautifully served.</Text>
          <Text style={s.heroCopy}>
            Capture the table, guest count and dishes in one simple ticket.
          </Text>
        </View>

        <View style={s.sectionHeading}>
          <Text style={s.sectionTitle}>New table order</Text>
          <Text style={s.sectionNote}>ORDER DETAILS</Text>
        </View>
        <View style={s.formCard}>
          <View style={s.fieldRow}>
            <View style={s.field}>
              <Text style={s.label}>TABLE NUMBER</Text>
              <TextInput
                accessibilityLabel="Table number"
                value={tableNumber}
                onChangeText={setTableNumber}
                placeholder="e.g. 8"
                placeholderTextColor={palette.muted}
                keyboardType="number-pad"
                style={s.input}
              />
            </View>
            <View style={s.field}>
              <Text style={s.label}>NUMBER OF GUESTS</Text>
              <TextInput
                accessibilityLabel="Number of guests"
                value={guestCount}
                onChangeText={setGuestCount}
                placeholder="e.g. 4"
                placeholderTextColor={palette.muted}
                keyboardType="number-pad"
                style={s.input}
              />
            </View>
          </View>

          <View style={s.menuHeading}>
            <View>
              <Text style={s.menuTitle}>Choose their dishes</Text>
              <Text style={s.menuCaption}>
                Add the quantity ordered for each dish.
              </Text>
            </View>
            <View style={s.itemCount}>
              <Text style={s.itemCountText}>{totalItems}</Text>
            </View>
          </View>

          {menu.map((item) => {
            const quantity = quantities[item.id] || 0;
            return (
              <View key={item.id} style={s.dishRow}>
                <View style={s.dishInfo}>
                  <Text style={s.dishName}>{item.name}</Text>
                  <Text style={s.dishMeta}>
                    {item.course} · R{item.price.toFixed(2)}
                  </Text>
                </View>
                <View style={s.quantityControl}>
                  <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityLabel={`Remove one ${item.name}`}
                    onPress={() => updateQuantity(item.id, -1)}
                    style={s.quantityButton}
                  >
                    <Text style={s.quantityButtonText}>−</Text>
                  </TouchableOpacity>
                  <Text style={s.quantity}>{quantity}</Text>
                  <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityLabel={`Add one ${item.name}`}
                    onPress={() => updateQuantity(item.id, 1)}
                    style={[s.quantityButton, s.quantityButtonActive]}
                  >
                    <Text
                      style={[s.quantityButtonText, s.quantityButtonTextActive]}
                    >
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}

          <TouchableOpacity
            accessibilityRole="button"
            disabled={saving || loading}
            onPress={saveOrder}
            style={[s.saveButton, (saving || loading) && s.saveButtonDisabled]}
          >
            <Text style={s.saveButtonText}>
              {saving
                ? "SAVING ORDER…"
                : `RECORD TABLE ORDER  ·  ${totalItems} ITEMS`}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={s.sectionHeading}>
          <Text style={s.sectionTitle}>Recent tickets</Text>
          <Text style={s.sectionNote}>{orders.length} SAVED</Text>
        </View>
        {loading ? (
          <Text style={s.emptyText}>Loading table orders…</Text>
        ) : orders.length ? (
          orders.slice(0, 8).map((order) => (
            <View key={order.id} style={s.orderCard}>
              <View style={s.orderTop}>
                <View style={s.orderTableMark}>
                  <Text style={s.orderTableMarkText}>{order.tableNumber}</Text>
                </View>
                <View style={s.orderHeading}>
                  <Text style={s.orderTitle}>Table {order.tableNumber}</Text>
                  <Text style={s.orderMeta}>
                    {order.guestCount}{" "}
                    {order.guestCount === 1 ? "guest" : "guests"} ·{" "}
                    {order.lines.reduce((sum, line) => sum + line.quantity, 0)}{" "}
                    items
                  </Text>
                </View>
                <Text style={s.orderTime}>
                  {new Date(order.createdAt).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
              <Text style={s.orderDishes}>
                {order.lines
                  .map((line) => `${line.quantity} × ${line.name}`)
                  .join("  ·  ")}
              </Text>
            </View>
          ))
        ) : (
          <View style={s.emptyCard}>
            <Text style={s.emptyTitle}>No tickets just yet</Text>
            <Text style={s.emptyText}>
              Saved table orders will appear here for the team.
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={s.bottom}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={s.nav}>⌂ Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ItemList")}>
          <Text style={s.nav}>▤ Menu</Text>
        </TouchableOpacity>
        <Text style={s.navActive}>♧ Service</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Statistics")}>
          <Text style={s.nav}>▥ Insights</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
