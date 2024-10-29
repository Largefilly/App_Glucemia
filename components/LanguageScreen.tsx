import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const LanguageScreen = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('Español (America Latina)');

  // Dividimos los idiomas en "Sugerencia" y "Otros"
  const suggestedLanguages = ['English (US)', 'Español (America Latina)'];
  const otherLanguages = [
    'Mandarin',
    'Hindi',
    'Español (España)',
    'Frances',
    'Arabic',
    'Russian',
    'Indonesia',
    'Vietnamese',
  ];

  return (
    <View style={styles.container}>
      {/* Header sin fondo, con título y botón de retroceso */}
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#e53945" />
        </TouchableOpacity>
        <Text style={styles.title}>Idioma</Text>
      </View>

      {/* Opciones de idioma */}
      <ScrollView contentContainerStyle={styles.languageContainer}>
        {/* Sección de sugerencias */}
        <Text style={styles.sectionHeader}>Sugerencia</Text>
        {suggestedLanguages.map((lang) => (
          <TouchableOpacity
            key={lang}
            style={styles.languageOption}
            onPress={() => setSelectedLanguage(lang)}
          >
            <Text style={[
              styles.languageText,
              selectedLanguage === lang && styles.selectedLanguageText
            ]}>
              {lang}
            </Text>
            <View style={selectedLanguage === lang ? styles.selectedCircle : styles.circle} />
          </TouchableOpacity>
        ))}

        {/* Línea divisoria entre "Sugerencia" y "Otros" */}
        <View style={styles.divider} />

        {/* Sección de otros idiomas */}
        <Text style={styles.sectionHeader}>Otros</Text>
        {otherLanguages.map((lang) => (
          <TouchableOpacity
            key={lang}
            style={styles.languageOption}
            onPress={() => setSelectedLanguage(lang)}
          >
            <Text style={[
              styles.languageText,
              selectedLanguage === lang && styles.selectedLanguageText
            ]}>
              {lang}
            </Text>
            <View style={selectedLanguage === lang ? styles.selectedCircle : styles.circle} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centra el título
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'transparent', // Sin fondo
    marginTop: 40, // Mueve el encabezado más abajo
    position: 'relative', // Permite posicionar el botón de retroceso
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
  languageContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D3557',
    marginBottom: 10,
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 10, // Espacio entre opciones
  },
  languageText: {
    fontSize: 18,
    color: '#1D3557', // Azul Oscuro para los idiomas no seleccionados
  },
  selectedLanguageText: {
    color: '#e53945', // Rojo para el texto seleccionado
    fontWeight: 'bold',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  selectedCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#e53945', // Rojo para el indicador de selección
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 20,
  },
});

export default LanguageScreen;
