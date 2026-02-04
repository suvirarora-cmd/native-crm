import client from './client'; 
import { LoginData, SignupData, AuthResponse } from '../common/types';
export { setTokenInStorage, getTokenFromStorage, clearTokenFromStorage } from './client';

export const authAPI = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    try {
      const response = await client.post('/auth/login', data);
      return response.data.data;
    } catch (error: any) {
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

      if (data.adminSecretKey?.trim()) {
        payload.adminSecretKey = data.adminSecretKey;
      } 
      const response = await client.post('/auth/signup', payload);
      return response.data.data;
    } catch (error: any) {
      throw error;
    }
  },
};