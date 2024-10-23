// components/ContactoScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ContactoScreen = ({ navigation }) => {

  // Lista de contactos de ejemplo
  const contactos: string[] = [
    'Elber Gatieza',
    'Mari Conazo',
    'Mars Turbo',
    'Paco Jerte',
    'Lucho Portuano',
  ];

  // Lista de grupos de ejemplo
  const grupos: string[] = [
    'Familia Fujimori',
    'Familia Kuczynski',
  ];

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#e53945" />
        </TouchableOpacity>
        <Text style={styles.title}>Contactos</Text>
        <TouchableOpacity onPress={() => console.log('Agregar nuevo contacto')} style={styles.addButton}>
          <FontAwesome name="plus" size={24} color="#e53945" />
        </TouchableOpacity>
      </View>

      {/* Barra de búsqueda */}
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar Contacto"
        placeholderTextColor="#999"
        textAlign="center" // Centra el texto en la barra
      />

      {/* Lista de contactos */}
      <ScrollView style={styles.contactList}>
        {contactos.map((contacto, index) => (
          <View key={index} style={styles.contactItem}>
            <Text style={styles.contactName}>{contacto}</Text>
            <View style={styles.line} />
          </View>
        ))}

        {/* Título Grupos */}
        <View style={styles.groupHeader}>
          <Text style={styles.groupTitle}>Grupos</Text>
          <TouchableOpacity onPress={() => console.log('Agregar nuevo grupo')} style={styles.addButton}>
            <FontAwesome name="plus" size={24} color="#e53945" />
          </TouchableOpacity>
        </View>

        {/* Lista de grupos */}
        {grupos.map((grupo, index) => (
          <View key={index} style={styles.contactItem}>
            <Text style={styles.contactName}>{grupo}</Text>
            <View style={styles.line} />
          </View>
        ))}
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    color: '#E53945',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    fontFamily: 'Inder', // Aplica la fuente Inder
    color: '#1D3557', // Cambia el color a #1D3557
  },
  addButton: {
    padding: 10,
  },
  searchBar: {
    height: 40,
    backgroundColor: '#A8DADB', // Cambia el fondo de la barra a #A8DADB
    borderColor: '#A8DADB', // Cambia el borde de la barra a #A8DADB
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    textAlign: 'center', // Centra el texto en la barra
    fontFamily: 'Inder', // Aplica la fuente Inder
    color: '#1D3557', // Cambia el color del texto a #1D3557
  },
  contactList: {
    flex: 1,
  },
  contactItem: {
    paddingVertical: 10,
  },
  contactName: {
    fontSize: 18,
    fontFamily: 'Inder', // Aplica la fuente Inder
    color: '#1D3557', // Cambia el color a #1D3557
  },
  line: {
    borderBottomColor: '#A8DADB', // Cambia el color de la línea a #A8DADB
    borderBottomWidth: 1,
    marginTop: 5,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  groupTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center', // Centra la palabra "Grupos"
    flex: 1, // Hace que el texto ocupe el espacio disponible para centrarlo
    fontFamily: 'Inder', // Aplica la fuente Inder
    color: '#1D3557', // Cambia el color a #1D3557
  },
});

export default ContactoScreen;
