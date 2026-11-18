import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import styles from "../styles/styles";
import InputField from "../_components/InputField";

type MenuCourse = "Starter" | "Main Course" | "Dessert";

export default function AddMenuItemScreen({ navigation }: any) {
  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<MenuCourse | null>(null);
  const [imageUri, setImageUri] = useState<string | undefined>();

  const courseOptions: MenuCourse[] = ["Starter", "Main Course", "Dessert"];

  const chooseDishImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.status !== "granted") {
      Alert.alert(
        "Photo Access Needed",
        "Allow photo access to add a picture for this dish.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0]?.uri);
    }
  };

  const handleAddItem = () => {
    if (
      !dishName.trim() ||
      !description.trim() ||
      !price.trim() ||
      !selectedCourse
    ) {
      Alert.alert(
        "Incomplete Form",
        "Please fill in the dish name, description, price, and select a course.",
      );
      return;
    }

    const numericPrice = Number(price);
    if (Number.isNaN(numericPrice) || numericPrice <= 0) {
      Alert.alert(
        "Invalid Price",
        "Please enter a valid price greater than 0.",
      );
      return;
    }

    const newItem = {
      name: dishName.trim(),
      description: description.trim(),
      course: selectedCourse,
      price: numericPrice,
      imageUri,
    };

    console.log("Added menu item:", newItem);
    Alert.alert("Success", `${newItem.name} was added successfully.`);
    navigation?.navigate?.("ItemList", {
      newItem: {
        name: newItem.name,
        description: newItem.description,
        course: newItem.course,
        price: newItem.price,
        imageUri: newItem.imageUri,
      },
    });
  };

  return (
    <View style={styles.addMenuRoot}>
      <ScrollView
        style={styles.addMenuScroll}
        contentContainerStyle={styles.addMenuContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation?.goBack?.()}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Add Menu Item</Text>
          <View style={styles.spacer} />
        </View>

        <InputField
          label="Dish Name"
          placeholder="Enter Dish Name"
          value={dishName}
          onChangeText={setDishName}
        />

        <InputField
          label="Description"
          placeholder="Enter Description for Dish"
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.sectionLabel}>Please select an option below:</Text>
        <View style={styles.courseRow}>
          {courseOptions.map((option) => {
            const isSelected = selectedCourse === option;

            return (
              <TouchableOpacity
                key={option}
                style={[
                  styles.courseButton,
                  isSelected && styles.courseButtonSelected,
                ]}
                onPress={() => setSelectedCourse(option)}
              >
                <Text
                  style={[
                    styles.courseButtonText,
                    isSelected && styles.courseButtonTextSelected,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <Text style={styles.selectionText}>
          Selected: {selectedCourse ?? "None"}
        </Text>

        <InputField
          label="Price (ZAR)"
          placeholder="Enter Price (ZAR)"
          value={price}
          onChangeText={setPrice}
        />

        <TouchableOpacity style={styles.button} onPress={handleAddItem}>
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
