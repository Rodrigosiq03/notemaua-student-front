import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Login } from '../screen/Login';
import { FirstAccess } from '../screen/FirstAccess';
import { ForgotPassword } from '../screen/ForgotPassword';
import { ChangePassword } from '../screen/ChangePassword';
import { WithdrawNotebook } from '../screen/WithdrawNotebook';
import { WithdrawConfirm } from '../screen/WithdrawConfirm';

const { Navigator, Screen } = createNativeStackNavigator();



export function AppRoutes(){
    return (
        <Navigator screenOptions={{ headerShown: false}} initialRouteName='login'>
            <Screen  name="login" component={Login}/>
            <Screen  name="firstAccess" component={FirstAccess}/>
            <Screen  name="forgotPassword" component={ForgotPassword}/>
            <Screen  name="changePassword" component={ChangePassword}/>
            <Screen  name="withdrawNotebook" component={WithdrawNotebook}/>
            <Screen  name="withdrawConfirm" component={WithdrawConfirm}/>
        </Navigator>
    )
}