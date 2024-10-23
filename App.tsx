// App.tsx
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';

import { createDrawerNavigator } from '@react-navigation/drawer'; // Importamos el Drawer Navigator

// Asegúrate de instalar las fuentes de Expo Google Fonts si aún no lo has hecho
import { useFonts, Inder_400Regular } from '@expo-google-fonts/inder';
import { ActivityIndicator } from 'react-native';

// Pantallas Importadas
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/Register'; // Cambié a RegisterScreen para seguir el estilo anterior
import HomeScreen from './components/MainMenu';
import ReporteScreen from './components/Reportes';
import ContactoScreen from './components/Contactos';

// Pantallas Añadidas
import AddContactScreen from './components/AddContactScreen';
import ProfileScreen from './components/ProfileScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator(); // Creamos el Drawer Navigator

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

  // Creamos el Stack para Login y Register (fuera del Drawer)
  const StackNavigator = () => (
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
    </Stack.Navigator>
  );

  // Creamos el Drawer Navigator para las pantallas dentro del menú principal
  const DrawerNavigator = () => (
    <Drawer.Navigator initialRouteName="MainMenu">
      <Drawer.Screen name="Main Menu" component={HomeScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Reportes" component={ReporteScreen}  options={{ headerShown: false }}/>
      <Drawer.Screen name="Contactos" component={ContactoScreen}  options={{ headerShown: false }}/>
      <Drawer.Screen name="Perfil de Usuario" component={ProfileScreen} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );

  return (
    <NavigationContainer>
      {/* Aquí integramos el Stack y el Drawer */}
      <Stack.Navigator initialRouteName="Login">
        {/* Pantallas fuera del Drawer (Login y Register) */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />

        {/* El Drawer Navigator como la pantalla principal */}
        <Stack.Screen
          name="MainMenu"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;