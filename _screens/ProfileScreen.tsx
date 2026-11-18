import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles, { palette } from "../styles/styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type ProfileNavProp = NativeStackNavigationProp<RootStackParamList, "Profile">;

interface ProfileScreenProps {
  navigation: ProfileNavProp;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedProfile = await AsyncStorage.getItem("profile");
        if (!savedProfile) {
          return;
        }

        const parsedProfile = JSON.parse(savedProfile) as {
          firstName?: string;
          lastName?: string;
          email?: string;
          contactNumber?: string;
          image?: string | null;
        };

        setFirstName(parsedProfile.firstName ?? "");
        setLastName(parsedProfile.lastName ?? "");
        setEmail(parsedProfile.email ?? "");
        setContactNumber(parsedProfile.contactNumber ?? "");
        setImage(parsedProfile.image ?? null);
      } catch (error) {
        console.log("Failed to load profile", error);
      }
    };

    loadProfile();
  }, []);

  const chooseProfileImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "You need to grant permission first to access the media library.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSaveProfile = async () => {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !contactNumber.trim()
    ) {
      Alert.alert(
        "Incomplete Information",
        "Please fill in all the required fields.",
      );
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    const profileData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      contactNumber: contactNumber.trim(),
      image,
    };

    try {
      await AsyncStorage.setItem("profile", JSON.stringify(profileData));
      Alert.alert(
        "Profile Saved",
        "Your profile information has been saved successfully.",
      );
      navigation.goBack();
    } catch (error) {
      console.log("Failed to save profile", error);
      Alert.alert(
        "Save Error",
        "Could not save your profile. Please try again.",
      );
    }
  };

  const logout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: async () => {
          setFirstName("");
          setLastName("");
          setEmail("");
          setContactNumber("");
          setImage(null);

          try {
            await AsyncStorage.removeItem("profile");
            await AsyncStorage.removeItem("isLoggedIn");
          } catch (error) {
            console.log("Failed to clear profile", error);
          }

          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={palette.canvas} />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.headerButtonText}>Back</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Profile</Text>

        <View style={styles.headerContainer} />

        <TouchableOpacity
          style={styles.profileImageContainer}
          onPress={chooseProfileImage}
        >
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <Text style={styles.profileImagePlaceholder}>Select Image</Text>
          )}
        </TouchableOpacity>

        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Contact Number"
          value={contactNumber}
          onChangeText={setContactNumber}
          style={styles.input}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
          <Text style={styles.saveButtonText}>Save Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
