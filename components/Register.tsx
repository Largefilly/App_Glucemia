// Components/RegisterScreen.tsx
import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, Button, StyleSheet, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [disease, setDisease] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !surname || !email || !day || !month || !year || !disease || !password) {
      Alert.alert('Error', 'Todos los campos deben ser completados.');
    } else {
      try {
        // Guardar los datos en AsyncStorage
        await AsyncStorage.setItem('userEmail', email);
        await AsyncStorage.setItem('userPassword', password);
        Alert.alert('Cuenta creada con éxito', 'Ahora puedes iniciar sesión', [
          { text: 'OK', onPress: () => navigation.navigate('Login') },
        ]);
      } catch (error) {
        Alert.alert('Error', 'Ocurrió un error al crear la cuenta');
      }
    }
  };

  const handleCancel = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <TextInput style={styles.input} placeholder="Nombre" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Apellidos" value={surname} onChangeText={setSurname} />
      <TextInput style={styles.input} placeholder="Correo electrónico" value={email} onChangeText={setEmail} keyboardType="email-address" />
      
      <View style={styles.dateContainer}>
        <TextInput style={styles.dateInput} placeholder="Día" value={day} onChangeText={setDay} keyboardType="numeric" />
        <TextInput style={styles.dateInput} placeholder="Mes" value={month} onChangeText={setMonth} keyboardType="numeric" />
        <TextInput style={styles.dateInput} placeholder="Año" value={year} onChangeText={setYear} keyboardType="numeric" />
      </View>

      <TextInput style={styles.input} placeholder="Tipo de enfermedad" value={disease} onChangeText={setDisease} />
      <TextInput style={styles.input} placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry={true} />

      <View style={styles.buttonContainer}>
        <Button title="Cancelar" onPress={handleCancel} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Siguiente" onPress={handleRegister} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  buttonContainer: {
    marginBottom: 10,
  },
});

export default RegisterScreen;

