import { View, Text, Image, StyleSheet, Platform } from "react-native";
import React from "react";
import { RecipeSelectedGenerate } from "@/types/recipe.types";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Clock01FreeIcons, Fire02Icon } from "@hugeicons/core-free-icons";
import Colors from "@/shared/Colors";
import { Link } from "expo-router";
interface RecipeCardProps {
  recipe: RecipeSelectedGenerate;
}
export default function RecipeCard({ recipe }: RecipeCardProps) {
  const recipeJson = recipe?.jsonData;
  return (
    <Link
      href={`/recipe-detail?recipeId=${recipe?._id}`}
      style={{
        flex: 1,
        margin: 5,
      }}
    >
      <View>
        <Image
          source={{ uri: recipe?.imageUrl }}
          style={{
            width: "100%",
            height: 100,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
        />
        <View
          style={{
            padding: Platform.OS === "ios" ? 5 : 10,
            paddingVertical: 10,
            backgroundColor: Colors.WHITE,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}
        >
          <Text numberOfLines={1} style={{ fontSize: 17, fontWeight: "bold" }}>
            {recipe?.recipeName}
          </Text>
          <View
            style={[
              styles.infoContainer,
              { justifyContent: "space-between", marginTop: 10 },
            ]}
          >
            <View style={styles.infoContainer}>
              <HugeiconsIcon icon={Fire02Icon} color={Colors.RED} size={18} />
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.GRAY,
                }}
              >
                {recipeJson?.calories} kCal
              </Text>
            </View>
            <View style={styles.infoContainer}>
              <HugeiconsIcon
                icon={Clock01FreeIcons}
                color={Colors.RED}
                size={18}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.GRAY,
                }}
              >
                {recipeJson?.cookTime} Min
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Link>
  );
}
const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
});
