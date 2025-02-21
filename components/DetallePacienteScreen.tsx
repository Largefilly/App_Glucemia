import React from 'react';
import { 
  SafeAreaView, 
  ScrollView, 
  Text, 
  StyleSheet, 
  View, 
  TouchableOpacity, 
  Image, 
  Dimensions 
} from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { FontAwesome } from '@expo/vector-icons';

// Define el tipo de la ruta
type RootStackParamList = {
  DoctorHome: undefined;
  DetallePaciente: { paciente: any };
};

type DetallePacienteRouteProp = RouteProp<RootStackParamList, 'DetallePaciente'>;

const DetallePacienteScreen = ({ route }: { route: DetallePacienteRouteProp }) => {
  const { paciente } = route.params;
  const navigation = useNavigation();
  
  const screenWidth = Dimensions.get('window').width;

  // HTML y JavaScript para renderizar el gráfico con Chart.js
  const chartHTML = `
    <html>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      </head>
      <body>
        <canvas id="myChart"></canvas>
        <script>
          var ctx = document.getElementById('myChart').getContext('2d');
          new Chart(ctx, {
            type: 'line',
            data: {
              labels: ['6am', '9am', '12pm', '3pm', '6pm', '9pm'],
              datasets: [{
                label: 'Glucosa en sangre',
                data: [80, 120, 110, 150, 130, 95],
                borderColor: 'rgba(69, 123, 157, 1)',
                borderWidth: 2,
                fill: false,
                tension: 0.4
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: { beginAtZero: false }
              }
            }
          });
        </script>
      </body>
    </html>
  `;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <FontAwesome name="arrow-left" size={24} color="#E53945" />
      </TouchableOpacity>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image source={require('../assets/FotoPerfil.png')} style={styles.profileImage} />
          <Text style={styles.nombre}>{paciente.nombre}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Últimas Mediciones</Text>
          <WebView 
            originWhitelist={['*']} 
            source={{ html: chartHTML }} 
            style={{ width: screenWidth * 0.9, height: 250 }}
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
    paddingTop: 40 // 🔹 Baja todo el contenido
  },

  scrollContainer: { 
    paddingHorizontal: 10, 
    paddingBottom: 30 
  },

  header: { 
    alignItems: 'center', 
    marginTop: 50 // 🔹 Mueve la imagen y el nombre más abajo
  },

  profileImage: { 
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    marginBottom: 15 
  },

  nombre: { 
    fontSize: 22, 
    fontWeight: '600', 
    color: '#1D3557', 
    fontFamily: 'Inder_400Regular' 
  },

  section: { 
    marginVertical: 20 // 🔹 Da más espacio entre secciones
  },

  sectionTitle: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: '#1D3557', 
    marginBottom: 10, 
    fontFamily: 'Inder_400Regular',
    textAlign: 'center', // 🔹 Centra el título de "Últimas Mediciones"
    marginTop: 10 // 🔹 Ajusta la separación con los elementos superiores
  },

  historialItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 15, 
    backgroundColor: '#F8F9FA',
    borderRadius: 10, 
    marginVertical: 5 
  },

  fecha: { 
    color: '#6C757D', 
    fontSize: 14 
  },

  medicion: { 
    color: '#2E7D32', 
    fontWeight: 'bold' 
  },

  medicionAlerta: { 
    color: '#E53945', 
    fontWeight: 'bold' 
  },

  backButton: { 
    padding: 10, 
    position: 'absolute', 
    top: 10,  // 🔹 Evita que quede muy pegado arriba
    left: 10 
  },
});

export default DetallePacienteScreen;
