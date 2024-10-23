// Components/RegisterScreen.tsx
import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, Button, StyleSheet, View, Alert, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';  // Importar Picker
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
      {/* Botón de regreso y título */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={24} color="#E53945" />
        </TouchableOpacity>
        <Text style={styles.title}>Registro</Text>
      </View>
      

      {/* Campos del formulario */}
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

       {/* Selector de tipo de enfermedad */}
       <View style={styles.pickerContainer}>
        <Picker
          selectedValue={form.enfermedad}
          onValueChange={(itemValue) => handleChange('enfermedad', itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Tipo de enfermedad *" value="" enabled={false} /> 
          <Picker.Item label="Tipo 1" value="Tipo 1" />
          <Picker.Item label="Tipo 2" value="Tipo 2" />
          <Picker.Item label="Prediabetes" value="Prediabetes" />
          <Picker.Item label="No tengo diabetes" value="No tengo diabetes" />
        </Picker>
      </View>
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
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center', // Alinear ícono de retroceso y título en el centro vertical
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 80,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1, // Esto asegura que el título se centre en el espacio disponible
    color: '#1D3557',
    fontFamily: 'Inder_400Regular', // Aplicar fuente Inder
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#F9F9F9',
    fontFamily: 'Inder', // Aplicar la fuente a los inputs
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  dateInput: {
    width: '30%',
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#F9F9F9',
  },
  picker: {
    height: 50,
    fontFamily: 'Inder', // Aplicar la fuente a Picker
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#E53945',
    paddingVertical: 15,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
  },
  nextButton: {
    backgroundColor: '#457B9D',
    paddingVertical: 15,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    //fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Inder', // Aplicar la fuente a los botones
  },
});

export default RegisterScreen;

