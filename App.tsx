import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Routes } from './src/app/Routes';
import { UserContextProvider } from './src/app/contexts/user_context';
import { WithdrawContextProvider } from './src/app/contexts/withdraw_context';

export default function App() {
  return (
    <SafeAreaView style={{flex:1}}>
      <UserContextProvider>
        <WithdrawContextProvider>
          <StatusBar barStyle={'dark-content'} backgroundColor='transparent' translucent />
          <Routes/>
        </WithdrawContextProvider>
      </UserContextProvider>
    </SafeAreaView>
  );
}