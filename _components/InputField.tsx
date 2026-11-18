import React from "react";
import { Text, TextInput, View } from "react-native";
import sharedStyles, { inputFieldStyles } from "../styles/styles";

interface InputFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  label?: string;
}

export default function InputField({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  label,
}: InputFieldProps) {
  return (
    <View style={inputFieldStyles.container}>
      {label ? (
        <Text style={[inputFieldStyles.label, sharedStyles.label]}>
          {label}
        </Text>
      ) : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={[inputFieldStyles.input, sharedStyles.input]}
      />
    </View>
  );
}
