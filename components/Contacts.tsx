import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const ContactoScreen = ({ navigation }) => {
  const [contactos, setContactos] = useState([]);

  // Función para cargar los contactos desde AsyncStorage
  const loadContacts = async () => {
    try {
      const storedContacts = await AsyncStorage.getItem('contacts');
      if (storedContacts !== null) {
        setContactos(JSON.parse(storedContacts));
      }
    } catch (error) {
      console.error('Error al cargar los contactos:', error);
    }
  };

  // Cada vez que la pantalla esté en foco, se recargan los contactos
  useFocusEffect(
    useCallback(() => {
      loadContacts();
    }, [])
  );

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#E53945" />
        </TouchableOpacity>
        <Text style={styles.title}>Contactos</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddContact')}
          style={styles.addButton}
        >
          <FontAwesome name="plus" size={24} color="#E53945" />
        </TouchableOpacity>
      </View>

      {/* Barra de búsqueda */}
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar Contacto"
        placeholderTextColor="#ffff"
        textAlign="center"
      />

      {/* Lista de contactos */}
      <ScrollView style={styles.contactList}>
        {contactos.length === 0 ? (
          <Text style={styles.noContactsText}>No tienes contactos guardados.</Text>
        ) : (
          contactos.map((contacto, index) => (
            <View key={index} style={styles.contactItem}>
              <Text style={styles.contactName}>{contacto.name}</Text>
              <Text style={styles.contactDetails}>Correo: {contacto.email}</Text>
              <Text style={styles.contactDetails}>Parentesco: {contacto.relationship}</Text>
              <View style={styles.line} />
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    position: 'absolute',
    top: -22,
    fontFamily: 'Inder_400Regular',
    color: '#E53945',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    top: -20,
    right: -100,
    marginBottom: -25,
    fontFamily: 'Inder_400Regular',
    color: '#1D3557',
  },
  addButton: {
    padding: 10,
    fontFamily: 'Inder_400Regular',
    color: '#E53945',
    position: 'absolute',
    top: -22,
    right: 0,
    zIndex: 10,
  },
  searchBar: {
    height: 40,
    backgroundColor: '#A8DADB',
    borderColor: '#A8DADB',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 50,
    textAlign: 'center',
    fontFamily: 'Inder_400Regular',
    color: '#1D3557',
  },
  contactList: {
    flex: 1,
  },
  contactItem: {
    paddingVertical: 10,
  },
  contactName: {
    fontSize: 18,
    fontFamily: 'Inder_400Regular',
    color: '#1D3557',
    fontWeight: 'bold',
  },
  line: {
    borderBottomColor: '#A8DADB',
    borderBottomWidth: 1,
    marginTop: 5,
  },
  noContactsText: {
    textAlign: 'center',
    color: '#1D3557',
    fontFamily: 'Inder_400Regular',
    marginVertical: 20,
  },
  contactDetails: {
    fontSize: 14,
    fontFamily: 'Inder_400Regular',
    color: '#1D3557',
  },
});

export default ContactoScreen;
