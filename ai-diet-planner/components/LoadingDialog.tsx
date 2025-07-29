import Colors from "@/shared/Colors";
import { View, Text, Modal, ActivityIndicator } from "react-native";
interface LoadingDialogProps {
  loading: boolean;
}
export default function LoadingDialog({ loading }: LoadingDialogProps) {
  return (
    <Modal transparent visible={loading}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#00000070",
        }}
      >
        <View
          style={{
            padding: 20,
            borderRadius: 15,
            backgroundColor: Colors.PRIMARY,
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={"large"} color={Colors.WHITE} />
          <Text
            style={{
              color: Colors.WHITE,
              fontSize: 18,
              marginTop: 8,
            }}
          >
            Loading...
          </Text>
        </View>
      </View>
    </Modal>
  );
}
