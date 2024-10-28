import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
  Language: undefined;
  Support: undefined;
  Reminders: undefined;
  Theme: undefined;
  PrivacyPolicy: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  // Eliminar el header al cargar la pantalla
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    loadUserData();
  }, [navigation]);

  const loadUserData = async () => {
    try {
      const name = await AsyncStorage.getItem('userName'); // Obtener el nombre
      const lastName = await AsyncStorage.getItem('userLastName'); // Obtener el apellido
      const email = await AsyncStorage.getItem('userEmail')
      if (name) {
        const names = name.split(' ');
        setFirstName(names[0]); // Solo el primer nombre
      }
      if (lastName) {
        const lastNames = lastName.split(' ');
        setLastName(lastNames[0]); // Solo el primer apellido
      }
      if (email) {
        setEmail(email)
      }
    } catch (error) {
      console.error('Error loading user data', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Fondo curvado en la parte superior */}
      <View style={styles.headerBackground}>
        {/* Botón de retroceso */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#e53945" />
        </TouchableOpacity>
      </View>

      {/* Imagen de perfil, nombre y correo */}
      <View style={styles.profileContainer}>
        <View style={styles.profileImageWrapper}>
          <Image
            source={require('../assets/FotoPerfil.png')} // Ruta correcta de la imagen local
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editIcon} onPress={() => navigation.navigate('EditProfile')}>
            <Icon name="pencil" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        <Text style={styles.profileName}>{firstName} {lastName}</Text>
        <Text style={styles.profileEmail}>{email}</Text>
      </View>

      {/* Secciones de Configuración */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.sectionItemNoBackground}>
          <View style={styles.sectionIconText}>
            <Icon name="cog" size={24} color="#a8dadb" />
            <Text style={styles.sectionText}>Configuración</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.groupedSection}>
          <TouchableOpacity
            style={styles.sectionItem}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <View style={styles.sectionIconText}>
              <Icon name="account" size={24} color="#a8dadb" />
              <Text style={styles.sectionText}>Editar Información de Perfil</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sectionItem}
            onPress={() => navigation.navigate('Reminders')}
          >
            <View style={styles.sectionIconText}>
              <Icon name="bell" size={24} color="#a8dadb" />
              <Text style={styles.sectionText}>Recordatorios</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sectionItem}
            onPress={() => navigation.navigate('Language')}
          >
            <View style={styles.sectionIconText}>
              <Icon name="earth" size={24} color="#a8dadb" />
              <Text style={styles.sectionText}>Idioma</Text>
            </View>
            <Text style={styles.sectionRightText}>Español</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        <View style={styles.groupedSection}>
          <TouchableOpacity
            style={styles.sectionItem}
            onPress={() => navigation.navigate('Theme')}
          >
            <View style={styles.sectionIconText}>
              <Icon name="theme-light-dark" size={24} color="#a8dadb" />
              <Text style={styles.sectionText}>Tema</Text>
            </View>
            <Text style={styles.sectionRightText}>Light mode</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        <View style={styles.groupedSection}>
          <TouchableOpacity
            style={styles.sectionItem}
            onPress={() => navigation.navigate('Support')}
          >
            <View style={styles.sectionIconText}>
              <Icon name="headset" size={24} color="#a8dadb" />
              <Text style={styles.sectionText}>Feedback y Soporte</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sectionItem}
            onPress={() => navigation.navigate('PrivacyPolicy')}
          >
            <View style={styles.sectionIconText}>
              <Icon name="file-document-outline" size={24} color="#a8dadb" />
              <Text style={styles.sectionText}>Política de Privacidad</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerBackground: {
    width: '100%',
    height: 180, // Reducido el fondo a 200 (de 250)
    backgroundColor: '#a8dadb', // Verde Agua
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    position: 'absolute',
    top: 0,
    zIndex: -1,
  },
  backButton: {
    padding: 10,
    position: 'absolute',
    top: 33,
    left: 25,
    zIndex: 3,
    fontFamily: 'Inder_400Regular', // Añadir la fuente
  },
  profileContainer: {
    marginTop: 120, // Movido más arriba a 120 para ajustarse a la nueva altura del fondo
    alignItems: 'center',
  },
  profileImageWrapper: {
    position: 'relative',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: -10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D3557',
    marginTop: 5,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    marginTop: 5,
    paddingHorizontal: 20,
  },
  sectionItemNoBackground: {
    paddingVertical: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  groupedSection: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    paddingVertical: 5,
    marginBottom: 10,
  },
  sectionItem: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionIconText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#000',
    fontFamily: 'Inder_400Regular',
  },
  sectionRightText: {
    fontSize: 14,
    color: '#e53945',
    fontFamily: 'Inder_400Regular',
  },
  separator: {
    marginVertical: 10,
  },
});

export default ProfileScreen;
