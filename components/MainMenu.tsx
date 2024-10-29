import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Importar AsyncStorage
import { useNavigation } from '@react-navigation/native'; // Importamos useNavigation
import { MaterialIcons, Ionicons } from '@expo/vector-icons'; // Importamos el ícono del menú
import { DrawerActions } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';


const HomeScreen = () => {
    const [glucoseLevel, setGlucoseLevel] = useState('-'); // Estado para los niveles de glucosa
    const [lastMeasurementTime, setLastMeasurementTime] = useState(null); // Estado para almacenar la última hora de medición
    const [userName, setUserName] = useState(''); // Estado para almacenar el nombre del usuario
    const [profileImage, setProfileImage] = useState(require('../assets/FotoPerfil.png')); // Imagen predeterminada
    const navigation = useNavigation(); // Usamos useNavigation para controlar el drawer
    const [notificationCount, setNotificationCount] = useState(0); // Estado para contar las notificaciones

    // Importante: Usar useIsFocused para saber si la pantalla está en foco
    const isFocused = useIsFocused();

    // useEffect modificado que se ejecuta cuando la pantalla gana el foco
    useEffect(() => {
        if (isFocused) {
            const loadProfileData = async () => {
                try {
                    const name = await AsyncStorage.getItem('userName');
                    if (name) {
                        const firstName = name.split(' ')[0];
                        setUserName(firstName);
                    }

                    const savedImage = await AsyncStorage.getItem('profileImage');
                    if (savedImage) {
                        setProfileImage({ uri: savedImage }); // Usar la imagen guardada
                    }
                } catch (error) {
                    console.log('Error cargando la imagen o nombre del usuario', error);
                }
            };

            loadProfileData();
        }
    }, [isFocused]); // El efecto depende de isFocused

    const handleMenuPress = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };


    // Función para generar un valor aleatorio entre 70 y 200
    const getRandomGlucoseLevel = () => {
        return Math.floor(Math.random() * (200 - 70 + 1)) + 70;
    };

    // Obtener la hora actual
    const getCurrentTime = () => {
        const now = new Date();
        return `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    };

    // Función para manejar el evento del ícono de advertencia
    const handleWarningPress = () => {
        const newGlucoseLevel = getRandomGlucoseLevel();
        setGlucoseLevel(newGlucoseLevel.toString());
        setLastMeasurementTime(getCurrentTime()); // Guardar la hora de la última medición
        setNotificationCount((prevCount) => prevCount + 1); // Incrementar el contador de notificaciones
    };

    const handleNotificationPress = () => {
        navigation.navigate('NotificationScreen'); // Navegar a la pantalla de notificaciones
        setNotificationCount(0); // Resetear el contador al entrar en la pantalla de notificaciones
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

    // Obtener el color basado en el nivel de glucosa
    const getCircleColor = () => {
        const glucose = parseInt(glucoseLevel, 10);
        if (glucose <= 70) {
            return '#03A9F4'; // Azul para hipoglucemia
        } else if (glucose >= 180) {
            return '#E53945'; // Rojo para hiperglucemia
        } else if (glucose >= 131 && glucose <= 179) {
            return '#FFEB3B'; // Amarillo para precaución
        } else if (glucose >= 71 && glucose <= 130){
            return '#A4C639'; // Verde para normal
        } else {
            return '#1D3557';
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                {/* Botón de menú para abrir el Drawer */}
                <TouchableOpacity onPress={handleMenuPress} style={styles.menuButton}>
                    <MaterialIcons name="menu" size={35} color="#e53945" />
                </TouchableOpacity>
                {/* Icono de notificaciones */}
                <TouchableOpacity onPress={handleNotificationPress} style={styles.notificationButton}>
                    <Ionicons name="notifications-outline" size={35} color="#e53945" />
                    {notificationCount > 0 && (
                        <View style={styles.notificationBadge}>
                            <Text style={styles.notificationText}>{notificationCount}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            {/* Mostrar el nombre del usuario registrado */}
            <Text style={styles.title}>Hola, {userName}</Text>

            {/* Aquí mostramos la imagen de perfil actualizada */}
            <Image source={profileImage} style={styles.avatar} />

            <Text style={styles.subtitle}>Comienza tu día</Text>

            <View style={[styles.circleContainer, { borderColor: getCircleColor() }]}>
                <Text style={styles.circleText}>{glucoseLevel}</Text>
                <Text style={styles.unitText}>mg/dl</Text>
            </View>

            {/* Texto dinámico según la medición */}
            {lastMeasurementTime ? (
                <Text style={styles.reminderText}>Última medición a las {lastMeasurementTime}</Text>
            ) : (
                <Text style={styles.reminderText}>No Olvides Medirte</Text>
            )}

            {/* Indicadores de estados */}
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
}


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
        borderColor: '#1D3557',
        borderWidth: 5,
        width: 137,
        height: 137,
        borderRadius: 70,
        marginTop: 20,
        marginBottom: 20,
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
