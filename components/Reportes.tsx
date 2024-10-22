import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import GestureRecognizer from 'react-native-swipe-gestures';

const { width } = Dimensions.get('window');

const ReporteScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('MedicionGlucosa');

  // Manejar el deslizamiento a la izquierda y derecha
  const handleSwipeLeft = () => {
    if (selectedTab === 'MedicionGlucosa') {
      setSelectedTab('RegistroReporte');
    }
  };

  const handleSwipeRight = () => {
    if (selectedTab === 'RegistroReporte') {
      setSelectedTab('MedicionGlucosa');
    }
  };

  return (
    <GestureRecognizer
      onSwipeLeft={handleSwipeLeft}
      onSwipeRight={handleSwipeRight}
      style={styles.container}
    >
      {/* Flecha para regresar a la pantalla principal */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <FontAwesome name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      {/* Título "Reporte" */}
      <Text style={styles.title}>Reporte</Text>

      {/* Pestañas de navegación */}
      <View style={styles.tabNavigation}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'MedicionGlucosa' && styles.tabButtonSelected]}
          onPress={() => setSelectedTab('MedicionGlucosa')}
        >
          <Text style={styles.tabButtonText}>Medición de Glucosa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'RegistroReporte' && styles.tabButtonSelected]}
          onPress={() => setSelectedTab('RegistroReporte')}
        >
          <Text style={styles.tabButtonText}>Registro del Reporte</Text>
        </TouchableOpacity>
      </View>

      {/* Contenido basado en la pestaña seleccionada */}
      {selectedTab === 'MedicionGlucosa' ? <MedicionGlucosa /> : <RegistroReporte />}
    </GestureRecognizer>
  );
};

// Componente para "Medición de Glucosa"
const MedicionGlucosa = () => {
  const randomNumber = Math.floor(Math.random() * 100);
  return (
    <View style={styles.tabContainer}>
      <Text style={styles.tabText}>Medición de Glucosa: {randomNumber}</Text>
    </View>
  );
};

