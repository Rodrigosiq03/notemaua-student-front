import { Tabs } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        options={{
          tabBarLabel: "Conta",
          tabBarIcon: ({ color }) => <Icon name="user" size={20} color={color} />,
        }}
        name="account/index"
      />
      <Tabs.Screen
        options={{
          tabBarLabel: "Notebook",
          tabBarIcon: ({ color }) => <Icon name="laptop" size={20} color={color} />,
        }}
        name="withdraw/index"
      />
      {/* <Tabs.Screen 
        options={{
          tabBarLabel: "Config",
          tabBarIcon: ({color}) => <Icon name="cog" size={20} color={color} />,
        }}
        name="config/index" 
      /> */}
    </Tabs>
  );
}
