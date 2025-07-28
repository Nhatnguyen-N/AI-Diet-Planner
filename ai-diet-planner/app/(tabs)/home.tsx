import { Text, View } from "react-native";
import React, { useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "expo-router";
import HomeHeader from "@/components/HomeHeader";
import TodayProgress from "@/components/TodayProgress";
import GenerateRecipeCard from "@/components/GenerateRecipeCard";
import TodaysMealPlan from "@/components/TodaysMealPlan";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user?.weight) {
      router.replace("/preferance");
    }
  }, [user]);
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <HomeHeader />
      <TodayProgress />
      <GenerateRecipeCard />
      <TodaysMealPlan />
    </View>
  );
}
