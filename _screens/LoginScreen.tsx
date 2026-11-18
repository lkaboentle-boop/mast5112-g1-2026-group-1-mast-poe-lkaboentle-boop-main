import { useState, useEffect, useRef } from "react";
import {
  Alert,
  Animated,
  Platform,
  ScrollView,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";
import styles, { animatedOpacity } from "../styles/styles";

type LoginNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

interface LoginScreenProps {
  navigation: LoginNavigationProp;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loadSavedUser = async () => {
      try {
        const savedProfile = await AsyncStorage.getItem("profile");
        if (!savedProfile) {
          return;
        }

        const parsedProfile = JSON.parse(savedProfile) as {
          email?: string;
        };
        if (parsedProfile.email) {
          setEmail(parsedProfile.email);
        }
      } catch (error) {
        console.log("Failed to load saved user", error);
      }
    };

    loadSavedUser();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const displayAlert = (title: string, message: string) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      displayAlert("Error", "Please enter both your email and password.");
      return;
    }

    try {
      await AsyncStorage.setItem("isLoggedIn", "true");
      displayAlert("Success", "Login successful.");
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } catch (error) {
      console.log("Failed to set login state", error);
      displayAlert("Error", "Could not continue with login. Please try again.");
    }
  };

  const navToRegister = () => {
    navigation.navigate("Signup");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.ribbonContainer}>
        <Image
          source={require("../assets/chef head.png")}
          style={styles.ribbonIcon}
        />
        <Text style={[styles.subheading, styles.loginBrandTitle]}>
          Easy Chef App
        </Text>
      </View>

      <Animated.Image
        source={require("../assets/chef head.png")}
        style={animatedOpacity(fadeAnim, styles.loginChefImage)}
      />

      <Text style={styles.heading}>Login Page</Text>

      <Text style={styles.subheading}>Email Address</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        style={styles.textInput}
      />

      <Text style={styles.subheading}>Password</Text>
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoComplete="password"
        style={styles.textInput}
      />

      <View style={styles.actionButtonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.loginPrompt}>
        <Text style={styles.loginPromptText}>Don't have an account? </Text>
        <TouchableOpacity onPress={navToRegister}>
          <Text style={styles.loginLinkText}>Register</Text>
        </TouchableOpacity>
      </View>

      <Image
        source={require("../assets/chef head.png")}
        style={styles.bottomImage}
      />
    </ScrollView>
  );
}
