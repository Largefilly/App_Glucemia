// Components/LoginScreen.tsx
import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, Button, StyleSheet, View, Alert,TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../server/api';

const LoginScreen = ({ navigation }) => {
  const [correo, setEmail] = useState('');
  const [contraseña, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const data = await login(correo, contraseña);
  
      if (data.token) {
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('userEmail', correo);
        await AsyncStorage.setItem('userType', data.tipo_usuario);
        if (data.nombre) {
          await AsyncStorage.setItem('userName', data.nombre); 
          console.log("Nombre guardado en AsyncStorage:", data.nombre);  // 🔍 Agregamos un log para verificar
        }
        if (data.apellido) {
          await AsyncStorage.setItem('userLastname', data.apellido); 
          console.log("apellido guardado en AsyncStorage:", data.apellido);  // 🔍 Agregamos un log para verificar
        }
        if (data.id) {
          await AsyncStorage.setItem('userID', data.id);
          console.log("id guardado en AsyncStorage:", data.id);  // 🔍 Agregamos un log para verificar
        }
        
        
  
        if (data.tipo_usuario === 'medico') {
          navigation.navigate('DoctorMain');
        } else if (data.tipo_usuario === 'paciente') {
          navigation.navigate('MainMenu');
        } else {
          Alert.alert('Error', 'Tipo de usuario no reconocido.');
        }
      } else {
        Alert.alert('Error', data.message || 'Correo o contraseña incorrectos.');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Ocurrió un error al conectar con el servidor.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bienvenido a Glucoller</Text>
      <Image source={require('../assets/logoGlucoller.png')} style={styles.logo} />

      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={correo}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={contraseña}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity onPress={() => Alert.alert('Recuperar contraseña')}>
        <Text style={styles.forgotPassword}>Te olvidaste tu contraseña</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>o</Text>

      <TouchableOpacity style={styles.createAccountButton} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.createAccountButtonText}>Crear una cuenta</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
    

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 30,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 30,
      color: '#1D3557',
      fontFamily: 'Inder_400Regular', 
    },
    logo: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginBottom: 10,
    },

    input: {
      height: 50,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 15,
      paddingHorizontal: 10,
      backgroundColor: '#F9F9F9',
      fontFamily: 'Inder_400Regular',   // Aplicar la fuente Inder
    },
    forgotPassword: {
      textAlign: 'center',
      color: '#1D3557',
      textDecorationLine: 'underline',
      
      marginBottom: 20,
      fontFamily: 'Inder_400Regular',   // Aplicar la fuente Inder
    },
    loginButton: {
      backgroundColor: '#E53945',
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: 10,
      
    },
    loginButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
      fontFamily: 'Inder_400Regular',   // Aplicar la fuente Inder
    },
    orText: {
      textAlign: 'center',
      marginBottom: 10,
      color: '#2C3E50',
      fontFamily: 'Inder_400Regular',   // Aplicar la fuente Inder
    },
    createAccountButton: {
      backgroundColor: '#457B9D',
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    createAccountButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
      fontFamily: 'Inder_400Regular',   // Aplicar la fuente Inder
    },
  });

export default LoginScreen;
