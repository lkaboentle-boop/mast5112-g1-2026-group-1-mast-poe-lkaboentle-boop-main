import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Modal,
  Pressable,
  SafeAreaView,
  ActivityIndicator,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import menuData, { DataMenuItem, Course } from "../_data/menuItems";
import { palette, itemListStyles as s } from "../styles/styles";

const STORAGE_KEY = "classy_menu_items_v1";
type Filter = "All Courses" | Course;
const filters: Filter[] = ["All Courses", "Starter", "Main Course", "Dessert"];
const money = (n: number) => `R${n.toFixed(2)}`;

export default function ItemListScreen({ navigation, route }: any) {
  const [items, setItems] = useState<DataMenuItem[]>(menuData);
  const [search, setSearch] = useState("");
  const [course, setCourse] = useState<Filter>("All Courses");
  const [filterOpen, setFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadItems = useCallback(async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      setItems(saved ? JSON.parse(saved) : menuData);
    } catch {
      setItems(menuData);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    loadItems();
    const unsub = navigation.addListener?.("focus", loadItems);
    return unsub;
  }, [navigation, loadItems]);
  useEffect(() => {
    const added = route?.params?.newItem;
    if (!added) return;
    setItems((current) => {
      const next = [
        ...current,
        { ...added, id: String(Date.now()), orders: 0, likes: 0 },
      ];
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
      return next;
    });
    navigation.setParams?.({ newItem: undefined });
  }, [route?.params?.newItem, navigation]);

  const results = useMemo(
    () =>
      items.filter((item) => {
        const term = search.trim().toLowerCase();
        const matches =
          !term ||
          [item.name, item.description, item.course].some((value) =>
            value.toLowerCase().includes(term),
          );
        return matches && (course === "All Courses" || item.course === course);
      }),
    [items, search, course],
  );
  const counts = useMemo(
    () => ({
      total: items.length,
      starters: items.filter((i) => i.course === "Starter").length,
      mains: items.filter((i) => i.course === "Main Course").length,
      desserts: items.filter((i) => i.course === "Dessert").length,
    }),
    [items],
  );

  const renderItem = ({
    item,
    index,
  }: {
    item: DataMenuItem;
    index: number;
  }) => (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={() =>
        navigation.navigate("MenuItemDetails", { itemId: item.id })
      }
      style={s.card}
    >
      <View
        style={[
          s.foodIcon,
          [s.foodIconCream, s.foodIconPink, s.foodIconBeige][index % 3],
        ]}
      >
        {item.imageUri ? (
          <Image source={{ uri: item.imageUri }} style={s.foodImage} />
        ) : (
          <Text style={s.foodEmoji}>
            {item.course === "Dessert"
              ? "🍰"
              : item.course === "Starter"
                ? "🥗"
                : "🍽️"}
          </Text>
        )}
      </View>
      <View style={s.info}>
        <Text style={s.itemName}>{item.name}</Text>
        <Text numberOfLines={2} style={s.description}>
          {item.description}
        </Text>
        <View style={s.badge}>
          <Text style={s.badgeText}>{item.course.toUpperCase()}</Text>
        </View>
      </View>
      <View style={s.priceCol}>
        <Text style={s.price}>{money(item.price)}</Text>
        <Text style={s.chevron}>›</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={s.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={palette.canvas} />
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.back}>
          <Text style={s.backText}>‹</Text>
        </TouchableOpacity>
        <View>
          <Text style={s.eyebrow}>THE CHEF'S COLLECTION</Text>
          <Text style={s.title}>Our Menu</Text>
        </View>
        <TouchableOpacity
          style={s.addCircle}
          onPress={() => navigation.navigate("AddMenuItem")}
        >
          <Text style={s.addText}>＋</Text>
        </TouchableOpacity>
      </View>
      <Text style={s.intro}>Thoughtfully prepared. Beautifully served.</Text>
      <View style={s.statsStrip}>
        <View>
          <Text style={s.statNumber}>{counts.total}</Text>
          <Text style={s.statLabel}>TOTAL ITEMS</Text>
        </View>
        <View style={s.divider} />
        <View>
          <Text style={s.statNumber}>{counts.mains}</Text>
          <Text style={s.statLabel}>MAINS</Text>
        </View>
        <View style={s.divider} />
        <View>
          <Text style={s.statNumber}>{counts.desserts}</Text>
          <Text style={s.statLabel}>DESSERTS</Text>
        </View>
      </View>
      <View style={s.searchBox}>
        <Text style={s.searchIcon}>⌕</Text>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search dishes, descriptions..."
          placeholderTextColor="#9B978F"
          style={s.searchInput}
          returnKeyType="search"
        />
        <TouchableOpacity onPress={() => setSearch("")}>
          <Text style={s.clear}>{search ? "×" : ""}</Text>
        </TouchableOpacity>
      </View>
      <View style={s.filterHead}>
        <Text style={s.sectionTitle}>Explore dishes</Text>
        <TouchableOpacity
          style={s.filterButton}
          onPress={() => setFilterOpen(true)}
        >
          <Text style={s.filterButtonText}>
            ☷ {course === "All Courses" ? "Filter" : course}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={s.resultText}>
        SHOWING {results.length} OF {items.length} ITEMS
      </Text>
      {loading ? (
        <ActivityIndicator color={palette.accent} style={s.loader} />
      ) : (
        <FlatList
          data={results}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={s.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={s.empty}>
              <Text style={s.emptyIcon}>⌕</Text>
              <Text style={s.emptyTitle}>No dishes found</Text>
              <Text style={s.emptyText}>
                Try another search or clear your filter.
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setSearch("");
                  setCourse("All Courses");
                }}
              >
                <Text style={s.reset}>Clear search & filters</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}
      <View style={s.bottom}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={s.navMuted}>⌂ Home</Text>
        </TouchableOpacity>
        <Text style={s.navActive}>▤ Menu</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Waiter")}>
          <Text style={s.navMuted}>♧ Service</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Statistics")}>
          <Text style={s.navMuted}>▥ Insights</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={filterOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setFilterOpen(false)}
      >
        <Pressable style={s.overlay} onPress={() => setFilterOpen(false)}>
          <Pressable style={s.sheet} onPress={(e) => e.stopPropagation()}>
            <View style={s.handle} />
            <Text style={s.sheetTitle}>Filter menu</Text>
            <Text style={s.sheetSub}>Choose a course to narrow your menu.</Text>
            {filters.map((f) => (
              <TouchableOpacity
                key={f}
                onPress={() => {
                  setCourse(f);
                  setFilterOpen(false);
                }}
                style={s.option}
              >
                <Text style={[s.optionText, course === f && s.optionSelected]}>
                  {f}
                </Text>
                <Text style={s.tick}>{course === f ? "✓" : ""}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={s.done}
              onPress={() => {
                setCourse("All Courses");
                setFilterOpen(false);
              }}
            >
              <Text style={s.doneText}>Clear filter</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
