import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome } from '@expo/vector-icons';

const SupportScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleOptionPress = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Header sin fondo, con título y botón de retroceso */}
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#e53945" />
        </TouchableOpacity>
        <Text style={styles.title}>Soporte</Text>
      </View>

      {/* Opciones de soporte */}
      <ScrollView contentContainerStyle={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => handleOptionPress('Aquí puedes hacer una pregunta directamente al soporte.')}
        >
          <View style={styles.optionContent}>
            <Icon name="help-circle" size={24} color="#1d3557" />
            <Text style={styles.optionText}>Hacer una pregunta</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#1d3557" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => handleOptionPress('Aquí aprenderás más sobre cómo utilizar Glucoller.')}
        >
          <View style={styles.optionContent}>
            <Icon name="book-open" size={24} color="#1d3557" />
            <Text style={styles.optionText}>Aprende sobre Glucoller</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#1d3557" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => handleOptionPress('Consulta nuestras preguntas frecuentes para obtener más información.')}
        >
          <View style={styles.optionContent}>
            <Icon name="information-outline" size={24} color="#1d3557" />
            <Text style={styles.optionText}>Preguntas Frecuentes</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#1d3557" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => handleOptionPress('Envía un reporte si experimentas algún problema.')}
        >
          <View style={styles.optionContent}>
            <Icon name="email" size={24} color="#1d3557" />
            <Text style={styles.optionText}>Enviar Reporte</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#1d3557" />
        </TouchableOpacity>
      </ScrollView>

      {/* Modal para mostrar la información al presionar una opción */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalContent}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    color: '#1D3557',
    textAlign: 'center', // Asegura que el texto esté centrado
  },
  optionsContainer: {
    padding: 20,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#a8dadb', // Fondo verde agua
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#1D3557',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    color: '#1D3557',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#e53945',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SupportScreen;
