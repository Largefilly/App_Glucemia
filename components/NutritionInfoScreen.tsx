import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const NutritionInfoScreen = ({ navigation }) => {
  const [selectedDisease, setSelectedDisease] = useState('diabetesTipo1'); // Estado para la enfermedad seleccionada

  // Consejos de nutrición por enfermedad
  const nutritionTips = {
    diabetesTipo1: (
      <>
        <Text style={styles.tipText}>1. Controla tu ingesta de carbohidratos y ajusta la dosis de insulina según sea necesario.</Text>
        <Text style={styles.tipText}>2. Consume alimentos ricos en fibra, como verduras, frutas y granos enteros.</Text>
        <Text style={styles.tipText}>3. Evita los alimentos procesados y altos en azúcares refinados.</Text>
        <Text style={styles.tipText}>4. Realiza comidas pequeñas y frecuentes para mantener estables los niveles de glucosa.</Text>
        <Text style={styles.tipText}>5. Consulta a un nutricionista para un plan personalizado.</Text>
      </>
    ),
    diabetesTipo2: (
      <>
        <Text style={styles.tipText}>1. Limita el consumo de carbohidratos simples y opta por carbohidratos complejos.</Text>
        <Text style={styles.tipText}>2. Incorpora proteínas magras en cada comida, como pollo, pescado o legumbres.</Text>
        <Text style={styles.tipText}>3. Reduce el consumo de grasas saturadas y evita las grasas trans.</Text>
        <Text style={styles.tipText}>4. Realiza actividad física regularmente para mejorar la sensibilidad a la insulina.</Text>
        <Text style={styles.tipText}>5. Mantén un peso saludable para controlar mejor la diabetes.</Text>
      </>
    ),
    prediabetes: (
      <>
        <Text style={styles.tipText}>1. Reduce el consumo de azúcares y carbohidratos refinados.</Text>
        <Text style={styles.tipText}>2. Aumenta la ingesta de fibra con verduras, frutas y granos enteros.</Text>
        <Text style={styles.tipText}>3. Realiza ejercicio físico al menos 30 minutos al día, 5 veces por semana.</Text>
        <Text style={styles.tipText}>4. Controla tu peso y evita el sobrepeso.</Text>
        <Text style={styles.tipText}>5. Consulta a un médico para un seguimiento regular.</Text>
      </>
    ),
  };

  return (
    <View style={styles.container}>
      {/* Flecha para retroceder */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <FontAwesome name="arrow-left" size={24} color="#F24162" /> {/* Cambia el color aquí */}
      </TouchableOpacity>

      {/* Título de la pantalla */}
      <Text style={styles.title}>Nutrición</Text>

      {/* Selector de enfermedades */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedDisease}
          onValueChange={(itemValue) => setSelectedDisease(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Diabetes Tipo 1" value="diabetesTipo1" />
          <Picker.Item label="Diabetes Tipo 2" value="diabetesTipo2" />
          <Picker.Item label="Prediabetes" value="prediabetes" />
        </Picker>
      </View>

      {/* Consejos de nutrición */}
      <ScrollView style={styles.tipsContainer}>
        {nutritionTips[selectedDisease]}
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
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 10,
    position: 'absolute',
    top: 33,
    left: 25,
    zIndex: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: -17,
    marginBottom: 30,
    color: '#1D3557',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
  },
  picker: {
    width: '100%',
  },
  tipsContainer: {
    flex: 1,
  },
  tipItem: {
    backgroundColor: '#f0faf8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  tipText: {
    fontSize: 16,
    color: '#1D3557',
  },
});

export default NutritionInfoScreen;
