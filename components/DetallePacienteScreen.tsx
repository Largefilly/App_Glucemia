import React from 'react';
import { SafeAreaView, ScrollView, Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { RouteProp } from '@react-navigation/native';
type DetallePacienteRouteProp = RouteProp<RootStackParamList, 'DetallePaciente'>;
type RootStackParamList = {
  DoctorHome: undefined;
  DetallePaciente: { paciente: any };
};


const DetallePacienteScreen = ({ route }: { route: DetallePacienteRouteProp }) => {
  const { paciente } = route.params;
  const navigation = useNavigation();

  // Datos de ejemplo para el gráfico
  const chartData = {
    labels: ['6am', '9am', '12pm', '3pm', '6pm', '9pm'],
    datasets: [{
      data: [80, 120, 110, 150, 130, 95],
      color: (opacity = 1) => `rgba(69, 123, 157, ${opacity})`,
      strokeWidth: 2
    }]
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>← Volver</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image source={require('../assets/FotoPerfil.png')} style={styles.profileImage} />
          <Text style={styles.nombre}>{paciente.nombre}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Últimas Mediciones</Text>
          <LineChart
            data={chartData}
            width={screenWidth * 0.9}
            height={200}
            yAxisSuffix=" mg/dl"
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(29, 53, 87, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(29, 53, 87, ${opacity})`,
              style: { borderRadius: 16 },
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: '#1D3557'
              }
            }}
            bezier
            style={styles.chart}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Historial Completo</Text>
          <View style={styles.historialItem}>
            <Text style={styles.fecha}>25/06/2024</Text>
            <Text style={styles.medicion}>125 mg/dl</Text>
          </View>
          <View style={styles.historialItem}>
            <Text style={styles.fecha}>24/06/2024</Text>
            <Text style={styles.medicionAlerta}>180 mg/dl</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  backButton: {
    padding: 15,
    paddingTop: 25,
  },
  backText: {
    color: '#1D3557',
    fontSize: 16,
    fontFamily: 'Inder_400Regular',
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  nombre: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1D3557',
    fontFamily: 'Inder_400Regular',
  },
  section: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1D3557',
    marginBottom: 10,
    fontFamily: 'Inder_400Regular',
  },
  chart: {
    borderRadius: 10,
    paddingRight: 80,
  },
  historialItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    marginVertical: 5,
  },
  fecha: {
    color: '#6C757D',
    fontSize: 14,
  },
  medicion: {
    color: '#2E7D32',
    fontWeight: 'bold',
  },
  medicionAlerta: {
    color: '#E53945',
    fontWeight: 'bold',
  },
  
});

export default DetallePacienteScreen;