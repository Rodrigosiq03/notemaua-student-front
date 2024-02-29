import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Login } from '../screen/Login';
import { FirstAccess } from '../screen/FirstAccess';
import { ForgotPassword } from '../screen/ForgotPassword';
import { ChangePassword } from '../screen/ChangePassword';
import { WithdrawNotebook } from '../screen/WithdrawNotebook';
import { WithdrawConfirm } from '../screen/WithdrawConfirm';
import { CameraScreen } from '../screen/CameraScreen';

const Tab = createBottomTabNavigator();

export function AppRoutes(){
    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="Login" component={Login} options={{tabBarStyle: {display: "none"}}}/>
        </Tab.Navigator>
    )
}