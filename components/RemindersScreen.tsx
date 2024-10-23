import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Modal, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';

const RemindersScreen = ({ navigation }) => {
  const [selectedReminder, setSelectedReminder] = useState('');
  const [reminders, setReminders] = useState([
    'Recordatorio 1  7:30 am',
    'Recordatorio 2  8:00 pm',
    'Recordatorio 3  11:50 pm',
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newReminderName, setNewReminderName] = useState('');
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  const handleAddReminder = () => {
    if (newReminderName.trim()) {
      const formattedTime = `${time.getHours()}:${time.getMinutes() < 10 ? '0' : ''}${time.getMinutes()}`;
      const newReminder = `${newReminderName}  ${formattedTime}`;
      setReminders([...reminders, newReminder]);
      setNewReminderName('');
      setShowModal(false);
    } else {
      alert('Por favor ingresa un nombre para el recordatorio');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header sin fondo, con título y botón de retroceso */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-left" size={30} color="#E53945" />
        </TouchableOpacity>
        <Text style={styles.title}>Recordatorios</Text>
      </View>

      {/* Opciones de recordatorio */}
      <ScrollView contentContainerStyle={styles.remindersContainer}>
        {reminders.map((reminder, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.reminderCard,
              selectedReminder === reminder && styles.selectedReminderCard,
            ]}
            onPress={() => setSelectedReminder(reminder)}
          >
            <View style={styles.reminderContent}>
              <Icon name="alarm" size={24} color={selectedReminder === reminder ? "#fff" : "#457B9D"} />
              <Text style={styles.reminderText}>{reminder}</Text>
            </View>
            {selectedReminder === reminder && (
              <Icon name="check-circle" size={24} color="#fff" />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Botón para añadir nuevo recordatorio */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={styles.addReminderButton}
          onPress={() => setShowModal(true)}
        >
          <Icon name="plus" size={24} color="#fff" />
          <Text style={styles.addReminderText}>Añadir Recordatorio</Text>
        </TouchableOpacity>
      </View>

      {/* Modal para añadir nuevo recordatorio */}
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Añadir Nuevo Recordatorio</Text>

            <TextInput
              style={styles.input}
              placeholder="Nombre del recordatorio"
              value={newReminderName}
              onChangeText={setNewReminderName}
            />

            <TouchableOpacity
              style={styles.timePickerButton}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={styles.timePickerText}>
                {`Hora seleccionada: ${time.getHours()}:${time.getMinutes() < 10 ? '0' : ''}${time.getMinutes()}`}
              </Text>
            </TouchableOpacity>

            {showTimePicker && (
              <DateTimePicker
                value={time}
                mode="time"
                display="default"
                onChange={handleTimeChange}
              />
            )}

            <View style={styles.modalButtonRow}>
              <Button title="Cancelar" onPress={() => setShowModal(false)} />
              <Button title="Añadir" onPress={handleAddReminder} />
            </View>
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
  remindersContainer: {
    padding: 20,
  },
  reminderCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#a8dadb',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  selectedReminderCard: {
    backgroundColor: '#A8DADB',
  },
  reminderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminderText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#1d3557',
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  addReminderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E53945',
    paddingVertical: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  addReminderText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
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
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  timePickerButton: {
    backgroundColor: '#f0faef',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  timePickerText: {
    color: '#457B9D',
    fontSize: 16,
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default RemindersScreen;
