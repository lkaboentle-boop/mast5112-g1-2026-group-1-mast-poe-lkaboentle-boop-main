import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Animated,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles, { animatedOpacity } from "../styles/styles";

export default function SignupScreen({ navigation }: any) {
  type Gender = "Male" | "Female" | "Other";

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [gender, setGender] = useState<Gender | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2500,
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

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setContactNumber("");
    setPassword("");
    setConfirmPassword("");
    setGender(null);
  };

  const checkPasswordMatch = () => {
    if (password.length < 8) {
      displayAlert(
        "Password Too Short",
        "Your password must be at least 8 characters long.",
      );
      return false;
    }

    if (password !== confirmPassword) {
      displayAlert(
        "Password Mismatch",
        "The password and confirm password fields do not match.",
      );
      return false;
    }

    return true;
  };

  const emptyFieldCheck = () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !contactNumber ||
      !password ||
      !confirmPassword ||
      !gender
    ) {
      displayAlert(
        "Incomplete Form",
        "Please fill in all fields before continuing.",
      );
      return false;
    }

    if (!checkPasswordMatch()) {
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!emptyFieldCheck()) {
      return;
    }

    const profileData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      contactNumber: contactNumber.trim(),
      image: null,
    };

    try {
      await AsyncStorage.setItem("profile", JSON.stringify(profileData));
      await AsyncStorage.setItem("isLoggedIn", "true");
      displayAlert(
        "Registration Successful",
        `Welcome, ${firstName} ${lastName}!`,
      );
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } catch (error) {
      console.log("Failed to save profile", error);
      displayAlert(
        "Save Error",
        "Could not save your details. Please try again.",
      );
    }
  };

  return (
    <View style={styles.pageContainer}>
      <Animated.Image
        source={require("../assets/chef head.png")}
        style={animatedOpacity(fadeAnim, styles.signupChefImage)}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <Animated.View style={animatedOpacity(fadeAnim, styles.signupHeading)}>
          <Text style={styles.heading}>Registration Form</Text>
        </Animated.View>

        <Text style={styles.label}>First Name</Text>
        <TextInput
          placeholder="Enter your first name"
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          placeholder="Enter your last name"
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          placeholder="Enter your email address"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Contact Number</Text>
        <TextInput
          placeholder="Enter your contact number"
          style={styles.input}
          value={contactNumber}
          onChangeText={setContactNumber}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Enter your password"
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.toggleText}>
              {showPassword ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Confirm your password"
            style={styles.passwordInput}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Text style={styles.toggleText}>
              {showConfirmPassword ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Gender</Text>
        <View style={styles.genderRow}>
          {(["Male", "Female", "Other"] as Gender[]).map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => setGender(option)}
              style={[
                styles.genderOption,
                gender === option && styles.genderOptionSelected,
              ]}
            >
              <Text
                style={[
                  styles.genderText,
                  gender === option && styles.genderTextSelected,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.clearButton} onPress={clearForm}>
            <Text style={[styles.buttonText, styles.clearButtonText]}>
              Clear Form
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.loginPrompt}>
          <Text style={styles.loginPromptText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginLinkText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
