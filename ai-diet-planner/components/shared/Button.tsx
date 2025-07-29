import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import Colors from "@/shared/Colors";
interface ButtonProps {
  title: string;
  onPress: () => void;
  icon?: any;
  loading?: boolean;
}
export default function Button({ title, onPress, icon, loading }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={{
        padding: 13,
        backgroundColor: Colors.PRIMARY,
        width: "100%",
        borderRadius: 10,
      }}
    >
      {loading ? (
        <ActivityIndicator color={Colors.WHITE} />
      ) : (
        <Text
          style={{
            fontSize: 18,
            color: Colors.WHITE,
            textAlign: "center",
          }}
        >
          {icon} {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
