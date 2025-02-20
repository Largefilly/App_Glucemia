import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
import io from 'socket.io-client';

const socket = io(
  'https://glucollerbackv2-aagbhme4fee4cmed.brazilsouth-01.azurewebsites.net'
);

interface Medicion {
  hora: string;
  valor: number;
  tipo: string;
}

/**
 * Solicita permisos de almacenamiento en Android, con un timeout de 5 segundos.
 */
const requestStoragePermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') return true;
  return new Promise<boolean>((resolve) => {
    const timer = setTimeout(() => {
      console.log('requestStoragePermission: Timeout, asumiendo permiso.');
      resolve(true);
    }, 1000);

    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Permiso de almacenamiento',
        message:
          'La aplicación necesita acceso al almacenamiento para guardar el PDF.',
        buttonNeutral: 'Preguntar después',
        buttonNegative: 'Cancelar',
        buttonPositive: 'Aceptar',
      }
    )
      .then((result) => {
        clearTimeout(timer);
        console.log('requestStoragePermission: Resultado:', result);
        resolve(result === PermissionsAndroid.RESULTS.GRANTED);
      })
      .catch((err) => {
        clearTimeout(timer);
        console.warn('requestStoragePermission: Error:', err);
        resolve(false);
      });
  });
};

const ReporteScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('MedicionGlucosa');
  const [mediciones, setMediciones] = useState<Medicion[]>([]);

  const datosMediciones: Medicion[] = [
    { hora: '08:00', valor: 120, tipo: 'Diaria' },
    { hora: '12:00', valor: 110, tipo: 'Diaria' },
    { hora: '18:00', valor: 130, tipo: 'Diaria' },
    { hora: '22:00', valor: 100, tipo: 'Diaria' },
  ];

  useEffect(() => {
    setMediciones(datosMediciones);
  }, []);

  const generatePDF = async () => {
    console.log('generatePDF: Inicio');
    try {
      const hasPermission = await requestStoragePermission();
      console.log('generatePDF: Permiso:', hasPermission);
  
      // Generamos la fecha/hora de forma dinámica
      const now = new Date();
      const dateString = now.toLocaleDateString();   // p.ej. 16/02/2025
      const timeString = now.toLocaleTimeString();   // p.ej. 1:02:13 p. m.
      const fullDateTime = `${dateString}, ${timeString}`;
  
      // Construimos las filas de la tabla a partir de mediciones
      const rowsHtml = mediciones.map((med) => `
        <tr>
          <td>${med.hora}</td>
          <td>${med.valor}</td>
          <td>${med.tipo}</td>
        </tr>
      `).join('');
  
      // Adaptamos tu HTML con estilos, cabecera, tabla y gráfico
      const htmlContent = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8" />
          <title>Reporte de Medición de Glucosa</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            /* 1. Header: Logo a la izquierda y datos del paciente a la derecha */
            .header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              border-bottom: 2px solid #1D3557;
              padding-bottom: 20px;
              margin-bottom: 20px;
            }
            .logo {
              width: 100px;
            }
            .patient-details {
              text-align: right;
            }
            .patient-details p {
              margin: 2px 0;
              font-size: 14px;
            }
            /* 2. Título: Título principal y fecha/hora */
            .title-section {
              text-align: center;
              margin-bottom: 20px;
            }
            .title-section h1 {
              color: #1D3557;
              margin: 0;
            }
            .title-section p {
              margin: 5px 0 0;
              font-size: 14px;
              color: #666;
            }
            /* 3. Contenido: Tabla y gráfico */
            .content {
              margin-bottom: 20px;
            }
            .table-container {
              margin-bottom: 30px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #ccc;
              padding: 10px;
              text-align: center;
            }
            th {
              background-color: #f0faf8;
            }
            .chart-container {
              text-align: center;
              margin-bottom: 30px;
            }
            .footer {
              margin-top: 20px;
              font-size: 12px;
              text-align: center;
              color: #666;
            }
          </style>
        </head>
        <body>
          <!-- 1. Header -->
          <div class="header">
            <!-- Logo a la izquierda -->
            <img 
              src="https://github.com/Largefilly/App_Glucemia/blob/master/assets/logoGlucoller.png?raw=true" 
              alt="Logo" 
              class="logo"
            />
            <!-- Datos del paciente a la derecha -->
            <div class="patient-details">
              <p><strong>Nombre:</strong> Juan Pérez</p>
              <p><strong>Edad:</strong> 35</p>
              <p><strong>Sexo:</strong> Masculino</p>
            </div>
          </div>
  
          <!-- 2. Título -->
          <div class="title-section">
            <h1>Reporte de Medición de Glucosa</h1>
            <!-- Aquí usamos la fecha/hora dinámica -->
            <p>Generado el ${fullDateTime}</p>
          </div>
  
          <!-- 3. Contenido -->
          <div class="content">
            <!-- Tabla con los datos de las mediciones -->
            <div class="table-container">
              <h2>Datos de Mediciones</h2>
              <table>
                <tr>
                  <th>Hora</th>
                  <th>Valor (mg/dl)</th>
                  <th>Temporalidad</th>
                </tr>
                ${rowsHtml}
              </table>
            </div>
  
            <!-- Gráfico estadístico con cuadrícula y ejes (estático) -->
            <div class="chart-container">
              <h2>Gráfico de Mediciones</h2>
              <svg width="400" height="300" style="margin: 0 auto; display: block;">
                <!-- Ejes -->
                <line x1="50" y1="250" x2="380" y2="250" stroke="black" stroke-width="2"/>  <!-- Eje X -->
                <line x1="50" y1="250" x2="50" y2="50" stroke="black" stroke-width="2"/>     <!-- Eje Y -->
  
                <!-- Cuadrícula y etiquetas del eje Y (0 a 200 en intervalos de 50) -->
                <g font-size="10" fill="black">
                  <line x1="50" y1="250" x2="380" y2="250" stroke="#ddd" stroke-dasharray="2,2"/>
                  <text x="40" y="254" text-anchor="end">0</text>
  
                  <line x1="50" y1="200" x2="380" y2="200" stroke="#ddd" stroke-dasharray="2,2"/>
                  <text x="40" y="204" text-anchor="end">50</text>
  
                  <line x1="50" y1="150" x2="380" y2="150" stroke="#ddd" stroke-dasharray="2,2"/>
                  <text x="40" y="154" text-anchor="end">100</text>
  
                  <line x1="50" y1="100" x2="380" y2="100" stroke="#ddd" stroke-dasharray="2,2"/>
                  <text x="40" y="104" text-anchor="end">150</text>
  
                  <line x1="50" y1="50" x2="380" y2="50" stroke="#ddd" stroke-dasharray="2,2"/>
                  <text x="40" y="54" text-anchor="end">200</text>
                </g>
  
                <!-- Etiquetas del eje X -->
                <g font-size="10" fill="black">
                  <text x="50" y="265" text-anchor="middle">08:00</text>
                  <text x="160" y="265" text-anchor="middle">12:00</text>
                  <text x="270" y="265" text-anchor="middle">18:00</text>
                  <text x="380" y="265" text-anchor="middle">22:00</text>
                </g>
  
                <!-- Línea de datos (polyline) -->
                <!-- Usamos la fórmula: y = 250 - valor -->
                <polyline fill="none" stroke="#E53945" stroke-width="2"
                  points="50,130 160,140 270,120 380,150" 
                />
  
                <!-- Puntos de datos -->
                <circle cx="50" cy="130" r="4" fill="#E53945" />
                <circle cx="160" cy="140" r="4" fill="#E53945" />
                <circle cx="270" cy="120" r="4" fill="#E53945" />
                <circle cx="380" cy="150" r="4" fill="#E53945" />
              </svg>
            </div>
          </div>
  
          <!-- Footer -->
          <div class="footer">
            Reporte generado el ${dateString} a las ${timeString}.
          </div>
        </body>
        </html>
      `;
  
      // Generamos el PDF usando expo-print
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      console.log('generatePDF: PDF generado, filePath:', uri);
  
      // Compartimos el PDF usando expo-sharing
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Compartir PDF',
      });
      Alert.alert('Éxito', 'El PDF se ha generado y compartido correctamente.');
    } catch (error) {
      console.error('generatePDF: Error', error);
      Alert.alert('Error', 'No se pudo generar el PDF');
    }
  };  

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <FontAwesome name="arrow-left" size={24} color="#e53945" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.downloadButton} onPress={generatePDF}>
        <FontAwesome name="download" size={30} color="#e53945" />
      </TouchableOpacity>
      <Text style={styles.title}>Reportes</Text>
      <View style={styles.tabNavigation}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'MedicionGlucosa' && styles.tabButtonSelected,
          ]}
          onPress={() => setSelectedTab('MedicionGlucosa')}
        >
          <Text style={styles.tabButtonText}>Medición de glucosa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'RegistroReporte' && styles.tabButtonSelected,
          ]}
          onPress={() => setSelectedTab('RegistroReporte')}
        >
          <Text style={styles.tabButtonText}>Registro del reporte</Text>
        </TouchableOpacity>
      </View>
      {selectedTab === 'MedicionGlucosa' ? (
        <MedicionGlucosa />
      ) : (
        <RegistroReporte />
      )}
    </View>
  );
};

const MedicionGlucosa: React.FC = () => {
  const [glucoseLevel, setGlucoseLevel] = useState<string | null>('-');
  const [lastMeasurementTime, setLastMeasurementTime] = useState<string | null>(null);
  const [lastGlucoseLevel, setLastGlucoseLevel] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedGlucoseLevel = await AsyncStorage.getItem('lastGlucoseLevel');
        const storedMeasurementTime = await AsyncStorage.getItem('lastMeasurementTime');
        if (storedGlucoseLevel && storedMeasurementTime) {
          setGlucoseLevel(storedGlucoseLevel);
          setLastMeasurementTime(storedMeasurementTime);
        }
      } catch (error) {
        console.error('Error al cargar los datos persistentes:', error);
      }
    };
    loadData();

    socket.on('glucoseUpdate', (data) => {
      console.log('Datos recibidos del socket:', JSON.stringify(data, null, 2));
      const newGlucoseValue = data?.nivel_glucosa ?? data?.measurement?.nivel_glucosa;
      if (typeof newGlucoseValue === 'number') {
        const newGlucoseLevel = newGlucoseValue.toString();
        setGlucoseLevel(newGlucoseLevel);
        const currentTime = new Date().toLocaleString();
        setLastMeasurementTime(currentTime);
        if (newGlucoseValue !== lastGlucoseLevel) {
          setLastGlucoseLevel(newGlucoseValue);
        }
        AsyncStorage.setItem('lastGlucoseLevel', newGlucoseLevel);
        AsyncStorage.setItem('lastMeasurementTime', currentTime);
      } else {
        console.error('El valor de glucosa recibido no es válido:', data);
      }
    });
    return () => {
      socket.off('glucoseUpdate');
    };
  }, []);

  const getGlucoseColor = (level: string) => {
    const numericLevel = Number(level);
    if (numericLevel < 70) return '#6FB5E1';
    if (numericLevel >= 70 && numericLevel <= 110) return '#50E055';
    if (numericLevel > 110 && numericLevel <= 140) return '#F0F05F';
    return '#E53945';
  };

  return (
    <View style={styles.glucoseContainer}>
      <View
        style={[
          styles.circleContainer,
          { borderColor: getGlucoseColor(glucoseLevel || '0') },
        ]}
      >
        <Text style={styles.circleText}>{glucoseLevel}</Text>
        <Text style={styles.unitText}>mg/dl</Text>
      </View>
      <Text style={styles.lastMeasurementText}>
        Última medición: {lastMeasurementTime || 'No disponible'}
      </Text>
      <Text style={styles.sectionTitle}>Mediciones anteriores</Text>
      <View style={styles.previousMeasurements}>
        <MeasurementCard title="Semanal" />
        <MeasurementCard title="Mensual" />
        <MeasurementCard title="Trimestral" />
        <MeasurementCard title="Anual" />
      </View>
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#50E055' }]} />
          <Text style={styles.legendText}>Normal (70 - 110 mg/dl)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#F0F05F' }]} />
          <Text style={styles.legendText}>Precaución (111 - 140 mg/dl)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#6FB5E1' }]} />
          <Text style={styles.legendText}>Hipoglucemia (&lt; 70 mg/dl)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#E53945' }]} />
          <Text style={styles.legendText}>Hiperglucemia (&gt; 140 mg/dl)</Text>
        </View>
      </View>
    </View>
  );
};

const RegistroReporte: React.FC = () => {
  const [normalPrecautionPercentage, setNormalPrecautionPercentage] = useState(0);
  const [hyperglycemiaPercentage, setHyperglycemiaPercentage] = useState(0);
  const [hypoglycemiaPercentage, setHypoglycemiaPercentage] = useState(0);
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    const normalPrecaution = Math.floor(Math.random() * 100);
    const hyperglycemia = Math.floor(Math.random() * (100 - normalPrecaution));
    const hypoglycemia = 100 - normalPrecaution - hyperglycemia;
    setNormalPrecautionPercentage(normalPrecaution);
    setHyperglycemiaPercentage(hyperglycemia);
    setHypoglycemiaPercentage(hypoglycemia);
  }, []);

  useFocusEffect(
    useCallback(() => {
      const loadContacts = async () => {
        try {
          const storedContacts = await AsyncStorage.getItem('contacts');
          if (storedContacts) {
            setContacts(JSON.parse(storedContacts));
          }
        } catch (error) {
          console.error('Error al cargar los contactos:', error);
        }
      };
      loadContacts();
    }, [])
  );

  const glucoseLevels = [70, 50, 90, 120, 80, 40, 120, 55, 75, 100, 85, 95, 65, 30];
  const histogramData = glucoseLevels.map((level) => {
    if (level < 70) return '#6FB5E1';
    if (level >= 70 && level <= 90) return '#50E055';
    if (level > 110) return '#E53945';
    return '#F0F05F';
  });

  return (
    <View style={styles.chartContainer}>
      <View style={styles.horizontalCharts}>
        <CustomCircle
          title={'Normal y \n Precaución'}
          percentage={normalPrecautionPercentage / 100}
          color="#50E055"
        />
        <CustomCircle
          title={'\nHiperglucemia'}
          percentage={hyperglycemiaPercentage / 100}
          color="#E53945"
        />
        <CustomCircle
          title={'\nHipoglucemia'}
          percentage={hypoglycemiaPercentage / 100}
          color="#6FB5E1"
        />
      </View>
      <Text style={styles.analysisTitle}>Análisis del Reporte</Text>
      <View style={styles.line} />
      <View style={styles.histogramContainer}>
        {glucoseLevels.map((level, index) => (
          <View
            key={index}
            style={[
              styles.bar,
              { height: (level / 120) * 100, backgroundColor: histogramData[index] },
            ]}
          />
        ))}
      </View>
      <View style={styles.daysContainer}>
        {['L', 'M', 'M', 'J', 'V', 'S', 'D', 'L', 'M', 'M', 'J', 'V', 'S', 'D'].map(
          (day, index) => (
            <Text key={index} style={styles.dayText}>
              {day}
            </Text>
          )
        )}
      </View>
      <Text style={styles.contactsTitle}>Contactos Notificados</Text>
      <View style={styles.line} />
      <ScrollView style={styles.contactsScrollView}>
        {contacts && contacts.length > 0 ? (
          contacts.map((contact, index) => (
            <View style={styles.contactsContainer} key={index}>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactDate}>{contact.date}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noContactsText}>No hay contactos notificados</Text>
        )}
      </ScrollView>
    </View>
  );
};

const CustomCircle: React.FC<{ title: string; percentage: number; color: string }> = ({ title, percentage, color }) => (
  <View style={styles.chartItem}>
    <Text style={styles.chartTitle}>{title}</Text>
    <View style={[styles.circleContainer, { borderColor: color }]}>
      <Text style={styles.circleText}>{Math.round(percentage * 100)}%</Text>
    </View>
  </View>
);

const MeasurementCard: React.FC<{ title: string }> = ({ title }) => {
  const [normal, precaucion, hipo, hiper] = generateRandomPercentages();
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.cardChart}>
        <Text style={{ color: '#50E055' }}>{normal}%</Text>
        <Text style={{ color: '#F0F05F' }}>{precaucion}%</Text>
        <Text style={{ color: '#6FB5E1' }}>{hipo}%</Text>
        <Text style={{ color: '#E53945' }}>{hiper}%</Text>
      </View>
    </View>
  );
};

const generateRandomPercentages = (): number[] => {
  const randomNumbers = [Math.random(), Math.random(), Math.random(), Math.random()];
  const total = randomNumbers.reduce((acc, val) => acc + val, 0);
  const normal = parseFloat(((randomNumbers[0] / total) * 100).toFixed(2));
  const precaucion = parseFloat(((randomNumbers[1] / total) * 100).toFixed(2));
  const hipo = parseFloat(((randomNumbers[2] / total) * 100).toFixed(2));
  const hiper = parseFloat((100 - normal - precaucion - hipo).toFixed(2));
  return [normal, precaucion, hipo, hiper];
};

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
    color: '#1D3557',
  },
  glucoseContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  circleContainer: {
    width: 110,
    height: 110,
    borderRadius: 75,
    borderWidth: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  circleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1D3557',
  },
  unitText: {
    fontSize: 16,
    color: '#1D3557',
  },
  lastMeasurementText: {
    marginTop: 5,
    color: '#1D3557',
  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1D3557',
  },
  previousMeasurements: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  card: {
    margin: 5,
    width: 80,
    height: 120,
    backgroundColor: '#f0faf8',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
  },
  cardTitle: {
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
    color: '#1D3557',
  },
  analysisTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#1D3557',
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
    color: '#1D3557',
  },
  contactsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#1D3557',
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
  contactName: {
    fontSize: 16,
    flex: 1,
    color: '#1D3557',
  },
  contactDate: {
    fontSize: 12,
    color: '#1D3557',
  },
  legendContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 15,
    marginVertical: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  legendText: {
    fontSize: 14,
    color: '#1D3557',
  },
  downloadButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noContactsText: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
  contactsScrollView: {
    maxHeight: 200,
    width: '100%',
  },
});

export default ReporteScreen;