import { Text, TouchableOpacity, View } from "react-native";
import Colors from "@/shared/Colors";
interface ButtonProps {
  title: string;
  onPress: () => void;
}
export default function Button({ title, onPress }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        width: "100%",
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          color: Colors.WHITE,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
