import { Alert, Image, Pressable, Text, View } from "react-native";
import React, { useState } from "react";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/FirebaseConfig";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@/context/UserContext";

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const convex = useConvex();
  const { setUser } = useUser();

  const onSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Enter All field Value");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const userData = await convex.query(api.Users.GetUser, {
          email: email,
        });
        console.log(user);
        setUser(userData);
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        Alert.alert(
          "Incorrect Email & Password",
          "Please enter valid email and password"
        );
      });
  };
  return (
    <View style={{ alignItems: "center", padding: 20 }}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={{
          width: 150,
          height: 150,
          marginTop: 60,
        }}
      />
      <Text
        style={{
          fontSize: 35,
          fontWeight: "bold",
        }}
      >
        Welcome Back
      </Text>
      <View style={{ marginTop: 20, width: "100%" }}>
        <Input placeholder="Email" onChangeText={setEmail} />
        <Input
          placeholder="Password"
          password={true}
          onChangeText={setPassword}
        />
      </View>
      <View style={{ marginTop: 15, width: "100%" }}>
        <Button title="Sign In" onPress={() => onSignIn()} />
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            marginTop: 15,
          }}
        >
          Don&apos;t have an account?
        </Text>
        <Pressable onPress={() => router.push("/auth/sign-up")}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              marginTop: 5,
              fontWeight: "bold",
            }}
          >
            Create New Account
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
