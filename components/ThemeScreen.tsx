import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ThemeScreen = ({ navigation }) => {
  const [selectedTheme, setSelectedTheme] = useState('Claro');

  const themes = ['Oscuro', 'Claro'];

  return (
    <View style={styles.container}>
      {/* Header sin fondo, con título y botón de retroceso */}
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#e53945" />
        </TouchableOpacity>
        <Text style={styles.title}>Tema</Text>
      </View>

      {/* Opciones de tema */}
      <ScrollView contentContainerStyle={styles.themeContainer}>
        {themes.map((theme) => (
          <TouchableOpacity
            key={theme}
            style={styles.themeOption}
            onPress={() => setSelectedTheme(theme)}
          >
            <Text
              style={[
                styles.themeText,
                selectedTheme === theme && styles.selectedThemeText,
              ]}
            >
              {theme}
            </Text>
            <View style={selectedTheme === theme ? styles.selectedCircle : styles.circle} />
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
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'transparent', 
    marginTop: 40, 
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D3557', 
    textAlign: 'center',
  },
  themeContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  themeOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 15,
  },
  themeText: {
    fontSize: 18,
    color: '#1D3557', 
  },
  selectedThemeText: {
    color: '#1D3557', 
    fontWeight: 'bold',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#A8DADB',
  },
  selectedCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#1D3557',
  },
});

export default ThemeScreen;