// Componente para "Registro del Reporte"
const RegistroReporte = () => {
  const [normalPrecautionPercentage, setNormalPrecautionPercentage] = useState(0);
  const [hyperglycemiaPercentage, setHyperglycemiaPercentage] = useState(0);
  const [hypoglycemiaPercentage, setHypoglycemiaPercentage] = useState(0);

  useEffect(() => {
    // Simulación de datos aleatorios para cada categoría
    setNormalPrecautionPercentage(Math.random());
    setHyperglycemiaPercentage(Math.random());
    setHypoglycemiaPercentage(Math.random());
  }, []);

  // Datos para el histograma de dos semanas
  const glucoseLevels = [70, 50, 90, 120, 80, 40, 120, 55, 75, 100, 85, 95, 65, 30]; // Ejemplo de niveles de glucosa
  const histogramData = glucoseLevels.map(level => {
    if (level < 70) return '#6FB5E1'; // Hipoglucemia
    if (level >= 70 && level <= 90) return '#50E055'; // Normal
    if (level > 110) return '#E53945'; // Hiperglucemia
    return '#F0F05F'; // Precaución
  });

  return (
    <View style={styles.chartContainer}>
      {/* Gráfico Normal y Precaución, Hiperglucemia y Hipoglucemia en fila */}
      <View style={styles.horizontalCharts}>
        <View style={styles.chartItem}>
          <Text style={styles.chartTitle}>Normal y{"\n"}Precaución</Text>
          <Progress.Circle
            size={100}
            progress={normalPrecautionPercentage}
            showsText={true}
            formatText={() => `${Math.round(normalPrecautionPercentage * 100)}%`}
            color="#50E055"
            unfilledColor="#F0F05F"
            borderWidth={0}
          />
        </View>

        <View style={styles.chartItem}>
          <Text style={styles.chartTitle}>Hiperglucemia{"\n"}</Text>
          <Progress.Circle
            size={100}
            progress={hyperglycemiaPercentage}
            showsText={true}
            formatText={() => `${Math.round(hyperglycemiaPercentage * 100)}%`}
            color="#E53945"
            unfilledColor="#1D3557"
            borderWidth={0}
          />
        </View>

        <View style={styles.chartItem}>
          <Text style={styles.chartTitle}>Hipoglucemia{"\n"}</Text>
          <Progress.Circle
            size={100}
            progress={hypoglycemiaPercentage}
            showsText={true}
            formatText={() => `${Math.round(hypoglycemiaPercentage * 100)}%`}
            color="#6FB5E1"
            unfilledColor="#1D3557"
            borderWidth={0}
          />
        </View>
      </View>

      {/* Análisis del Reporte */}
      <Text style={styles.analysisTitle}>Análisis del Reporte</Text>
      <View style={styles.line} />
      <View style={styles.histogramContainer}>
        {glucoseLevels.map((level, index) => (
          <View
            key={index}
            style={[styles.bar, { height: (level / 120) * 100, backgroundColor: histogramData[index] }]} // Ajustar altura máxima aquí
          />
        ))}
      </View>
      <View style={styles.daysContainer}>
        {['L', 'M', 'M', 'J', 'V', 'S', 'D', 'L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, index) => (
          <Text key={index} style={styles.dayText}>{day}</Text>
        ))}
      </View>

      {/* Sección "Contactos Notificados" */}
      <Text style={styles.contactsTitle}>Contactos Notificados</Text>
      <View style={styles.line} />
      <View style={styles.contactsContainer}>
        <View style={styles.contactCircle} />
        <Text style={styles.contactName}>Elber Gatieza</Text>
        <Text style={styles.contactDate}>17/10 | 20:00</Text>
      </View>
      <View style={styles.contactsContainer}>
        <View style={styles.contactCircle} />
        <Text style={styles.contactName}>Mari Conazo</Text>
        <Text style={styles.contactDate}>17/10 | 20:30</Text>
      </View>
      <View style={styles.contactsContainer}>
        <View style={styles.contactCircle} />
        <Text style={styles.contactName}>Mars Turbo</Text>
        <Text style={styles.contactDate}>17/10 | 21:00</Text>
      </View>
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
  backButton: {
    padding: 10,
    position: 'absolute',
    top: 60,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Inder', // Añadir la fuente
    color: '#1D3557', // Cambiar el color
  },
  tabNavigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tabButton: {
    padding: 10,
    marginHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabButtonSelected: {
    borderBottomColor: '#000',
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Inder', // Añadir la fuente
    color: '#1D3557', // Cambiar el color
  },
  tabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  tabText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Inder', // Añadir la fuente
    color: '#1D3557', // Cambiar el color
  },
  chartContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  horizontalCharts: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Para espacio igual entre los gráficos
    width: '100%',
    marginBottom: 20,
  },
  chartItem: {
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'center',
    fontFamily: 'Inder', // Añadir la fuente
    color: '#1D3557', // Cambiar el color
  },
  analysisTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    fontFamily: 'Inder', // Añadir la fuente
    color: '#1D3557', // Cambiar el color
  },
  histogramContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 100,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  bar: {
    width: 20,
    marginHorizontal: 2,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  dayText: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Inder', // Añadir la fuente
    color: '#1D3557', // Cambiar el color
  },
  contactsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    fontFamily: 'Inder', // Añadir la fuente
    color: '#1D3557', // Cambiar el color
  },
  line: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  contactsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E53945',
    marginRight: 10,
  },
  contactName: {
    fontSize: 16,
    flex: 1,
    fontFamily: 'Inder', // Añadir la fuente
    color: '#1D3557', // Cambiar el color
  },
  contactDate: {
    fontSize: 12,
    fontFamily: 'Inder', // Añadir la fuente
    color: '#1D3557', // Cambiar el color
  },
});

export default ReporteScreen;