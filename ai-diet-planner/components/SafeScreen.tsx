import { View } from "react-native";
import React, { ReactNode } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/shared/Colors";

const SafeScreen = ({ children }: { children: ReactNode }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top,
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      {children}
    </View>
  );
};

export default SafeScreen;
