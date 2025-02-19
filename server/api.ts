// api.ts
import axios from 'axios';
import { io } from 'socket.io-client'; // Importar socket.io-client


// Configura la URL base de tu backend
const API_BASE_URL = 'https://glucollerbackv2-aagbhme4fee4cmed.brazilsouth-01.azurewebsites.net/api';
// Inicializar socket.io
export const socket = io(API_BASE_URL); // Asegúrate de que el backend tenga WebSockets activos

// Crear una instancia de Axios con la configuración base
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para realizar el login
export const login = async (correo: string, contraseña: string) => {
  try {
    const response = await api.post('/auth/login', { correo, contraseña });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Función para registrar un usuario
export const register = async (userData: {
  nombre: string;
  apellidos: string;
  correo: string;
  dia: string;
  mes: string;
  anio: string;
  enfermedad: string;
  password: string;
  tipo_usuario: string;
}) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Función para obtener el perfil del usuario
export const getProfile = async (token: string) => {
  try {
    const response = await api.get('/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Función para actualizar el perfil del usuario
export const updateProfile = async (token: string, profileData: any) => {
  try {
    const response = await api.put('/user/profile', profileData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Función para obtener notificaciones
export const getNotifications = async (token: string) => {
  try {
    const response = await api.get('/notifications', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Función para enviar el nivel de glucosa y actualizar el estado en la UI
export const sendGlucoseLevel = async (
  token: string,
  pacienteId: string,
  nivelGlucosa: number,
  setGlucoseLevel: (glucose: string) => void
) => {
  try {
    const response = await api.post(
      '/glucose/sendGlucose',
      { paciente_id: pacienteId, nivel_glucosa: nivelGlucosa },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('Respuesta del servidor:', JSON.stringify(response.data, null, 2));

    // Verificar qué estructura tiene la respuesta
    const newGlucoseLevel = response.data?.measurement?.nivel_glucosa ?? response.data?.nivel_glucosa;

    if (typeof newGlucoseLevel === 'number') {
      setGlucoseLevel(newGlucoseLevel.toString());

      // Emitir evento en el socket para actualización en tiempo real
      socket.emit('glucoseUpdate', { nivel_glucosa: newGlucoseLevel });
    } else {
      console.error('Estructura inesperada en la respuesta:', JSON.stringify(response.data, null, 2));
    }

    return response.data;
  } catch (error) {
    console.error('Error al enviar nivel de glucosa:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Exportar la instancia de Axios por si se necesita usarla directamente
export default api;