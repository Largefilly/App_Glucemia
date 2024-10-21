// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { SafeAreaView, ActivityIndicator } from 'react-native';
import { useFonts, Inder_400Regular } from '@expo-google-fonts/inder';

import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/Register';
import MainMenuScreen from './components/MainMenu';

const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Inder_400Regular,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="MainMenu" component={MainMenuScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
