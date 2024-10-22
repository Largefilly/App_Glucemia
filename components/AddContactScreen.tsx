import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';

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
}

const AddContactScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [relationship, setRelationship] = useState('');
  const [description, setDescription] = useState('');

  // Eliminar el header al cargar la pantalla
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const validateForm = () => {
    if (!name || !email || !relationship || !description) {
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

  const handleSave = () => {
    if (validateForm()) {
      Alert.alert('Contacto guardado', `Nombre: ${name}, Correo: ${email}`);
      setName('');
      setEmail('');
      setRelationship('');
      setDescription('');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {/* Contenedor para el título y el botón de retroceso */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Agregar contacto</Text>
      </View>

      {/* Contenedor que centra el formulario */}
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

        <View style={styles.inputContainer}>
          <Icon name="pencil" size={24} color="#a8dadb" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Descripción"
            value={description}
            onChangeText={setDescription}
            placeholderTextColor="#999"
          />
          {description ? (
            <TouchableOpacity onPress={() => setDescription('')}>
              <Icon name="close-circle" size={24} color="#999" style={styles.iconRight} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Colocamos los botones en la parte inferior */}
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center', // Alinear ícono de retroceso y título en el centro vertical
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1, // Esto asegura que el título se centre en el espacio disponible
    color: '#000',
    fontFamily: 'Inder_400Regular', // Aplicar fuente Inder
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
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
    fontFamily: 'Inder_400Regular', // Aplicar fuente Inder
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
    fontFamily: 'Inder_400Regular', // Aplicar fuente Inder
  },
});

export default AddContactScreen;