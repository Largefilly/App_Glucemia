import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
//import { StatusBar, SafeAreaView } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer'; // Importamos el Drawer Navigator

// Asegúrate de instalar las fuentes de Expo Google Fonts si aún no lo has hecho
import { useFonts, Inder_400Regular } from '@expo-google-fonts/inder';
import { StatusBar, SafeAreaView, ActivityIndicator } from 'react-native';

// Pantallas Importadas
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/Register';
import HomeScreen from './components/MainMenu';
import ReporteScreen from './components/Reportes';
import ContactoScreen from './components/Contactos';
import AddContactScreen from './components/AddContactScreen'; // Asegúrate de que esta pantalla esté importada

// Pantallas Añadidas
import ProfileScreen from './components/ProfileScreen';

// Pantallas de Configuración (que no aparecerán en el Drawer)
import LanguageScreen from './components/LanguageScreen';
import SupportScreen from './components/SupportScreen';
import RemindersScreen from './components/RemindersScreen';
import ThemeScreen from './components/ThemeScreen';
import PrivacyPolicyScreen from './components/PrivacyPolicyScreen';
import EditProfileScreen from './components/EditProfileScreen';

import { FontAwesome } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator(); // Creamos el Drawer Navigator

// Tipos opcionales para las rutas (puedes agregar más si es necesario)
type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Reporte: undefined;
  Contactos: undefined;
  AddContact: undefined; // Añadimos la ruta para la pantalla de agregar contacto
  Profile: undefined;
  Language: undefined;
  Support: undefined;
  Reminders: undefined;
  Theme: undefined;
  PrivacyPolicy: undefined;
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
    <Drawer.Navigator
      initialRouteName="MainMenu"
      screenOptions={{
        headerShown: false,  // Ocultar encabezado
        drawerStyle: {
          backgroundColor: '#fff',  // Fondo blanco
          width: 250,  // Ancho del Drawer
        },
        drawerActiveTintColor: '#1D3557',  // Color de la opción activa
        drawerInactiveTintColor: '#808080',  // Color de las opciones inactivas
        drawerLabelStyle: {
          fontFamily: 'Inder_400Regular',  // Fuente personalizada
          fontSize: 16,
        },
        drawerItemStyle: {
          marginVertical: 5,  // Espaciado entre elementos
        },
      }}
    >
      <Drawer.Screen 
        name="Menu Principal" 
        component={HomeScreen} 
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }} 
      />
      <Drawer.Screen 
        name="Reportes" 
        component={ReporteScreen} 
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="bar-chart" size={size} color={color} />
          ),
        }} 
      />
      <Drawer.Screen 
        name="Contactos" 
        component={ContactoScreen} 
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="address-book" size={size} color={color} />
          ),
        }} 
      />
      <Drawer.Screen 
        name="Perfil de Usuario" 
        component={ProfileScreen} 
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }} 
      />
    </Drawer.Navigator>
  );

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Configuración de la barra de estado */}
        <StatusBar
          barStyle="dark-content" // Define el color de los íconos (claro para fondo oscuro y oscuro para fondo claro)
          backgroundColor="#fff" // Color del fondo de la barra de estado
        />

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

          {/* Pantalla de agregar contacto */}
          <Stack.Screen
            name="AddContact"
            component={AddContactScreen}
            options={{ headerShown: false }}
          />

          {/* Pantallas de perfil y configuración */}
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfileScreen}
            options={{ headerShown: false }}
          />

          {/* Pantallas de configuración (no visibles en el Drawer) */}
          <Stack.Screen
            name="Language"
            component={LanguageScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Support"
            component={SupportScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Reminders"
            component={RemindersScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Theme"
            component={ThemeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PrivacyPolicy"
            component={PrivacyPolicyScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;