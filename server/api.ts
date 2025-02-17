// api.ts
import axios from 'axios';

// Configura la URL base de tu backend
const API_BASE_URL = 'http://192.168.18.6:3000/api';

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

// Exportar la instancia de Axios por si se necesita usarla directamente
export default api;