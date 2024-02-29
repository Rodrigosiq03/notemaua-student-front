import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login } from "../screen/Login";
import { FirstAccess } from '../screen/FirstAccess';
import { ForgotPassword } from '../screen/ForgotPassword';
import { ChangePassword } from '../screen/ChangePassword';
import { WithdrawConfirm } from '../screen/WithdrawConfirm';
import { CameraScreen } from '../screen/CameraScreen';

import { TabRoutes } from "./tab.routes";

const Stack = createNativeStackNavigator();

export function StackRoutes() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="firstAccess" component={FirstAccess} />
            <Stack.Screen name="forgotPassword" component={ForgotPassword} />
            <Stack.Screen name="changePassword" component={ChangePassword} />
            <Stack.Screen name="withdrawNotebook" component={TabRoutes} />
            <Stack.Screen name="withdrawConfirm" component={WithdrawConfirm} />
            <Stack.Screen name="cameraScreen" component={CameraScreen} />
        </Stack.Navigator>        
    )
}