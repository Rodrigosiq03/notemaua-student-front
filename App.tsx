import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Routes } from './src/app/Routes';

export default function App() {
  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar barStyle={'dark-content'} backgroundColor='transparent' translucent />
      <Routes/>
    </SafeAreaView>
  );
}
