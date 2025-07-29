import { View, Text } from "react-native";
import React from "react";
import { RecipeSelectedGenerate } from "@/types/recipe.types";
interface RecipeStepsProps {
  recipeDetail: RecipeSelectedGenerate;
}
export default function RecipeSteps({ recipeDetail }: RecipeStepsProps) {
  return (
    <View>
      <Text>RecipeSteps</Text>
    </View>
  );
}
