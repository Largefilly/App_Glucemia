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
      
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <FontAwesome name="arrow-left" size={24} color="#E53945" />
        </TouchableOpacity>
        <Text style={styles.title}>Contactos</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddContact')} style={styles.addButton}>
          <FontAwesome name="plus" size={24} color="#E53945" />
        </TouchableOpacity>
      

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
          <TouchableOpacity onPress={() => console.log('Agregar nuevo grupo')} style={styles.addButtonGrupo}>
            <FontAwesome name="plus" size={24} color="#E53945" />
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
    top: 33,
    left: 25,
    zIndex: 3,
    fontFamily: 'Inder_400Regular', // Añadir la fuente
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    top: -16,
    marginBottom: 30,
    fontFamily: 'Inder_400Regular', // Añadir la fuente
    color: '#1D3557', // Cambiar el color
  },
  addButton: {
    padding: 10,
    fontFamily: 'Inder_400Regular', // Fuente personalizada
    color: '#1D3557',
    position: 'absolute', // Posiciona el botón de manera absoluta
    top: 36, // Distancia desde la parte superior
    right: 25, // Distancia desde la parte derecha
    zIndex: 10, // Asegura que el botón esté sobre otros elementos
},
  addButtonGrupo:{
    padding: 10,
    fontFamily: 'Inder_400Regular', // Añadir la fuente
    color: '#1D3557',
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
    fontFamily: 'Inder_400Regular', // Aplica la fuente Inder
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
    fontFamily: 'Inder_400Regular', // Aplica la fuente Inder
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
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center', // Centra la palabra "Grupos"
    flex: 1, // Hace que el texto ocupe el espacio disponible para centrarlo
    fontFamily: 'Inder_400Regular', // Aplica la fuente Inder
    color: '#1D3557', // Cambia el color a #1D3557
  },
});

export default ContactoScreen;
