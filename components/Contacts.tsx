import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ContactoScreen = ({ navigation }) => {
  // Estado inicial vacío para los contactos
  const [contactos, setContactos] = useState([]);


  // Función para agregar un contacto
  const agregarContacto = (nuevoContacto) => {
    setContactos((prevContactos) => [...prevContactos, nuevoContacto]);
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#E53945" />
        </TouchableOpacity>
        <Text style={styles.title}>Contactos</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddContact', { agregarContacto })} style={styles.addButton}>
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
              <Text style={styles.contactName}> {contacto.name}</Text>
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
    fontFamily: 'Inder_400Regular', // Añadir la fuente
    color: '#E53945',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    top: -20,
    right: -100,
    marginBottom: -25,
    fontFamily: 'Inder_400Regular', // Añadir la fuente
    color: '#1D3557', // Cambiar el color
  },
  addButton: {
    padding: 10,
    fontFamily: 'Inder_400Regular', // Fuente personalizada
    color: '#E53945',
    position: 'absolute', // Posiciona el botón de manera absoluta
    top: -22, // Distancia desde la parte superior
    right: 0, // Distancia desde la parte derecha
    zIndex: 10, // Asegura que el botón esté sobre otros elementos
  },
  addButtonGrupo: {
    padding: 10,
    fontFamily: 'Inder_400Regular', // Añadir la fuente
    color: '#E53945',
  },
  searchBar: {
    height: 40,
    backgroundColor: '#A8DADB', // Cambia el fondo de la barra a #A8DADB
    borderColor: '#A8DADB', // Cambia el borde de la barra a #A8DADB
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 50,
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
    fontWeight: 'bold',
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