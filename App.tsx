// App.tsx
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';

// Asegúrate de instalar las fuentes de Expo Google Fonts si aún no lo has hecho
import { useFonts, Inder_400Regular } from '@expo-google-fonts/inder';
import { ActivityIndicator } from 'react-native';

// Pantallas Importadas
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/Register'; // Cambié a RegisterScreen para seguir el estilo anterior
import HomeScreen from './components/HomeScreen';
import ReporteScreen from './components/Reportes';
import ContactoScreen from './components/Contactos';

const Stack = createStackNavigator();

// Tipos opcionales para las rutas (puedes agregar más si es necesario)
type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Reporte: undefined;
  Contactos: undefined;
};

const loadFonts = async () => {
  await Font.loadAsync({
    'Inder': require('./assets/fonts/Inder-Regular.ttf'),
  });
};

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Inder_400Regular,
  });

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Pantalla de Login */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        {/* Pantalla de Registro */}
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        {/* Pantalla Principal */}
        <Stack.Screen
          name="MainMenu"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        {/* Pantalla de Reporte */}
        <Stack.Screen
          name="Reporte"
          component={ReporteScreen}
          options={{ headerShown: false }}
        />
        {/* Pantalla de Contactos */}
        <Stack.Screen
          name="Contactos"
          component={ContactoScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;