import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import {
  AnalyticsUpIcon,
  CookBookIcon,
  Login03Icon,
  ServingFoodIcon,
  WalletAdd02Icon,
} from "@hugeicons/core-free-icons";
import { useUser } from "@/context/UserContext";
import Colors from "@/shared/Colors";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react-native";
import { Href, useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "@/services/FirebaseConfig";

interface MenuOptionProps {
  title: string;
  icon: IconSvgElement;
  path: Href;
}
const MenuOptions: MenuOptionProps[] = [
  {
    title: "My Progress",
    icon: AnalyticsUpIcon,
    path: "/(tabs)/progress",
  },
  {
    title: "Explore Recipes",
    icon: CookBookIcon,
    path: "/(tabs)/meals",
  },
  {
    title: "Ai Recipes",
    icon: ServingFoodIcon,
    path: "/generate-ai-recipe",
  },
  {
    title: "Billing",
    icon: WalletAdd02Icon,
    path: "/billing" as Href,
  },
  {
    title: "Logout",
    icon: Login03Icon,
    path: "logout" as Href,
  },
];

export default function Profile() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const OnMenuOptionClick = (menu: MenuOptionProps) => {
    if (menu.path === ("logout" as Href)) {
      signOut(auth).then(() => {
        console.log("Sign Out");
        setUser(null);
        router.replace("/");
      });
      return;
    }
    router.push(menu?.path);
  };
  return (
    <View
      style={{
        padding: 20,
        paddingTop: 25,
      }}
    >
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
        }}
      >
        Profile
      </Text>
      <View style={{ alignItems: "center", marginTop: 15 }}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={{ width: 100, height: 100, borderRadius: 99 }}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 5 }}>
          {user?.name}
        </Text>
        <Text style={{ fontSize: 16, color: Colors.GRAY, marginTop: 5 }}>
          {user?.email}
        </Text>
      </View>

      <FlatList
        data={MenuOptions}
        style={{ marginTop: 20 }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            disabled={item?.title === "Billing" ? true : false}
            onPress={() => OnMenuOptionClick(item)}
            style={{
              flexDirection: "row",
              gap: 6,
              alignItems: "center",
              padding: 15,
              borderWidth: 0.2,
              marginTop: 5,
              borderRadius: 15,
              backgroundColor: Colors.WHITE,
              elevation: 1,
            }}
          >
            <HugeiconsIcon icon={item.icon} size={35} color={Colors.PRIMARY} />
            <Text style={{ fontSize: 20, fontWeight: "300" }}>
              {item?.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
