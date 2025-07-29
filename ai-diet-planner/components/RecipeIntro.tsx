import { View, Text, Platform, Image, StyleSheet } from "react-native";
import React from "react";
import { RecipeSelectedGenerate } from "@/types/recipe.types";
import { HugeiconsIcon } from "@hugeicons/react-native";
import {
  Dumbbell01Icon,
  Fire03Icon,
  PlusSignSquareIcon,
  ServingFoodIcon,
  TimeQuarter02Icon,
} from "@hugeicons/core-free-icons";
import Colors from "@/shared/Colors";
interface RecipeIntroProps {
  recipeDetail: RecipeSelectedGenerate;
}
export default function RecipeIntro({ recipeDetail }: RecipeIntroProps) {
  const RecipeJson = recipeDetail?.jsonData;
  return (
    <View>
      <Image
        source={{ uri: recipeDetail?.imageUrl }}
        style={{ width: "100%", height: 200, borderRadius: 15 }}
      />
      <View
        style={{
          marginTop: 15,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            width: "80%",
          }}
          numberOfLines={2}
        >
          {recipeDetail?.recipeName}
        </Text>
        <View
          style={{
            width: "20%",
            alignItems: "flex-end",
          }}
        >
          <HugeiconsIcon
            icon={PlusSignSquareIcon}
            size={40}
            color={Colors.PRIMARY}
          />
        </View>
      </View>
      <Text
        style={{
          fontSize: 16,
          marginTop: 6,
          lineHeight: 25,
          color: Colors.GRAY,
        }}
      >
        {RecipeJson?.description}
      </Text>
      <View
        style={{
          marginTop: 15,
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <View style={styles.propertiesContainer}>
          <HugeiconsIcon icon={Fire03Icon} color={Colors.PRIMARY} size={27} />
          <Text style={styles.subText}>Calories</Text>
          <Text style={styles.counts}>{RecipeJson?.calories}</Text>
        </View>
        {/* <View style={styles.propertiesContainer}>
          <HugeiconsIcon
            icon={Dumbbell01Icon}
            color={Colors.PRIMARY}
            size={27}
          />
          <Text style={styles.subText}>Proteins</Text>
          <Text style={styles.counts}>{RecipeJson.calories}</Text>
        </View> */}
        <View style={styles.propertiesContainer}>
          <HugeiconsIcon
            icon={TimeQuarter02Icon}
            color={Colors.PRIMARY}
            size={27}
          />
          <Text style={styles.subText}>Time</Text>
          <Text style={styles.counts}>{RecipeJson?.cookTime} min</Text>
        </View>
        <View style={styles.propertiesContainer}>
          <HugeiconsIcon
            icon={ServingFoodIcon}
            color={Colors.PRIMARY}
            size={27}
          />
          <Text style={styles.subText}>Serve</Text>
          <Text style={styles.counts}>{RecipeJson?.serveTo}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  iconBg: {
    padding: 6,
  },
  propertiesContainer: {
    alignItems: "center",
    backgroundColor: "#fbf5ff",
    padding: 6,
    borderRadius: 10,
    flex: 1,
  },
  subText: {
    fontSize: 18,
  },
  counts: {
    fontSize: 22,
    color: Colors.PRIMARY,
    fontWeight: "bold",
  },
});
