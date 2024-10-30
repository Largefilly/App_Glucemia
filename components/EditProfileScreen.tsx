import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons';

const EditProfileScreen = ({ navigation }) => {
  // Inicializar el estado con el nombre completo
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');

  // Separar el primer nombre y apellido
  const [firstName, lastName] = name.split(' ');

  const handleSubmit = () => {
    console.log('Perfil actualizado:', { name: `${firstName} ${lastName}`, nickname, email, phone, country, gender, address });
  };

  return (
    <View style={styles.container}>
      {/* Header sin fondo, con título y botón de retroceso movidos más abajo */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#e53945" />
        </TouchableOpacity>
        <Text style={styles.title}>Editar Perfil</Text>
      </View>

      {/* Formulario centrado */}
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.label}>Primer Nombre</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={(text) => setName(`${text} ${lastName}`)} // Actualiza solo el primer nombre
        />

        <Text style={styles.label}>Primer Apellido</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={(text) => setName(`${firstName} ${text}`)} // Actualiza solo el apellido
        />

        <Text style={styles.label}>Apodo</Text>
        <TextInput
          style={styles.input}
          value={nickname}
          onChangeText={setNickname}
        />

        <Text style={styles.label}>Correo</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Número Celular</Text>
        <View style={styles.phoneContainer}>
          <FontAwesome name="flag" size={24} color="black" />
          <TextInput
            style={styles.phoneInput}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Text style={styles.label}>País</Text>
            <Picker
              selectedValue={country}
              onValueChange={(itemValue) => setCountry(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Estados Unidos" value="Estados Unidos" />
              <Picker.Item label="México" value="México" />
              <Picker.Item label="Perú" value="Perú" />
            </Picker>
          </View>

          <View style={styles.halfWidth}>
            <Text style={styles.label}>Género</Text>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Femenino" value="Femenino" />
              <Picker.Item label="Masculino" value="Masculino" />
              <Picker.Item label="Otro" value="Otro" />
            </Picker>
          </View>
        </View>

        <Text style={styles.label}>Dirección</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />
      </ScrollView>

      {/* Botón de Guardar en la parte inferior */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>GUARDAR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'transparent',
    marginTop: 40,
    position: 'relative',
  },
  backButton: {
    padding: 10,
    position: 'absolute',
    top: -8,
    left: 25,
    zIndex: 3,
    fontFamily: 'Inder_400Regular', // Añadir la fuente
  },
  title: {
    top: -12,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1D3557',
    textAlign: 'center',
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    color: '#5e5e5e',
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#A8DADB',
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    color: '#1D3557',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A8DADB',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  phoneInput: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
    color: '#1D3557',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  halfWidth: {
    width: '48%',
  },
  picker: {
    backgroundColor: '#A8DADB',
    borderRadius: 10,
    height: 40,
  },
  submitButton: {
    backgroundColor: '#E53945',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
