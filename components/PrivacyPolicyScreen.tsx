import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PrivacyPolicyScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header sin fondo, con título y botón de retroceso */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-left" size={30} color="#E53945" />
        </TouchableOpacity>
        <Text style={styles.title}>Política de Privacidad</Text>
      </View>

      {/* Contenido de la política */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.sectionTitle}>1. Tipos de datos que recolectamos</Text>
        <Text style={styles.content}>
          Recopilamos diferentes tipos de información personal, incluyendo tu nombre, dirección de correo electrónico, número de teléfono y cualquier otro dato relevante para los servicios que ofrecemos. Esta información se obtiene directamente de ti cuando completas formularios o interactúas con nuestras plataformas.
        </Text>

        <Text style={styles.sectionTitle}>2. Uso de tus datos personales</Text>
        <Text style={styles.content}>
          Utilizamos la información que nos proporcionas para mejorar nuestros servicios, procesar tus solicitudes, y mantenerte informado sobre actualizaciones y ofertas relacionadas con nuestros productos. Además, utilizamos estos datos para fines analíticos y para personalizar tu experiencia en nuestras plataformas.
        </Text>

        <Text style={styles.sectionTitle}>3. Divulgación de tus datos personales</Text>
        <Text style={styles.content}>
          No compartimos tus datos personales con terceros, salvo en los casos necesarios para cumplir con la ley, procesar transacciones, o proporcionar servicios específicos que requieran la intervención de un tercero. Garantizamos que cualquier tercero con quien compartamos tu información cumple con nuestras políticas de privacidad.
        </Text>

        <Text style={styles.sectionTitle}>4. Seguridad de los datos</Text>
        <Text style={styles.content}>
          Tomamos medidas razonables para proteger la información personal que nos proporcionas frente a acceso no autorizado, divulgación, alteración o destrucción. Sin embargo, no podemos garantizar la seguridad absoluta de tus datos en línea, por lo que te recomendamos que también tomes precauciones al compartir información en la red.
        </Text>

        <Text style={styles.sectionTitle}>5. Tus derechos</Text>
        <Text style={styles.content}>
          Tienes derecho a acceder, rectificar o eliminar tus datos personales en cualquier momento. Si deseas ejercer alguno de estos derechos o si tienes alguna pregunta sobre nuestra política de privacidad, puedes contactarnos a través del correo electrónico proporcionado en nuestras plataformas.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centra el título
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'transparent', // Sin fondo
    marginTop: 40, // Mueve el encabezado más abajo
    position: 'relative', // Permite posicionar el botón de retroceso
  },
  backButton: {
    position: 'absolute',
    left: 20, // Posiciona el botón de retroceso a la izquierda
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D3557', // Mantiene el estilo azul oscuro
    textAlign: 'center', // Asegura que el texto esté centrado
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    lineHeight: 24, // Mejora la legibilidad
    marginBottom: 15,
    textAlign: 'justify', // Justificar el texto para una apariencia más formal
  },
});

export default PrivacyPolicyScreen;
