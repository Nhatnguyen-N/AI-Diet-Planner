import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { MealPlanWithRecipe } from "@/types/meal.types";
import Colors from "@/shared/Colors";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { CheckmarkSquare02Icon, SquareIcon } from "@hugeicons/core-free-icons";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRefreshData } from "@/context/RefreshDataContext";
interface MealPlanCardProps {
  mealPlanInfo: MealPlanWithRecipe;
  // refreshData?: () => Promise<void>;
}
export default function MealPlanCard({ mealPlanInfo }: MealPlanCardProps) {
  const updateStatus = useMutation(api.MealPlan.updateStatus);
  const { setRefreshData } = useRefreshData();
  const onCheck = async (status: boolean) => {
    const result = await updateStatus({
      id: mealPlanInfo?.mealPlan?._id,
      status: status,
      calories: mealPlanInfo?.recipe?.jsonData?.calories!,
    });
    Alert.alert("Great!", "Status Updated!");
    setRefreshData(Date.now());
  };
  return (
    <View
      style={{
        padding: 10,
        flexDirection: "row",
        gap: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        marginTop: 10,
      }}
    >
      <Image
        source={{ uri: mealPlanInfo?.recipe?.imageUrl }}
        style={{
          width: 80,
          height: 80,
          borderRadius: 15,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
          flex: 1,
        }}
      >
        <View style={{ width: "85%" }}>
          <Text style={styles.mealTypeText}>
            {mealPlanInfo?.mealPlan.mealType}
          </Text>
          <Text style={styles.recipeName} numberOfLines={2}>
            {mealPlanInfo?.recipe?.recipeName}
          </Text>
          <Text style={styles.calories}>
            {mealPlanInfo?.recipe?.jsonData?.calories} kcal
          </Text>
        </View>
        <View
          style={{
            width: "15%",
          }}
        >
          {mealPlanInfo?.mealPlan?.status !== true ? (
            <TouchableOpacity onPress={() => onCheck(true)}>
              <HugeiconsIcon icon={SquareIcon} color={Colors.GRAY} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => onCheck(false)}>
              <HugeiconsIcon
                icon={CheckmarkSquare02Icon}
                color={Colors.GREEN}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mealTypeText: {
    backgroundColor: Colors.SECONDERY,
    color: Colors.PRIMARY,
    padding: 1,
    paddingHorizontal: 10,
    borderRadius: 99,
    flexWrap: "wrap",
    width: 90,
    textAlign: "center",
  },
  recipeName: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  calories: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.GREEN,
  },
});
