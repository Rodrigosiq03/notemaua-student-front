import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login } from "../screens/Login";
import { FirstAccess } from '../screens/FirstAccess';
import { ForgotPassword } from '../screens/ForgotPassword';
import { ChangePassword } from '../screens/ChangePassword';
import { WithdrawConfirm } from '../screens/WithdrawConfirm';
import { CameraScreen } from '../screens/CameraScreen';

import { TabRoutes } from "./tab.routes";

const Stack = createNativeStackNavigator();

export function StackRoutes() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="firstAccess" component={FirstAccess} />
            <Stack.Screen name="forgotPassword" component={ForgotPassword} />
            <Stack.Screen name="changePassword" component={ChangePassword} />
            <Stack.Screen name="withdraw" component={TabRoutes} />
            <Stack.Screen name="withdrawConfirm" component={WithdrawConfirm} />
            <Stack.Screen name="cameraScreen" component={CameraScreen} />
        </Stack.Navigator>        
    )
}