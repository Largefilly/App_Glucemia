import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Profile: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

const ProfileScreen: React.FC<Props> = ({ navigation }) => {

  // Eliminar el header al cargar la pantalla
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      {/* Fondo de color sólido */}
      <View style={styles.headerBackground} />

      {/* Header con botón de retroceso */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Imagen de perfil, nombre y correo */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} // Puedes reemplazar por la imagen de perfil real
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editIcon}>
          <Icon name="pencil" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.profileName}>Cindy Nero</Text>
        <Text style={styles.profileEmail}>youremail@domain.com</Text>
      </View>

      {/* Secciones de Configuración */}
      <View style={styles.section}>
        {/* Sección de Configuración sin fondo */}
        <TouchableOpacity style={styles.sectionItemNoBackground}>
          <View style={styles.sectionIconText}>
            <Icon name="cog" size={24} color="#a8dadb" />
            <Text style={styles.sectionText}>Configuración</Text>
          </View>
        </TouchableOpacity>

        {/* Grupo de secciones con un fondo gris */}
        <View style={styles.groupedSection}>
          <TouchableOpacity style={styles.sectionItem}>
            <View style={styles.sectionIconText}>
              <Icon name="account" size={24} color="#a8dadb" />
              <Text style={styles.sectionText}>Editar Información de Perfil</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sectionItem}>
            <View style={styles.sectionIconText}>
              <Icon name="bell" size={24} color="#a8dadb" />
              <Text style={styles.sectionText}>Recordatorios</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sectionItem}>
            <View style={styles.sectionIconText}>
              <Icon name="earth" size={24} color="#a8dadb" />
              <Text style={styles.sectionText}>Idioma</Text>
            </View>
            <Text style={styles.sectionRightText}>Español</Text>
          </TouchableOpacity>
        </View>

        {/* Separación entre las agrupaciones */}
        <View style={styles.separator} />

        {/* Sección individual "Tema" con fondo */}
        <View style={styles.groupedSection}>
          <TouchableOpacity style={styles.sectionItem}>
            <View style={styles.sectionIconText}>
              <Icon name="theme-light-dark" size={24} color="#a8dadb" />
              <Text style={styles.sectionText}>Tema</Text>
            </View>
            <Text style={styles.sectionRightText}>Light mode</Text>
          </TouchableOpacity>
        </View>

        {/* Separación entre las agrupaciones */}
        <View style={styles.separator} />

        {/* Grupo de "Feedback y Soporte" y "Política de Privacidad" */}
        <View style={styles.groupedSection}>
          <TouchableOpacity style={styles.sectionItem}>
            <View style={styles.sectionIconText}>
              <Icon name="headset" size={24} color="#a8dadb" />
              <Text style={styles.sectionText}>Feedback y Soporte</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sectionItem}>
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
    position: 'absolute',
    width: '100%',
    height: 180, // Ajusta la altura del fondo
    backgroundColor: '#a8dadb', // Color de fondo sólido
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    zIndex: -1,
  },
  header: {
    position: 'absolute',
    top: 40,  // Ajusta según tu diseño
    left: 20,
    zIndex: 1, // Asegura que el botón esté sobre el fondo
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 120, // Ajusta para centrar la imagen de perfil con el fondo
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
    marginBottom: 10,
  },
  editIcon: {
    position: 'absolute',
    right: 115,
    bottom: 35,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 5,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Inder_400Regular', // Aplica la fuente Inder
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Inder_400Regular', // Aplica la fuente Inder
  },
  section: {
    marginTop: 20,
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
    fontFamily: 'Inder_400Regular', // Aplica la fuente Inder
  },
  sectionRightText: {
    fontSize: 14,
    color: '#e53945',
    fontFamily: 'Inder_400Regular', // Aplica la fuente Inder
  },
  separator: {
    marginVertical: 10, // Espacio entre las agrupaciones
  },
});

export default ProfileScreen;
