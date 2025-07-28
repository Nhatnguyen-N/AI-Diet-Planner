import { Alert, Image, Pressable, Text, View } from "react-native";
import React, { useState } from "react";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/FirebaseConfig";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@/context/UserContext";

export default function SignUp() {
  const router = useRouter();

  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const createNewUser = useMutation(api.Users.CreateNewUser);
  const { setUser } = useUser();
  const onSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert("Missing Fields", "Enter All field Value");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        if (user) {
          const result = await createNewUser({
            name: name,
            email: email,
          });
          console.log(result);
          setUser(result);
          // Navigation to HomeScreen
        }
        //...
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
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
        Create New Account
      </Text>
      <View style={{ marginTop: 20, width: "100%" }}>
        <Input placeholder="Full Name" onChangeText={setName} />
        <Input placeholder="Email" onChangeText={setEmail} />
        <Input
          placeholder="Password"
          password={true}
          onChangeText={setPassword}
        />
      </View>
      <View style={{ marginTop: 15, width: "100%" }}>
        <Button title="Create Account" onPress={() => onSignUp()} />
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            marginTop: 15,
          }}
        >
          Already have an account?
        </Text>
        <Pressable onPress={() => router.push("/auth/sign-in")}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              marginTop: 5,
              fontWeight: "bold",
            }}
          >
            Sign In Here
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
