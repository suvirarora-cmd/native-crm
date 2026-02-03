import { ENV } from '../app/config/env.config';
import { AUTH_MESSAGES } from '../app/constants/messages';
import { AuthResponse, LoginData, SignupData } from '../common/types';
import {api } from './base';
import { IAuthAPI } from '../common/types/auth';

const API_URL = ENV.API_URL;

class AuthAPI implements IAuthAPI {
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/login', data);
      return response.data.data;
    } catch (error: any) {
      if (!API_URL || API_URL === '') {
        throw new Error(AUTH_MESSAGES.ERRORS.BACKEND_URL_NOT_CONFIGURED);
      }
      throw error;
    }
  }

  async signup(data: SignupData): Promise<AuthResponse> {
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
  }
}

export const authAPI: IAuthAPI = new AuthAPI();

export default api;
