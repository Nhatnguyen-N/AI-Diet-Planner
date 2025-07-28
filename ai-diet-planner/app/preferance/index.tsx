import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import Colors from "@/shared/Colors";
import Input from "@/components/shared/Input";
import { HugeiconsIcon } from "@hugeicons/react-native";
import {
  Dumbbell01Icon,
  FemaleSymbolFreeIcons,
  MaleSymbolIcon,
  PlusSignSquareIcon,
  WeightScaleIcon,
} from "@hugeicons/core-free-icons";
import Button from "@/components/shared/Button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@/context/UserContext";
import { User } from "@/types/user.types";
import { useRouter } from "expo-router";
import { CalculateCaloriesAI } from "../../services/AiModel";
import Prompt from "../../shared/Prompt";
export default function Preferance() {
  const [weight, setWeight] = useState<string>();
  const [height, setHeight] = useState<string>();
  const [gender, setGender] = useState<string>();
  const [goal, setGoal] = useState("");
  const router = useRouter();
  const { user, setUser } = useUser();
  const UpdateUserPref = useMutation(api.Users.UpdateUserPref);
  const OnContinue = async () => {
    if (!weight || !height || !gender) {
      Alert.alert("Fill all detail", "Enter all details to");
      return;
    }
    const data = {
      uid: user!._id!,
      weight: parseFloat(weight),
      height: parseFloat(height),
      gender: gender,
      goal: goal,
    };

    const PROMPT = JSON.stringify(data) + Prompt.CALORIES_PROMPT;
    console.log(PROMPT);

    const AIResult = await CalculateCaloriesAI.sendMessage(PROMPT);
    const resp = JSON.parse(AIResult.response.text());
    console.log(resp);

    await UpdateUserPref({
      ...data,
      calories: parseFloat(resp.calories),
      proteins: parseFloat(resp.proteins),
    });
    const updateUser: User = {
      name: user?.name!,
      email: user?.email!,
      picture: user?.picture!,
      subscriptionId: user?.subscriptionId,
      credits: user?.credits!,
      height: data.height,
      weight: data.height,
      gender: data.gender,
      goal: data.goal,
      calories: parseFloat(resp.calories),
      proteins: parseFloat(resp.proteins),
      _id: data.uid,
    };
    setUser(updateUser);
    router.replace("/(tabs)/home");
  };

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 30,
          fontWeight: "bold",
          marginTop: 30,
        }}
      >
        Tell us about yourself
      </Text>
      <Text
        style={{
          fontSize: 16,
          textAlign: "center",
          color: Colors.GRAY,
        }}
      >
        This help us create your personalized plan
      </Text>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
        }}
      >
        <View style={{ flex: 1 }}>
          <Input
            placeholder="e.g 70"
            onChangeText={setWeight}
            label="weight (kg)"
          />
        </View>
        <View style={{ flex: 1 }}>
          <Input
            placeholder="e.g 5.10"
            onChangeText={setHeight}
            label="Height (cm)"
          />
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontWeight: "600", fontSize: 18 }}>Gender</Text>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => setGender("Male")}
            style={{
              borderWidth: gender === "Male" ? 2 : 1,
              padding: 15,
              borderColor: gender === "Male" ? Colors.PRIMARY : Colors.GRAY,
              borderRadius: 10,
              flex: 1,
              alignItems: "center",
            }}
          >
            <HugeiconsIcon
              icon={MaleSymbolIcon}
              size={40}
              color={Colors.BLUE}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setGender("Female")}
            style={{
              borderWidth: gender === "Female" ? 2 : 1,
              padding: 15,
              borderColor: gender === "Female" ? Colors.PRIMARY : Colors.GRAY,
              borderRadius: 10,
              flex: 1,
              alignItems: "center",
            }}
          >
            <HugeiconsIcon
              icon={FemaleSymbolFreeIcons}
              size={40}
              color={Colors.PINK}
            />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 15 }}>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 18,
            }}
          >
            What&apos;s Your Goak?
          </Text>
          <TouchableOpacity
            onPress={() => setGoal("Weight Loss")}
            style={[
              styles.goalContainer,
              {
                borderColor:
                  goal === "Weight Loss" ? Colors.PRIMARY : Colors.GRAY,
                borderWidth: goal === "Weight Loss" ? 2 : 1,
              },
            ]}
          >
            <HugeiconsIcon icon={WeightScaleIcon} />
            <View>
              <Text style={styles.goalText}>Weight Loss</Text>
              <Text>Reduce body fat & get leaner</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setGoal("Muscle Gain")}
            style={[
              styles.goalContainer,
              {
                borderColor:
                  goal === "Muscle Gain" ? Colors.PRIMARY : Colors.GRAY,
                borderWidth: goal === "Muscle Gain" ? 2 : 1,
              },
            ]}
          >
            <HugeiconsIcon icon={Dumbbell01Icon} />
            <View>
              <Text style={styles.goalText}>Muscle Gain</Text>
              <Text>Build Muscle & get Stronger</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setGoal("Weight Gain")}
            style={[
              styles.goalContainer,
              {
                borderColor:
                  goal === "Weight Gain" ? Colors.PRIMARY : Colors.GRAY,
                borderWidth: goal === "Weight Gain" ? 2 : 1,
              },
            ]}
          >
            <HugeiconsIcon icon={PlusSignSquareIcon} />
            <View>
              <Text style={styles.goalText}>Weight Gain</Text>
              <Text>Increase healthy body mass</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop: 25 }}>
        <Button title="Continue" onPress={OnContinue} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  goalContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 15,
    marginTop: 10,
  },
  goalText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  goalSubText: {
    color: Colors.GRAY,
  },
});
