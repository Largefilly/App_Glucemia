import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';

// Definir los tipos del Stack Navigator
type RootStackParamList = {
  AddContact: undefined;
};

type AddContactScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddContact'
>;

interface Props {
  navigation: AddContactScreenNavigationProp;
  route: any;
}

const AddContactScreen: React.FC<Props> = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [relationship, setRelationship] = useState('');
  const [description, setDescription] = useState('');

  const { agregarContacto } = route.params;

  // Oculta el header al cargar la pantalla
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // Validación del formulario
  const validateForm = () => {
    if (!name || !email || !relationship ) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return false;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Por favor ingresa un correo válido.');
      return false;
    }
    return true;
  };

  // Manejar el guardado de contacto
  const handleSave = () => {
    if (validateForm()) {
      const nuevoContacto = { name, email, relationship }; // Crear nuevo contacto

      agregarContacto(nuevoContacto); // Pasar el nuevo contacto a la función pasada por parámetros

      // Limpiar los campos
      setName('');
      setEmail('');
      setRelationship('');

      navigation.goBack(); // Volver a la pantalla anterior después de guardar
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Botón de retroceso y título */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#E53945" />
        </TouchableOpacity>
        <Text style={styles.title}>Agregar contacto</Text>

        {/* Formulario */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Icon name="account" size={24} color="#a8dadb" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#999"
            />
            {name ? (
              <TouchableOpacity onPress={() => setName('')}>
                <Icon name="close-circle" size={24} color="#999" style={styles.iconRight} />
              </TouchableOpacity>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <Icon name="email" size={24} color="#a8dadb" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Correo"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholderTextColor="#999"
            />
            {email ? (
              <TouchableOpacity onPress={() => setEmail('')}>
                <Icon name="close-circle" size={24} color="#999" style={styles.iconRight} />
              </TouchableOpacity>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <Icon name="account-group" size={24} color="#a8dadb" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Parentesco"
              value={relationship}
              onChangeText={setRelationship}
              placeholderTextColor="#999"
            />
            {relationship ? (
              <TouchableOpacity onPress={() => setRelationship('')}>
                <Icon name="close-circle" size={24} color="#999" style={styles.iconRight} />
              </TouchableOpacity>
            ) : null}
          </View>

        </View>

        {/* Botones en la parte inferior */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Estilos mejorados
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 22,
    zIndex: 3,
    fontFamily: 'Inder_400Regular',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    top: -22,
    marginBottom: 30,
    fontFamily: 'Inder_400Regular',
    color: '#1D3557',
  },
  formContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontFamily: 'Inder_400Regular',
  },
  iconRight: {
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#e53945',
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#457b9d',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Inder_400Regular',
  },
});

export default AddContactScreen;
