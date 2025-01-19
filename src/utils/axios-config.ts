import axios from 'axios';
import { getStoredToken, removeToken } from './token';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ENDPOINT_BACKEND,
});

api.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Si el token es inválido o caducó, eliminamos el token y redirigimos al login
      removeToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
