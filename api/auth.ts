import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Platform } from 'react-native';
import { ENV } from '../app/config/env.config';
import { AUTH_MESSAGES } from '../app/constants/messages';
import { AuthResponse, LoginData, SignupData } from '../common/types';

const API_URL = ENV.API_URL;

const getAsyncStorage = () => {
  if (typeof AsyncStorage !== 'undefined' && AsyncStorage !== null) {
    return AsyncStorage;
  }
  if (Platform.OS === 'web') {
    return {
      setItem: async (key: string, value: string) => {
        localStorage.setItem(key, value);
      },
      getItem: async (key: string) => {
        return localStorage.getItem(key);
      },
      removeItem: async (key: string) => {
        localStorage.removeItem(key);
      }
    };
  }
  return AsyncStorage;
};

const storageManager = getAsyncStorage();

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await storageManager.getItem('authToken');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error(AUTH_MESSAGES.ERRORS.ERROR_RETRIEVING_TOKEN, error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const setTokenInStorage = async (token: string) => {
  try {
    if (!token) {
      throw new Error(AUTH_MESSAGES.ERRORS.TOKEN_REQUIRED);
    }
    
    await storageManager.setItem('authToken', token);
    
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);
      document.cookie = `authToken=${token}; path=/; expires=${expirationDate.toUTCString()}; SameSite=Strict`;
    }
  } catch (error) {
    console.error(AUTH_MESSAGES.ERRORS.ERROR_SETTING_TOKEN, error);
    throw error;
  }
};

export const getTokenFromStorage = async () => {
  try {
    return await storageManager.getItem('authToken');
  } catch (error) {
    console.error(AUTH_MESSAGES.ERRORS.ERROR_RETRIEVING_TOKEN, error);
    return null;
  }
};

export const clearTokenFromStorage = async () => {
  try {
    await storageManager.removeItem('authToken');
    
    // Clear cookie for web
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict';
    }
  } catch (error) {
    console.error(AUTH_MESSAGES.ERRORS.ERROR_CLEARING_TOKEN, error);
    throw error;
  }
};

export const authAPI = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/login', data);
      return response.data.data;
    } catch (error: any) {
      if (!API_URL || API_URL === '') {
        throw new Error(AUTH_MESSAGES.ERRORS.BACKEND_URL_NOT_CONFIGURED);
      }
      throw error;
    }
  },

  signup: async (data: SignupData): Promise<AuthResponse> => {
    try {
      const payload: any = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      if (data.adminSecretKey && data.adminSecretKey.trim() !== '') {
        payload.adminSecretKey = data.adminSecretKey;
      } 
      const response = await api.post('/auth/signup', payload);
      return response.data.data;
    } catch (error: any) {
      if (!API_URL || API_URL === '') {
        throw new Error(AUTH_MESSAGES.ERRORS.BACKEND_URL_NOT_CONFIGURED);
      }
      throw error;
    }
  },
};

export default api;
