import { Stack } from "expo-router";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { UserProvider } from "@/context/UserContext";
import SafeScreen from "@/components/SafeScreen";
import { RefreshDataProvider } from "@/context/RefreshDataContext";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});
export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <UserProvider>
        <RefreshDataProvider>
          <SafeScreen>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="index" />
            </Stack>
          </SafeScreen>
        </RefreshDataProvider>
      </UserProvider>
    </ConvexProvider>
  );
}
