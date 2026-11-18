import React, { useEffect } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { palette, splashStyles as styles } from "../styles/styles";

export default function SplashScreen({ navigation }: any) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoCircle}>
        <Image
          source={require("../assets/chef-head.png")}
          style={styles.chefIconImage}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>Easy Chef App</Text>
      <Text style={styles.subtitle}>Manage your kitchen with easy</Text>

      <ActivityIndicator
        size="large"
        color={palette.onAccent}
        style={styles.activity}
      />
    </View>
  );
}
