import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "./_screens/SplashScreen";
import LoginScreen from "./_screens/LoginScreen";
import SignupScreen from "./_screens/SignupScreen";
import HomeScreen from "./_screens/HomeScreen";
import AddMenuItemScreen from "./_screens/AddMenuItemScreen";
import ItemDetailScreen from "./_screens/ItemDetailScreen";
import ItemListScreen from "./_screens/ItemListScreen";
import ProfileScreen from "./_screens/ProfileScreen";
import Statistics from "./_screens/Statistics";
import WaiterScreen from "./_screens/WaiterScreen";

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  AddMenuItem:
    | {
        newItem?: {
          id?: string;
          name: string;
          description: string;
          course: "Starter" | "Main Course" | "Dessert";
          price: number;
        };
      }
    | undefined;
  MenuItemDetails: { itemId: string };
  ItemList:
    | {
        newItem?: {
          id?: string;
          name: string;
          description: string;
          course: "Starter" | "Main Course" | "Dessert";
          price: number;
        };
      }
    | undefined;
  Profile: undefined;
  Statistics: undefined;
  Waiter: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <View style={styles.appShell}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddMenuItem" component={AddMenuItemScreen} />
          <Stack.Screen name="MenuItemDetails" component={ItemDetailScreen} />
          <Stack.Screen name="ItemList" component={ItemListScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Statistics" component={Statistics} />
          <Stack.Screen name="Waiter" component={WaiterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  appShell: {
    flex: 1,
    width: "100%",
    maxWidth: 480,
    alignSelf: "center",
  },
});
