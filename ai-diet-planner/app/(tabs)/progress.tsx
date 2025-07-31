import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import DateSelectionCard from "@/components/DateSelectionCard";
import TodaysMealPlan from "@/components/TodaysMealPlan";
import TodayProgress from "@/components/TodayProgress";
import GenerateRecipeCard from "@/components/GenerateRecipeCard";

export default function Progress() {
  const [selectedDate, setSelectedDate] = useState<string>();

  return (
    <FlatList
      data={[]}
      renderItem={() => null}
      ListHeaderComponent={
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
            Progress
          </Text>
          <DateSelectionCard
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
          />
          <TodaysMealPlan selectedDate={selectedDate} />
          <TodayProgress />
          <GenerateRecipeCard />
        </View>
      }
    />
  );
}
