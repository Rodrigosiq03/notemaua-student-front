import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Routes } from './src/app/Routes';
import { UserContextProvider } from './src/app/contexts/user_context';

export default function App() {
  return (
    <UserContextProvider>
      <SafeAreaView style={{flex:1}}>
        <StatusBar barStyle={'dark-content'} backgroundColor='transparent' translucent />
        <Routes/>
      </SafeAreaView>
    </UserContextProvider>
  );
}