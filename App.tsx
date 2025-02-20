import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useFonts, Inder_400Regular } from '@expo-google-fonts/inder';
import { StatusBar, SafeAreaView, ActivityIndicator } from 'react-native';

// Pantallas para usuarios generales
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/Register';
import HomeScreen from './components/MainMenu';
import ReporteScreen from './components/Reports';
import ContactoScreen from './components/Contacts';
import AddContactScreen from './components/AddContactScreen';
import ProfileScreen from './components/ProfileScreen';
import NotificationScreen from './components/NotificationScreen';
import NutritionInfoScreen from './components/NutritionInfoScreen';

// Pantallas para el médico
import DoctorHomeScreen from './components/MedicoMenu';
import DetallePacienteScreen from './components/DetallePacienteScreen';

// Pantallas de configuración (no aparecen en el Drawer)
import LanguageScreen from './components/LanguageScreen';
import SupportScreen from './components/SupportScreen';
import RemindersScreen from './components/RemindersScreen';
import ThemeScreen from './components/ThemeScreen';
import PrivacyPolicyScreen from './components/PrivacyPolicyScreen';
import EditProfileScreen from './components/EditProfileScreen';

import { FontAwesome } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Tipado global para el Stack, incluyendo rutas para el médico
type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Reporte: undefined;
  Contactos: undefined;
  AddContact: undefined;
  Profile: undefined;
  Language: undefined;
  Support: undefined;
  Reminders: undefined;
  Theme: undefined;
  PrivacyPolicy: undefined;
  Notificaation: undefined;
  // Rutas para el médico:
  DoctorMain: undefined;
  DetallePaciente: { paciente: any };
};

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({ Inder_400Regular });
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#1D3557" />;
  }

  // Navigator para Login y Register (fuera del Drawer)
  const StackNavigator = () => (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );

  // Drawer para usuarios generales
  const DrawerNavigator = () => (
    <Drawer.Navigator
      initialRouteName="MainMenu"
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: '#fff', width: 250 },
        drawerActiveTintColor: '#1D3557',
        drawerInactiveTintColor: '#808080',
        drawerLabelStyle: { fontFamily: 'Inder_400Regular', fontSize: 16 },
        drawerItemStyle: { marginVertical: 5 },
      }}
    >
      <Drawer.Screen
        name="Menu Principal"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => <FontAwesome name="home" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Reportes"
        component={ReporteScreen}
        options={{
          drawerIcon: ({ color, size }) => <FontAwesome name="bar-chart" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Contactos"
        component={ContactoScreen}
        options={{
          drawerIcon: ({ color, size }) => <FontAwesome name="address-book" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Perfil de Usuario"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color, size }) => <FontAwesome name="user" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Información de Nutrición"
        component={NutritionInfoScreen}
        options={{
          drawerIcon: ({ color, size }) => <FontAwesome name="info-circle" size={size} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );

  // Drawer para las funciones del médico
  const DoctorDrawerNavigator = () => (
    <Drawer.Navigator
      initialRouteName="Inicio Médico"
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: '#fff', width: 250 },
        drawerActiveTintColor: '#1D3557',
        drawerInactiveTintColor: '#808080',
        drawerLabelStyle: { fontFamily: 'Inder_400Regular', fontSize: 16 },
        drawerItemStyle: { marginVertical: 5 },
      }}
    >
      <Drawer.Screen
        name="Inicio Médico"
        component={DoctorHomeScreen}
        options={{
          drawerIcon: ({ color, size }) => <FontAwesome name="stethoscope" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Reportes Médicos"
        component={ReporteScreen}
        options={{
          drawerIcon: ({ color, size }) => <FontAwesome name="file-text-o" size={size} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <Stack.Navigator initialRouteName="Login">
          {/* Pantallas fuera del Drawer */}
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          {/* Pantallas para usuarios generales */}
          <Stack.Screen name="MainMenu" component={DrawerNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="AddContact" component={AddContactScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Language" component={LanguageScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Support" component={SupportScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Reminders" component={RemindersScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Theme" component={ThemeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} options={{ headerShown: false }} />
          <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{ headerShown: false }} />
          {/* Rutas para el médico */}
          <Stack.Screen name="DoctorMain" component={DoctorDrawerNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="DetallePaciente" component={DetallePacienteScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
