import { FlatList, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "expo-router";
import HomeHeader from "@/components/HomeHeader";
import TodayProgress from "@/components/TodayProgress";
import GenerateRecipeCard from "@/components/GenerateRecipeCard";
import TodaysMealPlan from "@/components/TodaysMealPlan";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!user?.weight) {
      router.replace("/preferance");
    }
  }, [user]);

  // Hàm xử lý refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // Thực hiện các tác vụ refresh cần thiết
    // Sau đó cập nhật key để force re-render TodaysMealPlan
    setTimeout(() => {
      setRefreshKey((prev) => prev + 1);
      setRefreshing(false);
    }, 1000);
  }, []);
  return (
    <FlatList
      data={[]}
      renderItem={() => null}
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListHeaderComponent={
        <View
          style={{
            padding: 20,
          }}
        >
          <HomeHeader />
          <TodayProgress />
          <GenerateRecipeCard />
          <TodaysMealPlan key={refreshKey} />
        </View>
      }
    />
  );
}
