import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  PermissionsAndroid,
  Platform,
  Linking,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

const DefaultProfileImage = require('../assets/FotoPerfil.png');

import io from 'socket.io-client';
const socket = io(
  'https://glucollerbackv2-aagbhme4fee4cmed.brazilsouth-01.azurewebsites.net'
);

/**
 * Función auxiliar para obtener la imagen en base64 desde una URI.
 * Se utiliza fetch y FileReader para obtener un string en formato Data URL.
 */
const getBase64FromUri = async (uri: string): Promise<string> => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('Error al convertir blob a base64'));
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          resolve(result);
        } else {
          reject(new Error('El resultado no es una cadena'));
        }
      };
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error en getBase64FromUri:', error);
    throw error;
  }
};

const ReporteScreen = ({ navigation }: { navigation: any }) => {
  const [selectedTab, setSelectedTab] = useState('MedicionGlucosa');
  const [mediciones, setMediciones] = useState<any[]>([]); // Estado para almacenar las mediciones

  // Datos de ejemplo para las mediciones (con temporalidad en "tipo")
  const datosMediciones = [
    { hora: '08:00', valor: 120, tipo: 'Diaria' },
    { hora: '12:00', valor: 110, tipo: 'Diaria' },
    { hora: '18:00', valor: 130, tipo: 'Diaria' },
    { hora: '22:00', valor: 100, tipo: 'Diaria' },
  ];

  useEffect(() => {
    // Simular la carga de mediciones
    setMediciones(datosMediciones);
  }, []);

  // Función para generar el PDF usando expo-print y expo-sharing
  const generatePDF = async () => {
    try {
      // 1. Cargar el asset del logo
      const logoModule = require('../assets/onlylogo.png');
      const logoAsset = Asset.fromModule(logoModule);

      // 2. Obtener la imagen en base64
      let logoDataUrl = "";
      if (logoAsset.localUri && logoAsset.localUri.startsWith("file://")) {
        const logoBase64 = await FileSystem.readAsStringAsync(logoAsset.localUri, { encoding: FileSystem.EncodingType.Base64 });
        logoDataUrl = `data:image/png;base64,${logoBase64}`;
      } else {
        // Convertir la URI remota a base64 usando fetch
        logoDataUrl = await getBase64FromUri(logoAsset.uri);
      }

      // 3. Crear el contenido HTML del PDF
      const htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { border-bottom: 2px solid #1D3557; padding-bottom: 20px; margin-bottom: 20px; }
              .patient-info { display: flex; align-items: center; justify-content: space-between; }
              .patient-info img { width: 100px; }
              .patient-details { text-align: right; }
              .patient-details p { margin: 2px 0; font-size: 14px; }
              h1 { color: #1D3557; text-align: center; margin: 10px 0; }
              .table-container { margin-bottom: 30px; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #ccc; padding: 10px; text-align: center; }
              th { background-color: #f0faf8; }
              .footer { margin-top: 20px; font-size: 12px; text-align: center; color: #666; }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="patient-info">
                <div class="logo">
                  <img src="${logoDataUrl}" alt="Logo" />
                </div>
                <div class="patient-details">
                  <p><strong>Nombre:</strong> Juan Pérez</p>
                  <p><strong>Edad:</strong> 35</p>
                  <p><strong>Sexo:</strong> Masculino</p>
                </div>
              </div>
              <h1>Reporte de Medición de Glucosa</h1>
            </div>

            <div class="table-container">
              <h2>Datos de Mediciones</h2>
              <table>
                <tr>
                  <th>Hora</th>
                  <th>Valor (mg/dl)</th>
                  <th>Temporalidad</th>
                </tr>
                ${mediciones
                  .map(
                    (medicion) => `
                  <tr>
                    <td>${medicion.hora}</td>
                    <td>${medicion.valor}</td>
                    <td>${medicion.tipo}</td>
                  </tr>
                `
                  )
                  .join('')}
              </table>
            </div>

            <div class="footer">
              Reporte generado el ${new Date().toLocaleDateString()}
            </div>
          </body>
        </html>
      `;

      // 4. Generar el PDF
      const { uri } = await Print.printToFileAsync({ html: htmlContent });

      // 5. En Android, copiamos el PDF a FileSystem.documentDirectory y lo compartimos
      if (Platform.OS === 'android') {
        const newUri = FileSystem.documentDirectory + 'Reporte.pdf';
        await FileSystem.copyAsync({ from: uri, to: newUri });
        Alert.alert('Éxito', 'El PDF se ha guardado correctamente.');
        await Sharing.shareAsync(newUri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Compartir PDF',
        });
      } else {
        await Sharing.shareAsync(uri);
        Alert.alert('Éxito', 'El PDF se ha generado correctamente.');
      }
    } catch (error) {
      console.error(error);
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

const MedicionGlucosa = () => {
  const [glucoseLevel, setGlucoseLevel] = useState<string | null>('-');
  const [lastMeasurementTime, setLastMeasurementTime] = useState<string | null>(
    null
  );
  const [lastGlucoseLevel, setLastGlucoseLevel] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedGlucoseLevel = await AsyncStorage.getItem('lastGlucoseLevel');
        const storedMeasurementTime = await AsyncStorage.getItem(
          'lastMeasurementTime'
        );
        if (storedGlucoseLevel !== null && storedMeasurementTime !== null) {
          setGlucoseLevel(storedGlucoseLevel);
          setLastMeasurementTime(storedMeasurementTime);
        }
      } catch (error) {
        console.error('Error al cargar los datos persistentes:', error);
      }
    };

    loadData();

    socket.on('glucoseUpdate', (data) => {
      console.log(
        'Datos recibidos del socket:',
        JSON.stringify(data, null, 2)
      );
      const newGlucoseValue =
        data?.nivel_glucosa ?? data?.measurement?.nivel_glucosa;
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
  }, [lastGlucoseLevel]);

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
          <Text style={styles.legendText}>
            Hipoglucemia (&lt; 70 mg/dl)
          </Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#E53945' }]} />
          <Text style={styles.legendText}>
            Hiperglucemia (&gt; 140 mg/dl)
          </Text>
        </View>
      </View>
    </View>
  );
};

const RegistroReporte = () => {
  const [normalPrecautionPercentage, setNormalPrecautionPercentage] =
    useState(0);
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
          if (storedContacts !== null) {
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
              <Image source={DefaultProfileImage} style={styles.contactImage} />
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

const CustomCircle = ({ title, percentage, color }: { title: string; percentage: number; color: string; }) => (
  <View style={styles.chartItem}>
    <Text style={styles.chartTitle}>{title}</Text>
    <View style={[styles.circleContainer, { borderColor: color }]}>
      <Text style={styles.circleText}>{Math.round(percentage * 100)}%</Text>
    </View>
  </View>
);

const MeasurementCard = ({ title }: { title: string; }) => {
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
  contactImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E53945',
    marginRight: 10,
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