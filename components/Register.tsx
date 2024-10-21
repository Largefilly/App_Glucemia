// Components/RegisterScreen.tsx
import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, Button, StyleSheet, View, Alert, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    dia: '',
    mes: '',
    anio: '',
    enfermedad: '',
    password: '',
  });

  const handleChange = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const handleRegister = async () => {
    const { nombre, apellidos, correo, dia, mes, anio, enfermedad, password } = form;

    // Validar que todos los campos estén completos
    if (!nombre || !apellidos || !correo || !dia || !mes || !anio || !enfermedad || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    // Almacenar datos del usuario localmente
    try {
      await AsyncStorage.setItem('userEmail', correo);
      await AsyncStorage.setItem('userPassword', password);
      Alert.alert('Cuenta creada con éxito');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al registrar tu cuenta.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Botón de regreso */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <FontAwesome name="arrow-left" size={24} color="red" />
      </TouchableOpacity>

      <Text style={styles.title}>Registro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre *"
        value={form.nombre}
        onChangeText={(text) => handleChange('nombre', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellidos *"
        value={form.apellidos}
        onChangeText={(text) => handleChange('apellidos', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo *"
        value={form.correo}
        onChangeText={(text) => handleChange('correo', text)}
        keyboardType="email-address"
      />

      {/* Fecha de nacimiento */}
      <View style={styles.dateRow}>
        <TextInput
          style={[styles.input, styles.dateInput]}
          placeholder="Día *"
          value={form.dia}
          onChangeText={(text) => handleChange('dia', text)}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, styles.dateInput]}
          placeholder="Mes *"
          value={form.mes}
          onChangeText={(text) => handleChange('mes', text)}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, styles.dateInput]}
          placeholder="Año *"
          value={form.anio}
          onChangeText={(text) => handleChange('anio', text)}
          keyboardType="numeric"
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Tipo de enfermedad *"
        value={form.enfermedad}
        onChangeText={(text) => handleChange('enfermedad', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña *"
        value={form.password}
        onChangeText={(text) => handleChange('password', text)}
        secureTextEntry={true}
      />

      {/* Botones de cancelar y siguiente */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
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
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Inder_400Regular',
    color: '#2C3E50',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#F9F9F9',
    fontFamily: 'Inder_400Regular',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  dateInput: {
    width: '30%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#E74C3C',
    paddingVertical: 15,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
  },
  nextButton: {
    backgroundColor: '#2980B9',
    paddingVertical: 15,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Inder_400Regular',
  },
});

export default RegisterScreen;

