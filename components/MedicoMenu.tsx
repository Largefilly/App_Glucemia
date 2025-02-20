import React from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

const pacientes = [
  { 
    id: '1', 
    nombre: 'María González', 
    ultimaMedicion: '125 mg/dl', 
    hora: '08:30 AM',
    foto: require('../assets/FotoPerfil.png'),
    estado: 'normal'
  },
  { 
    id: '2', 
    nombre: 'Carlos Rodríguez', 
    ultimaMedicion: '180 mg/dl', 
    hora: '10:45 AM',
    foto: require('../assets/FotoPerfil.png'),
    estado: 'alerta'
  },
];

// Actualiza el tipado para que coincida con la configuración en App.js:
type RootStackParamList = {
  DoctorMain: undefined;           // Nombre usado en App.js para la pantalla principal del doctor
  DetallePaciente: { paciente: any };
};

const Stack = createStackNavigator<RootStackParamList>();

const DoctorHomeScreen = () => {
  // Usamos "DoctorMain" en la tipificación
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'DoctorMain'>>();

  const renderPaciente = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={[
        styles.pacienteCard,
        item.estado === 'alerta' && styles.cardAlerta
      ]}
      onPress={() => navigation.navigate('DetallePaciente', { paciente: item })}
    >
      <Image source={item.foto} style={styles.profileImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <View style={styles.datosContainer}>
          <Text style={styles.medicion}>{item.ultimaMedicion}</Text>
          <Text style={styles.hora}>{item.hora}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bienvenido, Doctor</Text>
      
      <Image 
        source={require('../assets/FotoPerfil.png')} 
        style={styles.avatar} 
      />

      <Text style={styles.subtitle}>Pacientes bajo supervisión</Text>

      <View style={styles.listContainer}>
        <FlatList
          data={pacientes}
          renderItem={renderPaciente}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1D3557',
    textAlign: 'center',
    marginVertical: 15,
  },
  subtitle: {
    fontSize: 20,
    color: '#1D3557',
    marginBottom: 20,
    textAlign: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#E53945',
    alignSelf: 'center',
    marginBottom: 20,
  },
  listContainer: {
    flex: 1,
    width: '100%',
  },
  listContent: {
    paddingBottom: 20,
  },
  pacienteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  cardAlerta: {
    borderLeftWidth: 4,
    borderLeftColor: '#E53945',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  nombre: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1D3557',
    marginBottom: 5,
  },
  datosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  medicion: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  hora: {
    fontSize: 12,
    color: '#6C757D',
  },
});

export default DoctorHomeScreen;
