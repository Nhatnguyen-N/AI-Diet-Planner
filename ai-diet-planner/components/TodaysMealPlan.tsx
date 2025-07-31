import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { CalendarAdd01Icon } from "@hugeicons/core-free-icons";
import Colors from "@/shared/Colors";
import Button from "./shared/Button";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@/context/UserContext";
import moment from "moment";
import { MealPlanWithRecipe } from "@/types/meal.types";
import MealPlanCard from "./MealPlanCard";
import { useRefreshData } from "@/context/RefreshDataContext";

export default function TodaysMealPlan({
  selectedDate,
}: {
  selectedDate?: string;
}) {
  const [mealPlan, setMealPlan] = useState<MealPlanWithRecipe[]>([]);
  const { user } = useUser();
  const convex = useConvex();
  const { refreshData } = useRefreshData();
  // TODO: Refresh if add today meal plan
  useEffect(() => {
    user && GetTodaysMealPlan();
  }, [user, refreshData, selectedDate]);

  const GetTodaysMealPlan = async () => {
    const result = await convex.query(api.MealPlan.GetTodaysMealPlan, {
      date: selectedDate ?? moment().format("DD/MM/YYYY"),
      uid: user?._id!,
    });
    // console.log("123");

    setMealPlan(result);
  };
  return (
    <View
      style={{
        marginTop: 15,
      }}
    >
      {!selectedDate && (
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Today&apos;s Meal Plan
        </Text>
      )}
      {!mealPlan ? (
        <View
          style={{
            alignItems: "center",
            padding: 20,
            backgroundColor: Colors.WHITE,
            marginTop: 15,
            borderRadius: 15,
          }}
        >
          <HugeiconsIcon
            icon={CalendarAdd01Icon}
            size={40}
            color={Colors.PRIMARY}
          />
          <Text style={{ fontSize: 18, color: Colors.GRAY, marginBottom: 20 }}>
            You Don&apos;t have any meal plan for Today
          </Text>
          <Button title="Create New Meal Plan" onPress={() => {}} />
        </View>
      ) : (
        <View>
          <FlatList
            data={mealPlan}
            renderItem={({ item }) => (
              <MealPlanCard
                mealPlanInfo={item}
                // refreshData={GetTodaysMealPlan}
              />
            )}
          />
        </View>
      )}
    </View>
  );
}
