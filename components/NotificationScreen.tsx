import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const NotificationScreen = ({ route }) => {
    const navigation = useNavigation();
    const [notifications, setNotifications] = useState([]);

    // Cargar notificaciones guardadas
    useEffect(() => {
        const loadNotifications = async () => {
            try {
                const storedNotifications = await AsyncStorage.getItem('notifications');
                if (storedNotifications) {
                    setNotifications(JSON.parse(storedNotifications));
                }
            } catch (error) {
                console.error("Error al cargar notificaciones:", error);
            }
        };
        loadNotifications();
    }, []);

    // Si se pasa una nueva notificación desde otra pantalla, se agrega
    useEffect(() => {
        if (route.params?.newNotification) {
            const newNotification = route.params.newNotification;
            const updatedNotifications = [newNotification, ...notifications];
            setNotifications(updatedNotifications);

            // Guardar en AsyncStorage
            AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications));
        }
    }, [route.params?.newNotification]);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <FontAwesome name="arrow-left" size={24} color="#e53945" />
            </TouchableOpacity>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>Historial Completo{'\n'}de Notificaciones</Text>
            </View>
            
            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.notificationItem, item.read ? styles.notificationRead : null]}>
                        <Text style={styles.notificationTitle}>{item.title}</Text>
                        <Text style={styles.notificationDescription}>{item.description}</Text>
                    </View>
                )}
            />
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
    notificationRead: {
        opacity: 0.6,
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
});

export default NotificationScreen;
