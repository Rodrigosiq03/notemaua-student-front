import { UserContextProvider } from "@/contexts/user_context";
import { WithdrawContextProvider } from "@/contexts/withdraw_context";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <WithdrawContextProvider>
      <UserContextProvider>
        <Stack screenOptions={{
          headerShown: false,
        }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="withdraw_confirm/index" />
          {/* <Stack.Screen name="camera_screen/index" /> */}
          <Stack.Screen name="(tabs)" />
        </Stack>
      </UserContextProvider>
    </WithdrawContextProvider>
  );
}
