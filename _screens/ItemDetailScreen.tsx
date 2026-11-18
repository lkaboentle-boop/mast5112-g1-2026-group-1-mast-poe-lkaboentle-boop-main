import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Alert,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import menuData, { DataMenuItem } from "../_data/menuItems";
import { palette, itemDetailStyles as d } from "../styles/styles";
const KEY = "classy_menu_items_v1";
export default function ItemDetailScreen({ navigation, route }: any) {
  const [item, setItem] = useState<DataMenuItem | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(KEY);
        const list: DataMenuItem[] = raw ? JSON.parse(raw) : menuData;
        setItem(list.find((x) => x.id === route?.params?.itemId) || null);
      } catch {
        setItem(menuData.find((x) => x.id === route?.params?.itemId) || null);
      }
    })();
  }, [route?.params?.itemId]);
  const remove = () =>
    Alert.alert("Remove dish?", `Delete ${item?.name} from your menu?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const raw = await AsyncStorage.getItem(KEY);
            const list: DataMenuItem[] = raw ? JSON.parse(raw) : menuData;
            await AsyncStorage.setItem(
              KEY,
              JSON.stringify(list.filter((x) => x.id !== item?.id)),
            );
            navigation.goBack();
          } catch {
            Alert.alert("Error", "Could not delete this dish.");
          }
        },
      },
    ]);
  return (
    <SafeAreaView style={d.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={palette.canvas} />
      <TouchableOpacity onPress={() => navigation.goBack()} style={d.back}>
        <Text style={d.backText}>‹ Back to menu</Text>
      </TouchableOpacity>
      {item ? (
        <>
          <View style={d.art}>
            {item.imageUri ? (
              <Image source={{ uri: item.imageUri }} style={d.foodImage} />
            ) : (
              <Text style={d.emoji}>
                {item.course === "Dessert"
                  ? "🍰"
                  : item.course === "Starter"
                    ? "🥗"
                    : "🍽️"}
              </Text>
            )}
          </View>
          <Text style={d.kicker}>{item.course.toUpperCase()}</Text>
          <Text style={d.name}>{item.name}</Text>
          <Text style={d.description}>{item.description}</Text>
          <Text style={d.price}>R{item.price.toFixed(2)}</Text>
          <View style={d.stats}>
            <View>
              <Text style={d.stat}>{item.orders || 0}</Text>
              <Text style={d.label}>ORDERS</Text>
            </View>
            <View>
              <Text style={d.stat}>{item.likes || 0}</Text>
              <Text style={d.label}>LIKES</Text>
            </View>
          </View>
          <TouchableOpacity onPress={remove} style={d.delete}>
            <Text style={d.deleteText}>REMOVE FROM MENU</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={d.name}>Dish not found</Text>
      )}
    </SafeAreaView>
  );
}
