import React from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, View, TouchableOpacity,ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Datos estáticos de pacientes
const pacientes = [
  { 
    id: '1', 
    nombre: 'María González', 
    ultimaMedicion: '125 mg/dl', 
    hora: '08:30 AM',
    foto: require('../assets/FotoPerfil.png')
  },
  { 
    id: '2', 
    nombre: 'Carlos Rodríguez', 
    ultimaMedicion: '180 mg/dl', 
    hora: '10:45 AM',
    foto: require('../assets/FotoPerfil.png')
  },
];

const DoctorHomeScreen = () => {
  const navigation = useNavigation();

  const renderPaciente = ({ item }) => (
    <TouchableOpacity 
      style={styles.pacienteCard}
      onPress={() => navigation.navigate('DetallePaciente', { paciente: item })}
    >
      <Image source={item.foto} style={styles.profileImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <View style={styles.datosContainer}>
          <Text style={[
            styles.medicion,
            item.ultimaMedicion.includes('180') && styles.alertaAlta,
            item.ultimaMedicion.includes('90') && styles.alertaBaja
          ]}>
            {item.ultimaMedicion}
          </Text>
          <Text style={styles.hora}>{item.hora}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Bienvenido, Doctor</Text>
        
        <Image 
          source={require('../assets/FotoPerfil.png')} 
          style={styles.avatar} 
        />

        <Text style={styles.subtitle}>Pacientes bajo supervisión</Text>
        
        <FlatList
          data={pacientes}
          renderItem={renderPaciente}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.listContainer}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1D3557',
    marginTop: 20,
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 20,
    color: '#1D3557',
    marginVertical: 20,
    fontFamily: 'Inder_400Regular',
  },
  avatar: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 3,
    borderColor: '#E53945',
    marginBottom: 30,
  },
  listContainer: {
    width: '100%',
    paddingHorizontal: 15,
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
  alertaAlta: {
    color: '#E53945',
  },
  alertaBaja: {
    color: '#03A9F4',
  },
  hora: {
    fontSize: 12,
    color: '#6C757D',
  },
});

export default DoctorHomeScreen;