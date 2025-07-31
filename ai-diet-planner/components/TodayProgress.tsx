import { View, Text } from "react-native";
import moment from "moment";
import Colors from "@/shared/Colors";
import { useUser } from "@/context/UserContext";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";
import { useRefreshData } from "@/context/RefreshDataContext";
export default function TodayProgress() {
  const { user } = useUser();
  const convex = useConvex();
  const [totalCaloriesConsumed, setTotalCaloriesConsumed] = useState<number>();
  const { refreshData } = useRefreshData();

  useEffect(() => {
    user && GetTotalCaloriesConsumed();
  }, [user, refreshData]);
  const GetTotalCaloriesConsumed = async () => {
    const result = await convex.query(api.MealPlan.GetTotalCaloriesConsumed, {
      date: moment().format("DD/MM/YYYY"),
      uid: user?._id!,
    });
    setTotalCaloriesConsumed(result);
  };
  return (
    <View
      style={{
        marginTop: 15,
        padding: 15,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Today&apos;s Goal
        </Text>
        <Text style={{ fontSize: 18 }}>{moment().format("MMM DD, yyyy")}</Text>
      </View>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 10,
          color: Colors.PRIMARY,
        }}
      >
        {totalCaloriesConsumed}/{user?.calories} kcal
      </Text>
      <Text style={{ textAlign: "center", marginTop: 2, fontSize: 16 }}>
        You&apos;re doing great!
      </Text>
      <View
        style={{
          backgroundColor: Colors.GRAY,
          height: 10,
          borderRadius: 99,
          marginTop: 15,
          opacity: 0.7,
        }}
      >
        <View
          style={{
            backgroundColor: Colors.PRIMARY,
            width: "70%",
            height: 10,
            borderRadius: 99,
          }}
        ></View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 5,
        }}
      >
        <Text>Calories Consumes</Text>
        <Text>Kepp it up! 🔥</Text>
      </View>
    </View>
  );
}
