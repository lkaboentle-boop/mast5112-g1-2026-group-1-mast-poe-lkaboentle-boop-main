import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import menuData from "../_data/menuItems";
import { palette, homeStyles as h } from "../styles/styles";

const KEY = "classy_menu_items_v1";

export default function HomeScreen({ navigation }: any) {
  const [name, setName] = useState("Chef");
  const [count, setCount] = useState(menuData.length);
  const load = async () => {
    try {
      const p = await AsyncStorage.getItem("profile");
      if (p) {
        const x = JSON.parse(p);
        setName([x.firstName, x.lastName].filter(Boolean).join(" ") || "Chef");
      }
      const m = await AsyncStorage.getItem(KEY);
      setCount(m ? JSON.parse(m).length : menuData.length);
    } catch {}
  };

  useEffect(() => {
    load();
    const u = navigation.addListener?.("focus", load);
    return u;
  }, [navigation]);

  return (
    <SafeAreaView style={h.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={palette.canvas} />
      <ScrollView
        contentContainerStyle={h.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={h.top}>
          <View>
            <Text style={h.overline}>YOUR PRIVATE KITCHEN</Text>
            <Text style={h.brand}>MENU</Text>
          </View>

          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Open profile"
            style={h.profileButton}
            onPress={() => navigation.navigate("Profile")}
          >
            <Text style={h.profile}>👤</Text>
          </TouchableOpacity>
        </View>

        <View style={h.hero}>
          <View style={h.heroAccent} />
          <Text style={h.kicker}>WELCOME BACK</Text>
          <Text style={h.name}>Chef {name}</Text>
          <Text style={h.copy}>
            Your kitchen, your craft. Keep every dish beautifully organised.
          </Text>
          <View style={h.rule} />

          <View style={h.countRow}>
            <Text style={h.count}>{count}</Text>
            <Text style={h.countCaption}>
              collected dishes{"\n"}in your collection
            </Text>
          </View>
        </View>

        <View style={h.sectionRow}>
          <Text style={h.section}>Your workspace</Text>
          <Text style={h.sectionNote}>MADE FOR YOU</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.88}
          style={h.primary}
          onPress={() => navigation.navigate("ItemList")}
        >
          <View>
            <Text style={h.cardKicker}>DISCOVER & MANAGE</Text>
            <Text style={h.cardTitle}>Explore the menu</Text>
            <Text style={h.cardCopy}>Search, filter and view every dish.</Text>
          </View>

          <Text style={h.arrow}>↗</Text>
        </TouchableOpacity>

        <View style={h.row}>
          <TouchableOpacity
            activeOpacity={0.88}
            style={h.tile}
            onPress={() => navigation.navigate("AddMenuItem")}
          >
            <View style={h.tileIconWrap}>
              <Text style={h.tileIcon}>＋</Text>
            </View>

            <Text style={h.tileTitle}>Add a dish</Text>
            <Text style={h.tileCopy}>Create a new menu item</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.88}
            style={h.tile}
            onPress={() => navigation.navigate("Statistics")}
          >
            <View style={h.tileIconWrap}>
              <Text style={h.tileIcon}>📊</Text>
            </View>

            <Text style={h.tileTitle}>Statistics</Text>
            <Text style={h.tileCopy}>Review menu performance</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.88}
          style={h.serviceCard}
          onPress={() => navigation.navigate("Waiter")}
        >
          <View style={h.serviceIcon}>
            <Text style={h.tileIcon}>👩🏽‍🍳</Text>
          </View>

          <View style={h.serviceCopy}>
            <Text style={h.cardKicker}>FRONT OF HOUSE</Text>
            <Text style={h.tileTitle}>Waiter service</Text>
            <Text style={h.tileCopy}>
              Record table orders and guest counts.
            </Text>
          </View>
          <Text style={h.arrow}>↗</Text>
        </TouchableOpacity>
        <Text style={h.footer}>MADE WITH CARE · SERVED WITH STYLE</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
