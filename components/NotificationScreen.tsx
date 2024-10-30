import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const NotificationScreen = ({ route }) => {
    const navigation = useNavigation(); // Usamos useNavigation para agregar el botón de retroceso

    // Lista de notificaciones simuladas
    const notifications = [
        { id: '1', title: 'Nueva medición disponible', description: 'Revisa los últimos niveles de glucosa.', read: false },
        { id: '2', title: 'Recordatorio de medición', description: 'Es momento de registrar tu nivel de glucosa.', read: true },
        { id: '3', title: 'Actualización del perfil', description: 'Has actualizado tu foto de perfil.', read: true },
        { id: '4', title: 'Nuevo mensaje de soporte', description: 'Nuestro equipo de soporte te ha respondido.', read: false },
        { id: '5', title: 'Objetivo semanal cumplido', description: '¡Felicidades! Has alcanzado tu objetivo de mediciones esta semana.', read: false },
        { id: '6', title: 'Nivel de glucosa alto detectado', description: 'Tu última medición muestra un nivel alto de glucosa. Consulta a tu médico.', read: true },
        { id: '7', title: 'Actualización de política de privacidad', description: 'Nuestra política de privacidad ha sido actualizada.', read: true },
        { id: '8', title: 'Nuevo contacto añadido', description: 'Has añadido un nuevo contacto de emergencia.', read: false },
        { id: '9', title: 'Próxima consulta médica', description: 'Recuerda que tienes una consulta médica programada para el 25/10.', read: true },
        { id: '10', title: 'Nivel de glucosa en rango normal', description: 'Tu última medición de glucosa está en el rango normal. ¡Sigue así!', read: false },
        { id: '11', title: 'Recordatorio de ejercicio', description: 'Recuerda realizar al menos 30 minutos de ejercicio hoy.', read: false },
        { id: '12', title: 'Notificación de emergencia', description: 'Se ha enviado una alerta a tu contacto de emergencia debido a un nivel crítico de glucosa.', read: true },
        { id: '13', title: 'Nueva versión disponible', description: 'Hay una nueva actualización de la aplicación disponible.', read: true },
        { id: '14', title: 'Sugerencia de nutrición', description: 'Hoy es un buen día para agregar más vegetales a tu dieta.', read: false },
        { id: '15', title: 'Registro del reporte completado', description: 'El registro del reporte trimestral ha sido completado.', read: true },
        { id: '16', title: 'Revisión de objetivos', description: 'Revisa tus objetivos mensuales para ajustar tus metas.', read: true },
        { id: '17', title: 'Nueva meta de glucosa', description: 'Se ha establecido un nuevo objetivo para el nivel de glucosa.', read: false },
        { id: '18', title: 'Consejo de salud diario', description: 'Bebe al menos 2 litros de agua para mantenerte hidratado.', read: true },
        { id: '19', title: 'Medición de glucosa requerida', description: 'No olvides realizar la medición de glucosa de hoy.', read: false },
        { id: '20', title: 'Actualización de contactos', description: 'Un contacto de emergencia ha actualizado su información.', read: true },
        { id: '21', title: 'Felicidades por tu constancia', description: '¡Estás realizando mediciones de glucosa constantemente! Sigue así.', read: false },
        { id: '22', title: 'Revisión del registro', description: 'Revisa los registros de glucosa de la semana pasada.', read: true },
        { id: '23', title: 'Nuevo tutorial disponible', description: 'Aprende a mejorar tus hábitos alimenticios con nuestro nuevo tutorial.', read: true },
        { id: '24', title: 'Nivel bajo de glucosa detectado', description: 'Tu última medición muestra un nivel bajo de glucosa. Considera consumir algo dulce.', read: false },
        { id: '25', title: 'Notificación de sistema', description: 'El sistema estará en mantenimiento el 20/10 de 2:00 am a 4:00 am.', read: true },
    ];

    return (
        <View style={styles.container}>
            {/* Botón de retroceso */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <FontAwesome name="arrow-left" size={24} color="#e53945" />
            </TouchableOpacity>

            {/* Título de la pantalla */}
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Historial Completo{'\n'}de Notificaciones</Text>
            </View>
            
            {/* Lista de notificaciones */}
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
        top: 33,       // Mismo valor que el de ReporteScreen
        left: 25,      // Mismo valor que el de ReporteScreen
        zIndex: 1,
        backgroundColor: '#fff',
        borderRadius: 50,
    },
    titleContainer: {
        marginTop: 90, // Espacio para evitar la superposición con el botón de retroceso
        alignItems: 'center',
    },
    title: {
        top:-40,
        marginTop:-17,
        fontSize: 22, // Reducido el tamaño de la fuente
        fontWeight: 'bold',
        color: '#1D3557', // Color azul usado en la app
        textAlign: 'center',
        marginBottom: 30,
    },
    notificationItem: {
        marginBottom: 15,
        padding: 15,
        backgroundColor: '#f8f9fa',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#e53945', // Borde rojo similar al de otros componentes de la app
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3, // Para Android: añadir sombra y profundidad
    },
    notificationRead: {
        opacity: 0.6,
    },
    notificationTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1D3557', // Color azul para consistencia con la app
        marginBottom: 5,
    },
    notificationDescription: {
        fontSize: 14,
        color: '#666', // Gris suave para la descripción
    },
});

export default NotificationScreen;
