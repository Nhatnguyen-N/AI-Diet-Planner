import { View, Text, FlatList } from "react-native";
import React from "react";
import RecipeIntro from "@/components/RecipeIntro";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Colors from "@/shared/Colors";
import RecipeIngredients from "@/components/RecipeIngredients";
import RecipeSteps from "@/components/RecipeSteps";

export default function RecipeDetail() {
  const { recipeId } = useLocalSearchParams();
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
        </View>
      }
    />
  );
}
