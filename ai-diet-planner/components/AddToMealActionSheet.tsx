import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { RecipeSelectedGenerate } from "@/types/recipe.types";
import moment from "moment";
import Colors from "@/shared/Colors";
import {
  Coffee02Icon,
  Moon02Icon,
  Sun03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import Button from "./shared/Button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@/context/UserContext";
interface AddToMealActionSheetProps {
  recipeDetail: RecipeSelectedGenerate;
  hideActionSheet: () => void;
}
export default function AddToMealActionSheet({
  recipeDetail,
  hideActionSheet,
}: AddToMealActionSheetProps) {
  const [dateList, setDateList] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>();
  const [selectedMeal, setSelectedMeal] = useState<string>();
  const CreateMeal = useMutation(api.MealPlan.CreateMealPlan);
  const { user } = useUser();
  const mealOptions = [
    {
      title: "Breakfast",
      icon: Coffee02Icon,
    },
    {
      title: "Lunch",
      icon: Sun03Icon,
    },
    {
      title: "Dinner",
      icon: Moon02Icon,
    },
  ];
  useEffect(() => {
    GenerateDates();
  }, []);

  const GenerateDates = () => {
    const result = [];
    for (let i = 0; i < 4; i++) {
      const nextDate = moment().add(i, "days").format("DD/MM/YYYY");
      result.push(nextDate);
    }
    setDateList(result);
  };
  const AddToMealPlan = async () => {
    if (!selectedDate && !selectedMeal) {
      Alert.alert("Error", "Please Select All Details");
      return;
    }
    const result = await CreateMeal({
      date: selectedDate!,
      mealType: selectedMeal!,
      recipeId: recipeDetail?._id,
      uid: user?._id!,
    });
    console.log(result);
    Alert.alert("Added", "Added to Meal Plan");
    hideActionSheet();
  };
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Add To Meal
      </Text>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 15 }}>
        Select Date
      </Text>
      <FlatList
        data={dateList}
        numColumns={4}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedDate(item)}
            style={{
              flex: 1,
              alignItems: "center",
              padding: 7,
              borderWidth: selectedDate === item ? 2 : 1,
              borderRadius: 10,
              margin: 5,
              backgroundColor:
                selectedDate === item ? Colors.SECONDERY : Colors.WHITE,
              borderColor: selectedDate === item ? Colors.PRIMARY : Colors.GRAY,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "500" }}>
              {moment(item, "DD/MM/YYYY").format("ddd")}
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {moment(item, "DD/MM/YYYY").format("DD")}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {moment(item, "DD/MM/YYYY").format("MMM")}
            </Text>
          </TouchableOpacity>
        )}
      />
      <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 15 }}>
        Select Meal
      </Text>
      <FlatList
        data={mealOptions}
        numColumns={4}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedMeal(item.title)}
            style={{
              flex: 1,
              alignItems: "center",
              padding: 7,
              borderWidth: selectedMeal === item.title ? 2 : 1,
              borderRadius: 10,
              margin: 5,
              backgroundColor:
                selectedMeal === item.title ? Colors.SECONDERY : Colors.WHITE,
              borderColor:
                selectedMeal === item.title ? Colors.PRIMARY : Colors.GRAY,
            }}
          >
            <HugeiconsIcon icon={item.icon} />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={{ marginTop: 15 }}>
        <Button title="+ Add to Meal Plan" onPress={AddToMealPlan} />
        <TouchableOpacity
          onPress={() => hideActionSheet()}
          style={{ padding: 15 }}
        >
          <Text style={{ textAlign: "center", fontSize: 20 }}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
