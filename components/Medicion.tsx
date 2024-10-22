import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';

const MainMenuScreen = () => {
    const [glucoseLevel, setGlucoseLevel] = useState('-'); // Estado para los niveles de glucosa

    // Función para generar un valor aleatorio entre 70 y 200
    const getRandomGlucoseLevel = () => {
        return Math.floor(Math.random() * (200 - 70 + 1)) + 70;
    };

    // Función para manejar el evento del ícono de advertencia
    const handleWarningPress = () => {
        const newGlucoseLevel = getRandomGlucoseLevel();
        setGlucoseLevel(newGlucoseLevel.toString());
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Hola Cindy</Text>
            </View>

            <Image source={require('../assets/FotoPerfil.png')} style={styles.avatar} /> 

            <Text style={styles.subtitle}>Comienza tu día</Text>

            <View style={styles.circleContainer}>
                <Text style={styles.circleText}>{glucoseLevel}</Text>
                <Text style={styles.unitText}>mg/dl</Text>
            </View>

            <Text style={styles.reminderText}>No Olvides Medirte</Text>

            {/* Indicadores de estados */}
            <View style={styles.statusContainer}>
                <TouchableOpacity style={[styles.statusButton, { backgroundColor: '#A4C639' }]}>
                    <Text style={styles.statusText}>Normal</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.statusButton, { backgroundColor: '#FFEB3B' }]}>
                    <Text style={styles.statusText}>Precaución</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.statusButton, { backgroundColor: '#03A9F4' }]}>
                    <Text style={styles.statusText}>Hipoglucemia</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.statusButton, { backgroundColor: '#E53945' }]}>
                    <Text style={styles.statusText}>Hiperglucemia</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.warningContainer}>
                <TouchableOpacity onPress={handleWarningPress}>
                    <Image source={require('../assets/warning.png')} style={styles.warningIcon} />
                </TouchableOpacity>
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
        marginTop: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1D3557',
        fontFamily: 'Inder_400Regular',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 20,
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 22,
        color: '#1D3557',
        fontFamily: 'Inder_400Regular',
    },
    circleContainer: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 5,
        borderColor: '#1D3557',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    circleText: {
        fontSize: 40,
        color: '#1D3557',
        fontWeight: 'bold',
    },
    unitText: {
        fontSize: 16,
        color: '#1D3557',
    },
    reminderText: {
        fontSize: 18,
        color: '#1D3557',
        fontFamily: 'Inder_400Regular',
    },
    statusContainer: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
    },
    statusButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    statusText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    warningContainer: {
        marginTop: 30,
    },
    warningIcon: {
        width: 50,
        height: 50,
    },
});

export default MainMenuScreen;
