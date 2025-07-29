import { View, Text, FlatList } from "react-native";
import React from "react";
import { RecipeSelectedGenerate } from "@/types/recipe.types";
import Colors from "@/shared/Colors";
interface RecipeIngredientsProps {
  recipeDetail: RecipeSelectedGenerate;
}
export default function RecipeIngredients({
  recipeDetail,
}: RecipeIngredientsProps) {
  const ingredients = recipeDetail?.jsonData?.ingredients;

  return (
    <View style={{ marginTop: 15 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Ingredients
        </Text>
        <Text
          style={{
            fontSize: 20,
          }}
        >
          {ingredients?.length} Items
        </Text>
      </View>
      <FlatList
        data={ingredients}
        renderItem={({ item, index }) => (
          <View
            key={index}
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Text
                style={{
                  padding: 7,
                  fontSize: 23,
                  backgroundColor: Colors.SECONDERY,
                  borderRadius: 99,
                }}
              >
                {item?.icon}
              </Text>
              <Text style={{ fontSize: 17, fontWeight: "600" }}>
                {item?.ingredient}
              </Text>
            </View>
            <Text style={{ color: Colors.GRAY, fontSize: 16 }}>
              {item?.quantity}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
