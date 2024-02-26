import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";

import { WithdrawNotebook } from "../screen/WithdrawNotebook";
import { Account } from "../screen/Account";
import { StackRoutes } from "./stack.routes";
import { ConfigScreen } from "../screen/ConfigScreen";

const Tab = createBottomTabNavigator();

export function TabRoutes() {
    return (
        <Tab.Navigator initialRouteName="withdrawNotebook" screenOptions={{headerShown: false, tabBarShowLabel: false}}>
            <Tab.Screen name="account" component={Account} options={{
                tabBarIcon: ({color}) => <Icon name="user" size={20} color={color} />
            }}/>
            <Tab.Screen name="withdrawNotebook" component={WithdrawNotebook} options={{
                tabBarIcon: ({color}) => <Icon name="laptop" size={20} color={color} />,
            }} />
            <Tab.Screen name="config" component={ConfigScreen} options={{
                tabBarIcon: ({color}) => <Icon name="cog" size={20} color={color} />,
            }}/>
        </Tab.Navigator>
    )
}