import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, Image, Alert, FlatList, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { io } from 'socket.io-client';
import { Audio } from 'expo-av';


// URL del backend con WebSockets
const SOCKET_URL = 'https://glucollerbackv2-aagbhme4fee4cmed.brazilsouth-01.azurewebsites.net';
const socket = io(SOCKET_URL);

// Configuración para manejar notificaciones en segundo plano
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

const HomeScreen = () => {
    const [glucoseLevel, setGlucoseLevel] = useState('-');
    const [lastMeasurementTime, setLastMeasurementTime] = useState(null);
    const [userName, setUserName] = useState('');
    const [profileImage, setProfileImage] = useState(require('../assets/FotoPerfil.png'));
    const navigation = useNavigation();
    const [notificationCount, setNotificationCount] = useState(0);
    const isFocused = useIsFocused();
    const [notifications, setNotifications] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [lastGlucoseLevel, setLastGlucoseLevel] = useState(null); 


    // Solicitar permisos de notificación
    useEffect(() => {
        const requestPermissions = async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("Permiso requerido", "Los permisos para notificaciones no fueron otorgados.");
            }
        };

        requestPermissions();
    }, []);

    useEffect(() => {
        const loadStoredNotifications = async () => {
            try {
                const storedNotifications = await AsyncStorage.getItem('notifications');
                if (storedNotifications) {
                    const parsedNotifications = JSON.parse(storedNotifications);
                    setNotifications(parsedNotifications);
                    setNotificationCount(parsedNotifications.filter((notif) => !notif.read).length);
                }
            } catch (error) {
                console.error('Error al cargar las notificaciones almacenadas:', error);
            }
        };
    
        loadStoredNotifications();
    }, [isFocused]); // Se ejecuta cuando la pantalla gana el foco
    // Cargar datos del perfil cuando la pantalla gana el foco
    useEffect(() => {
        const loadProfileDataAndSubscribeToGlucose = async () => {
          try {
            const name = await AsyncStorage.getItem('userName');
            if (name) setUserName(name.split(' ')[0]); // Extraer solo el primer nombre
      
            const savedImage = await AsyncStorage.getItem('profileImage');
            if (savedImage) setProfileImage({ uri: savedImage });
      
            const storedNotifications = await AsyncStorage.getItem('notifications');
            if (storedNotifications) {
              const parsedNotifications = JSON.parse(storedNotifications);
              setNotifications(parsedNotifications);
              setNotificationCount(parsedNotifications.filter((notif) => !notif.read).length);
            }
          } catch (error) {
            console.error('Error cargando datos del perfil:', error);
          }
      
          // Suscribirse a las actualizaciones de glucosa del socket
          socket.on('glucoseUpdate', (data: any) => {
            console.log('Datos recibidos del socket:', JSON.stringify(data, null, 2));
      
            const newGlucoseValue = data?.nivel_glucosa ?? data?.measurement?.nivel_glucosa;
            if (typeof newGlucoseValue !== 'number') {
              console.error('El valor de glucosa recibido no es válido:', data);
              return;
            }
      
            setGlucoseLevel(newGlucoseValue.toString());
            setLastMeasurementTime(new Date().toLocaleTimeString());
      
            // Verificar si el nivel de glucosa ha cambiado antes de actualizar
            if (newGlucoseValue !== lastGlucoseLevel) {
              setLastGlucoseLevel(newGlucoseValue);
              setNotificationCount((prevCount) => prevCount + 1);
      
              // Determinar la categoría del nivel de glucosa
              let level = "Normal ✅";
              if (newGlucoseValue >= 131 && newGlucoseValue <= 179) level = "Precaución ⚠️";
              else if (newGlucoseValue >= 180) level = "Hiperglucemia 🚫";
              else if (newGlucoseValue < 70) level = "Hipoglucemia 🚫";
      
              sendNotification(level, newGlucoseValue);
            }
          });
        };
      
        loadProfileDataAndSubscribeToGlucose();
      
        // Limpiar la suscripción del socket cuando el componente se desmonte
        return () => {
          socket.off('glucoseUpdate');
        };
      }, [isFocused, lastGlucoseLevel]); // Se incluye `lastGlucoseLevel` como dependencia

    const handleMenuPress = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };
    
    const sendNotification = async (level, glucoseValue) => {
        const newNotification = {
            id: Date.now().toString(),
            title: `Nivel de glucosa: ${glucoseValue} mg/dl`,
            description: level,
            read: false,
        };
    
        setNotifications((prev) => {
            const updatedNotifications = [newNotification, ...prev];
            
            // Guardar en AsyncStorage
            AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications))
                .catch(error => console.error('Error guardando notificaciones:', error));
    
            return updatedNotifications;
        });
    
        setNotificationCount((prevCount) => prevCount + 1)

        // Función para reproducir el sonido de la notificación
        const playSound = async (times, glucoseValue, level) => {
            try {
                // Mostrar una única notificación con los valores actualizados
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: "Glucoller",
                        body: `Tu nivel de glucosa está en ${glucoseValue} mg/dl - ${level}\n${getCurrentTime()}`,
                    },
                    trigger: null, // Enviar la notificación de inmediato
                });
        
                for (let i = 0; i < times; i++) {
                    // Cargar el sonido en cada iteración
                    const { sound } = await Audio.Sound.createAsync(
                        require('../assets/sound/notif.mp3') // Ruta al archivo de sonido
                    );
        
                    // Reproducir el sonido
                    await sound.playAsync();
        
                    // Esperar a que termine de reproducirse
                    await new Promise<void>((resolve) => {
                        sound.setOnPlaybackStatusUpdate((status) => {
                            if (status.isLoaded && status.didJustFinish) {
                                sound.unloadAsync(); // Descargar el sonido después de terminar
                                resolve(); // Resolver la promesa cuando el sonido termine
                            }
                        });
                    });
        
                    // Esperar antes de la siguiente iteración (500 ms entre sonidos)
                    if (i < times - 1) await new Promise<void>((resolve) => setTimeout(resolve, 500));
                }
            } catch (error) {
                console.error("Error al reproducir el sonido:", error);
            }
        };
        
        // Asegurarse de pasar los valores de glucoseValue y level cuando se llame
        if (level === "Hiperglucemia 🚫" || level === "Hipoglucemia 🚫") {
            // Reproducir el sonido 4 veces para niveles críticos, pasando el valor de glucosa y el nivel
            playSound(4, glucoseValue, level);
        } else {
            // Reproducir el sonido solo una vez para niveles normales o de precaución, pasando el valor de glucosa y el nivel
            playSound(1, glucoseValue, level);
        }     
        
    };    
   

    const handleWarningPress = async () => {
    };
    
    const getRandomGlucoseLevel = () => {
        return Math.floor(Math.random() * (200 - 70 + 1)) + 70;
    };

    const getCurrentTime = () => {
        const now = new Date();
        return `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
        // Formato de hora: HH:MM
        return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    };

    const handleNotificationPress = async () => {
        setModalVisible(true);
    
        const updatedNotifications = notifications.map((notification) => ({
            ...notification,
            read: true,
        }));
    
        setNotifications(updatedNotifications);
        setNotificationCount(0);
    
        // Guardar en AsyncStorage
        AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications))
            .catch(error => console.error('Error al actualizar las notificaciones:', error));
    };
    

    const handleCloseModal = () => {
        setModalVisible(false); // Cerrar el modal
    };


    const handleNotificationDelete = (id) => {
        const updatedNotifications = notifications.filter(notification => notification.id !== id);
        setNotifications(updatedNotifications);
        setNotificationCount(updatedNotifications.length);
    
        // Guardar en AsyncStorage
        AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications))
            .catch((error) => console.error('Error al eliminar la notificación:', error));
    };

    const handleNotificationRead = (id) => {
        const updatedNotifications = notifications.map(notification => {
            if (notification.id === id) {
                return { ...notification, read: true };
            }
            return notification;
        });
        setNotifications(updatedNotifications);
        AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications)).catch((error) => {
            console.error('Error al actualizar la notificación:', error);
        });
    };

    const handleViewAllNotifications = () => {
        setModalVisible(false);
        navigation.navigate('NotificationScreen', { notifications });
    };

    const showNormalRange = () => {
        Alert.alert("Rango Normal", "90 - 130 mg/dl");
    };

    const showPrecautionRange = () => {
        Alert.alert("Rango Precaución", "131 - 179 mg/dl");
    };

    const showHypoglycemiaRange = () => {
        Alert.alert("Rango Hipoglucemia", "0 - 70 mg/dl");
    };

    const showHyperglycemiaRange = () => {
        Alert.alert("Rango Hiperglucemia", "180 - más mg/dl");
    };

    const getCircleColor = () => {
        const glucose = parseInt(glucoseLevel, 10);
        if (glucose <= 70) {
            return '#03A9F4'; // Azul para hipoglucemia
        } else if (glucose >= 180) {
            return '#E53945'; // Rojo para hiperglucemia
        } else if (glucose >= 131 && glucose <= 179) {
            return '#FFEB3B'; // Amarillo para precaución
        } else if (glucose >= 71 && glucose <= 130) {
            return '#A4C639'; // Verde para normal
        } else {
            return '#1D3557'; // Color por defecto
        }
    };

    const showRangeAlert = (title, range) => {
        Alert.alert(title, range);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={styles.menuButton}>
                    <MaterialIcons name="menu" size={35} color="#e53945" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNotificationPress} style={styles.notificationButton}>
                    <Ionicons name="notifications-outline" size={35} color="#e53945" />
                    {notificationCount > 0 && (
                        <View style={styles.notificationBadge}>
                            <Text style={styles.notificationText}>{notificationCount}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            <Text style={styles.title}>Hola, {userName}</Text>
            <Image source={profileImage} style={styles.avatar} />
            <Text style={styles.subtitle}>Comienza tu día</Text>

            <View style={[styles.circleContainer, { borderColor: getCircleColor() }]}>
                <Text style={styles.circleText}>{glucoseLevel}</Text>
                <Text style={styles.unitText}>mg/dl</Text>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Notificaciones</Text>
                        <FlatList
                            data={notifications}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View style={[styles.notificationItem, item.read ? styles.notificationRead : null]}>
                                    <Text style={styles.notificationTitle}>{item.title}</Text>
                                    <Text style={styles.notificationDescription}>{item.description}</Text>
                                    <View style={styles.notificationActions}>
                                        <TouchableOpacity onPress={() => handleNotificationRead(item.id)}>
                                            <Text style={styles.readButton}>Leer</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => handleNotificationDelete(item.id)}>
                                            <Text style={styles.deleteButton}>Borrar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                            showsVerticalScrollIndicator={true}
                            style={{ maxHeight: 400 }}
                        />
                        <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAllNotifications}>
                            <Text style={styles.viewAllButtonText}>Ver Todas</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.closeButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {lastMeasurementTime ? (
                <Text style={styles.reminderText}>Última medición a las {lastMeasurementTime}</Text>
            ) : (
                <Text style={styles.reminderText}>No Olvides Medirte</Text>
            )}

            <View style={styles.statusContainer}>
                <View style={styles.statusButton}>
                    <TouchableOpacity style={[styles.statusButton, { backgroundColor: '#A4C639' }]}
                    onPress={showNormalRange}
                    >
                        <Text style={styles.statusText}>Normal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.statusButton, { backgroundColor: '#FFEB3B' }]}
                    onPress={showPrecautionRange}
                    >
                        <Text style={styles.statusText}>Precaución</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.statusButton, { backgroundColor: '#03A9F4' }]}
                    onPress={showHypoglycemiaRange}
                    >
                        <Text style={styles.statusText}>Hipoglucemia</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.statusButton, { backgroundColor: '#E53945' }]}
                    onPress={showHyperglycemiaRange}
                    >
                        <Text style={styles.statusText}>Hiperglucemia</Text>
                    </TouchableOpacity>
                </View>

            <View style={styles.warningContainer}>
                <TouchableOpacity onPress={handleWarningPress}>
                    <Image source={require('../assets/warning.png')} style={styles.warningIcon} />
                </TouchableOpacity>
            </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 15,
        marginTop: 10,
    },
    menuButton: {
        top:-22,
        left: 30,
        position: 'absolute',
        color: '#E53945',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#1D3557',
        fontFamily: 'Inder_400Regular',
        marginTop: -25,
    },
    avatar: {
        width: 137,            // Ancho de la imagen
        height: 137,           // Altura de la imagen (igual que el ancho para hacerlo cuadrado)
        borderRadius: 68.5,    // Radio del borde, la mitad del ancho/altura para que sea circular
        marginTop: 20,
        marginBottom: 20,
        borderWidth: 5,        // Grosor del borde (puedes ajustar este valor)
        borderColor: '#A8DADB', // Color del borde (puedes cambiar a cualquier color que prefieras)
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        maxHeight: '70%', // Limita la altura máxima del modal para que haya espacio para el scroll
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    notificationItem: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        width: '100%',
    },
    notificationRead: {
        opacity: 0.6,
    },
    notificationTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    notificationDescription: {
        fontSize: 14,
        marginTop: 5,
    },
    notificationActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    readButton: {
        color: '#1D3557',
        fontWeight: 'bold',
    },
    deleteButton: {
        color: '#E53945',
        fontWeight: 'bold',
    },
    viewAllButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#1D3557',
        borderRadius: 5,
    },
    viewAllButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#e53945',
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 22,
        color: '#1D3557',
        fontFamily: 'Inder_400Regular',
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
        color: '#1D3557',
        fontWeight: 'bold',
    },
    unitText: {
        fontSize: 16,
        color: '#1D3557',
        fontFamily: 'Inder_400Regular',
    },
    reminderText: {
        fontSize: 18,
        color: '#1D3557',
        fontFamily: 'Inder_400Regular',
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 15,
        marginTop: 40,
    },
    statusButton: {
        marginLeft:5,
        width:130,
        margin: 5,
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'center',
    },
    statusText: {
        color: '#1d3557',
        fontWeight: 'bold',
        fontSize: 14,
        fontFamily: 'Inder_400Regular',
    },
    warningContainer: {
        marginTop: 30,
    },
    warningIcon: {
        marginTop:20,
        
        width: 80,
        height: 80,
    },
    notificationButton: {
        position: 'absolute',
        right: 30,
        top: -22,
    },
    notificationBadge: {
        position: 'absolute',
        right: -6,
        top: -6,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
