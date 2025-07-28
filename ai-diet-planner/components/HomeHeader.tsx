import { View, Text, Image } from "react-native";
import React from "react";
import { useUser } from "@/context/UserContext";
interface HomeHeaderProps {}
export default function HomeHeader({}: HomeHeaderProps) {
  const { user } = useUser();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Image
        source={require("../assets/images/logo.png")}
        style={{ width: 60, height: 60, borderRadius: 99 }}
      />
      <View>
        <Text style={{ fontSize: 20 }}>Hello, 👋</Text>
        <Text style={{ fontSize: 23, fontWeight: "bold" }}>{user?.name}</Text>
      </View>
    </View>
  );
}
