import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';

const { width } = Dimensions.get('window');

const ReporteScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('MedicionGlucosa');

  return (
    <View style={styles.container}>
      {/* Flecha para regresar a la pantalla principal */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <FontAwesome name="arrow-left" size={24} color="#e53945" />
      </TouchableOpacity>

      {/* Título "Reporte" */}
      <Text style={styles.title}>Reportes</Text>

      {/* Pestañas de navegación */}
      <View style={styles.tabNavigation}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'MedicionGlucosa' && styles.tabButtonSelected]}
          onPress={() => setSelectedTab('MedicionGlucosa')}
        >
          <Text style={styles.tabButtonText}>Medición de glucosa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'RegistroReporte' && styles.tabButtonSelected]}
          onPress={() => setSelectedTab('RegistroReporte')}
        >
          <Text style={styles.tabButtonText}>Registro del reporte</Text>
        </TouchableOpacity>
      </View>

      {/* Contenido basado en la pestaña seleccionada */}
      {selectedTab === 'MedicionGlucosa' ? <MedicionGlucosa /> : <RegistroReporte />}
    </View>
  );
};

const generateRandomPercentages = () => {
  // Generar 4 números aleatorios
  const randomNumbers = [Math.random(), Math.random(), Math.random(), Math.random()];

  // Calcular la suma de los números aleatorios
  const total = randomNumbers.reduce((acc, val) => acc + val, 0);
  
  // Calcular los porcentajes
  const normal = (randomNumbers[0] / total) * 100;
  const precaucion = (randomNumbers[1] / total) * 100;
  const hipo = (randomNumbers[2] / total) * 100;
  const hiper = (randomNumbers[3] / total) * 100;

  return [
    normal.toFixed(2),
    precaucion.toFixed(2),
    hipo.toFixed(2),
    hiper.toFixed(2)
  ];
};

// Componente para "Medición de Glucosa"
const MedicionGlucosa = () => {
  const [glucoseLevel, setGlucoseLevel] = useState(0);

  useEffect(() => {
    // Generar un número aleatorio entre 70 y 200 para simular una medición de glucosa
    const randomGlucose = Math.floor(Math.random() * (200 - 70 + 1)) + 70;
    setGlucoseLevel(randomGlucose);
  }, []);

  // Función para obtener el color según el nivel de glucosa
  const getGlucoseColor = (level) => {
    if (level < 70) return '#6FB5E1'; // Hipoglucemia
    if (level >= 70 && level <= 110) return '#50E055'; // Normal
    if (level > 110 && level <= 140) return '#F0F05F'; // Precaución
    return '#E53945'; // Hiperglucemia
  };

  return (
    <View style={styles.glucoseContainer}>
      <Progress.Circle
        size={150}
        progress={glucoseLevel / 200} // Normalizar la medición para el progreso
        showsText={true}
        formatText={() => `${glucoseLevel} mg/dl`}
        color={getGlucoseColor(glucoseLevel)} // Usar el color basado en el nivel de glucosa
        unfilledColor="#1D3557"
        borderWidth={0}
        thickness={10}
      />
      <Text style={styles.lastMeasurementText}>
        Última medición de glucosa
      </Text>
      <Text style={styles.lastMeasurementText}>
       17/10/2024 | 22:00
      </Text>

      <Text style={styles.sectionTitle}>Mediciones anteriores</Text>

      {/* Gráficos de Mediciones Anteriores */}
      <View style={styles.previousMeasurements}>
        <MeasurementCard title="Semanal" />
        <MeasurementCard title="Mensual" />
        <MeasurementCard title="Trimestral" />
        <MeasurementCard title="Anual" />
      </View>
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

// Componente para las tarjetas de medición (Semanal, Mensual, Trimestral, Anual)
const MeasurementCard = ({ title }) => {
  const [normal, precaucion, hipo, hiper] = generateRandomPercentages();

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.cardChart}>
        <Text style={{ color: '#50E055', fontFamily: 'Inder'}}>{normal}%</Text>
        <Text style={{ color: '#F0F05F', fontFamily: 'Inder'}}>{precaucion}%</Text>
        <Text style={{ color: '#6FB5E1', fontFamily: 'Inder'}}>{hipo}%</Text>
        <Text style={{ color: '#E53945', fontFamily: 'Inder'}}>{hiper}%</Text>
      </View>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    fontFamily: 'Inder',
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
    fontFamily: 'Inder', // Añadir la fuente
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    top: -16,
    marginBottom: 30,
    fontFamily: 'Inder', // Añadir la fuente
    color: '#1D3557', // Cambiar el color
  },
  tabNavigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    fontFamily: 'Inder', // Añadir la fuente
  },
  tabButton: {
    padding: 10,
    marginHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    fontFamily: 'Inder', // Añadir la fuente
  },
  tabButtonSelected: {
    borderBottomColor: '#000',
    fontFamily: 'Inder', // Añadir la fuente
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1D3557',
    fontFamily: 'Inder', // Añadir la fuente
  },
  glucoseContainer: {
    fontFamily: 'Inder',
    alignItems: 'center',
    marginVertical: 10,
  },
  lastMeasurementText: {
    fontFamily: 'Inder',
    top: 10,
    marginTop: 5,
    color: '#1D3557',
  },
  sectionTitle: {
    fontFamily: 'Inder',
    top: 10,
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1D3557',
  },
  previousMeasurements: {
    fontFamily: 'Inder',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  card: {
    fontFamily: 'Inder',
    margin: 5,
    width: 80,
    height: 120,
    backgroundColor: '#f0faf8',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
  },
  cardTitle: {
    fontFamily: 'Inder',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1D3557',
    marginBottom: 10,
  },
  cardChart: {
    flex: 1,
    justifyContent: 'space-between',
  },
  chartContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  horizontalCharts: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
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
    fontSize: 18,
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
    fontSize: 18,
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
    marginBottom: 5,
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