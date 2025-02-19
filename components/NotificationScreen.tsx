import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import api from '../server/api'; // Importar la instancia de API

const NotificationScreen = ({ route }) => {
    const navigation = useNavigation();
    const [historial, setHistorial] = useState([]);

    // Obtener el historial de mediciones del paciente
    useEffect(() => {
        const fetchHistorial = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const pacienteId = await AsyncStorage.getItem('userID'); // Obtener el ID del paciente

                console.log("Token:", token); // Depuración
                console.log("Paciente ID:", pacienteId); // Depuración

                if (token && pacienteId) {
                    const response = await api.get(`/glucose/historial/${pacienteId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (response.data && response.data.historial) {
                        setHistorial(response.data.historial);
                    }
                }
            } catch (error) {
                console.error("Error al obtener el historial de mediciones:", error);
            }
        };

        fetchHistorial();
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <FontAwesome name="arrow-left" size={24} color="#e53945" />
            </TouchableOpacity>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>Historial Completo{'\n'}de Mediciones</Text>
            </View>

            {historial.length > 0 ? (
                <FlatList
                    data={historial}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.notificationItem}>
                            <Text style={styles.notificationTitle}>
                                Fecha: {new Date(item.fecha_hora).toLocaleString()}
                            </Text>
                            <Text style={styles.notificationDescription}>
                                Nivel de Glucosa: {item.nivel_glucosa}
                            </Text>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.noDataText}>No hay mediciones registradas.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    backButton: {
        padding: 10,
        position: 'absolute',
        top: 33,
        left: 25,
        zIndex: 1,
        backgroundColor: '#fff',
        borderRadius: 50,
    },
    titleContainer: {
        marginTop: 90,
        alignItems: 'center',
    },
    title: {
        top: -40,
        marginTop: -17,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1D3557',
        textAlign: 'center',
        marginBottom: 30,
    },
    notificationItem: {
        marginBottom: 15,
        padding: 15,
        backgroundColor: '#f8f9fa',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#e53945',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    notificationTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1D3557',
        marginBottom: 5,
    },
    notificationDescription: {
        fontSize: 14,
        color: '#666',
    },
    noDataText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        marginTop: 20,
    },
});

export default NotificationScreen;