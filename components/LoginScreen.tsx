// Components/LoginScreen.tsx
import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, Button, StyleSheet, View, Alert,TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('userEmail');
        const storedPassword = await AsyncStorage.getItem('userPassword');
  
        if (email === storedEmail && password === storedPassword) {
          navigation.navigate('MainMenu');
        } else {
          Alert.alert('Error', 'Correo o contraseña incorrectos.');
        }
      } catch (error) {
        Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
      }
    };

    return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Bienvenido a Glucoller</Text>
        {/* Cambiar Logo */}
          <Image source={require('../assets/glucoller.png')} style={styles.logo} /> 
    
          <TextInput
            style={styles.input}
            placeholder="Correo"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
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
      fontFamily: 'Inder', 
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
      fontFamily: 'Inder',   // Aplicar la fuente Inder
    },
    forgotPassword: {
      textAlign: 'center',
      color: '#1D3557',
      textDecorationLine: 'underline',
      
      marginBottom: 20,
      fontFamily: 'Inder',   // Aplicar la fuente Inder
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
      fontFamily: 'Inder',   // Aplicar la fuente Inder
    },
    orText: {
      textAlign: 'center',
      marginBottom: 10,
      color: '#2C3E50',
      fontFamily: 'Inder',   // Aplicar la fuente Inder
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
      fontFamily: 'Inder',   // Aplicar la fuente Inder
    },
  });

export default LoginScreen;
