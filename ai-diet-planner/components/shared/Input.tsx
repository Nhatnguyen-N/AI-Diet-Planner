import { Text, TextInput, View } from "react-native";
import React from "react";
interface InputProps {
  placeholder: string;
  password?: boolean;
  onChangeText: (value: string) => void;
}
export default function Input({
  placeholder,
  password = false,
  onChangeText,
}: InputProps) {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={"gray"}
      secureTextEntry={password}
      onChangeText={(value) => onChangeText(value)}
      style={{
        padding: 15,
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 18,
        paddingVertical: 20,
        width: "100%",
        marginTop: 10,
      }}
    />
  );
}
