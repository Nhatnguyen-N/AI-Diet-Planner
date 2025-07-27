// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Platform } from "react-native";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-diet-planner-a30f0.firebaseapp.com",
  projectId: "ai-diet-planner-a30f0",
  storageBucket: "ai-diet-planner-a30f0.firebasestorage.app",
  messagingSenderId: "877673339745",
  appId: "1:877673339745:web:1504902e16f9b78e1d4320",
  measurementId: "G-WDX3CCPSY1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =
  Platform.OS === "web"
    ? getAuth(app)
    : initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage),
      });
