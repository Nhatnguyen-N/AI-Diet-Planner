import { View, Text, FlatList } from "react-native";
import React, { useRef } from "react";
import RecipeIntro from "@/components/RecipeIntro";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Colors from "@/shared/Colors";
import RecipeIngredients from "@/components/RecipeIngredients";
import RecipeSteps from "@/components/RecipeSteps";
import Button from "@/components/shared/Button";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import AddToMealActionSheet from "@/components/AddToMealActionSheet";

export default function RecipeDetail() {
  const { recipeId } = useLocalSearchParams();
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const recipeDetail = useQuery(api.Recipes.GetRecipeById, {
    id: recipeId as Id<"recipes">,
  });
  console.log(recipeDetail);

  // const GetRecipeDetail=()=>{

  // }
  return (
    <FlatList
      data={[]}
      renderItem={() => null}
      ListHeaderComponent={
        <View
          style={{
            padding: 20,
            paddingTop: 30,
            backgroundColor: Colors.WHITE,
            height: "100%",
          }}
        >
          {/* Recipe Intro */}
          <RecipeIntro recipeDetail={recipeDetail!} />
          {/* Recipe Ingredient */}
          <RecipeIngredients recipeDetail={recipeDetail!} />
          {/* Cooking Steps */}
          <RecipeSteps recipeDetail={recipeDetail!} />

          <View
            style={{
              marginTop: 15,
            }}
          >
            <Button
              title="Add to Meal Plan"
              onPress={() => actionSheetRef.current?.show()}
            />
          </View>
          <ActionSheet ref={actionSheetRef}>
            <AddToMealActionSheet
              recipeDetail={recipeDetail!}
              hideActionSheet={() => actionSheetRef.current?.hide()}
            />
          </ActionSheet>
        </View>
      }
    />
  );
}
