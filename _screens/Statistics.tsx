import React, { useCallback, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  useWindowDimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import menuData, { DataMenuItem } from "../_data/menuItems";
import {
  palette,
  statisticsStyles as st,
  courseProgressWidth,
} from "../styles/styles";
const KEY = "classy_menu_items_v1";

function HighlightPhoto({
  item,
  fallback,
}: {
  item?: DataMenuItem;
  fallback: string;
}) {
  return item?.imageUri ? (
    <Image
      source={{ uri: item.imageUri }}
      style={st.highlightImage}
      accessibilityLabel={`${item.name} picture`}
    />
  ) : (
    <Text style={st.highlightIcon}>{fallback}</Text>
  );
}

export default function Statistics({ navigation }: any) {
  const [items, setItems] = useState<DataMenuItem[]>(menuData);
  const { width } = useWindowDimensions();
  const compact = width < 360;
  const load = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem(KEY);
      setItems(value ? JSON.parse(value) : menuData);
    } catch {}
  }, []);
  React.useEffect(() => {
    load();
    const unsub = navigation.addListener?.("focus", load);
    return unsub;
  }, [navigation, load]);
  const total = items.length,
    value = items.reduce((a, b) => a + b.price, 0),
    avg = total ? value / total : 0;
  const courses = ["Starter", "Main Course", "Dessert"] as const;
  const bestOrdered = [...items].sort(
    (a, b) => (b.orders || 0) - (a.orders || 0),
  )[0];
  const bestLoved = [...items].sort(
    (a, b) => (b.likes || 0) - (a.likes || 0),
  )[0];
  const high = [...items].sort((a, b) => b.price - a.price)[0];
  return (
    <SafeAreaView
      style={[
        st.screen,
        { paddingHorizontal: compact ? 12 : 21, paddingTop: compact ? 8 : 12 },
      ]}
    >
      <StatusBar barStyle="dark-content" backgroundColor={palette.canvas} />
      <View style={st.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={st.back}>
          <Text style={st.backText}>‹</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={st.eyebrow}>THE CHEF'S COLLECTION</Text>
          <Text style={[st.title, { fontSize: compact ? 24 : 27 }]}>
            Menu insights
          </Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={st.scrollContent}
      >
        <Text style={st.intro}>A clear snapshot of your menu at a glance.</Text>
        <View style={[st.hero, { padding: compact ? 16 : 22 }]}>
          <Text style={st.heroLabel}>MENU INVENTORY VALUE</Text>
          <Text style={[st.heroValue, { fontSize: compact ? 29 : 34 }]}>
            R{value.toFixed(2)}
          </Text>
          <Text style={st.heroFoot}>
            Combined listed price of all {total} dishes
          </Text>
        </View>
        <View style={[st.grid, { gap: compact ? 8 : 12 }]}>
          <View style={[st.metric, { padding: compact ? 12 : 17 }]}>
            <Text style={[st.metricNumber, { fontSize: compact ? 20 : 23 }]}>
              {total}
            </Text>
            <Text style={st.metricLabel}>TOTAL DISHES</Text>
          </View>
          <View style={[st.metric, { padding: compact ? 12 : 17 }]}>
            <Text style={[st.metricNumber, { fontSize: compact ? 20 : 23 }]}>
              R{avg.toFixed(2)}
            </Text>
            <Text style={st.metricLabel}>AVERAGE PRICE</Text>
          </View>
        </View>
        <Text style={st.heading}>Menu breakdown</Text>
        {courses.map((c) => {
          const n = items.filter((i) => i.course === c).length;
          return (
            <View key={c} style={st.courseRow}>
              <View style={st.courseTop}>
                <Text style={st.courseName}>{c}</Text>
                <Text style={st.courseCount}>
                  {n} {n === 1 ? "item" : "items"}
                </Text>
              </View>
              <View style={st.track}>
                <View
                  style={[
                    st.bar,
                    courseProgressWidth(total ? (n / total) * 100 : 0),
                  ]}
                />
              </View>
            </View>
          );
        })}
        <Text style={st.heading}>Menu highlights</Text>
        <View
          style={[
            st.highlight,
            { padding: compact ? 10 : 14, gap: compact ? 9 : 13 },
          ]}
        >
          <HighlightPhoto item={bestOrdered} fallback="🔥" />
          <View style={st.highlightContent}>
            <Text style={st.highlightLabel}>CUSTOMER FAVOURITE BY ORDERS</Text>
            <Text style={[st.highlightName, { fontSize: compact ? 13 : 14 }]}>
              {bestOrdered?.name || "No data yet"}
            </Text>
            <Text style={st.highlightDetail}>
              {bestOrdered?.orders || 0} recorded orders
            </Text>
          </View>
        </View>
        <View
          style={[
            st.highlight,
            { padding: compact ? 10 : 14, gap: compact ? 9 : 13 },
          ]}
        >
          <HighlightPhoto item={bestLoved} fallback="♡" />
          <View style={st.highlightContent}>
            <Text style={st.highlightLabel}>MOST LOVED</Text>
            <Text style={[st.highlightName, { fontSize: compact ? 13 : 14 }]}>
              {bestLoved?.name || "No data yet"}
            </Text>
            <Text style={st.highlightDetail}>
              {bestLoved?.likes || 0} customer likes
            </Text>
          </View>
        </View>
        <View
          style={[
            st.highlight,
            { padding: compact ? 10 : 14, gap: compact ? 9 : 13 },
          ]}
        >
          <HighlightPhoto item={high} fallback="✦" />
          <View style={st.highlightContent}>
            <Text style={st.highlightLabel}>HIGHEST PRICED DISH</Text>
            <Text style={[st.highlightName, { fontSize: compact ? 13 : 14 }]}>
              {high?.name || "No data yet"}
            </Text>
            <Text style={st.highlightDetail}>
              {high ? `R${high.price.toFixed(2)}` : "—"}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={st.button}
          onPress={() => navigation.navigate("ItemList")}
        >
          <Text style={st.buttonText}>VIEW FULL MENU →</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={st.bottom}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={st.nav}>⌂ Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ItemList")}>
          <Text style={st.nav}>▤ Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Waiter")}>
          <Text style={st.nav}>♧ Service</Text>
        </TouchableOpacity>
        <Text style={st.navActive}>▥ Insights</Text>
      </View>
    </SafeAreaView>
  );
}
