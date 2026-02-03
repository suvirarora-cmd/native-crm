import {api} from '../api/base';
import { getTokenFromStorage } from './storage';
import { AUTH_MESSAGES } from '../app/constants/messages'
api.interceptors.request.use(
  async (config:any) => {
    try {
      const token = await getTokenFromStorage();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error(AUTH_MESSAGES.ERRORS.ERROR_RETRIEVING_TOKEN, error);
    }
    return config;
  },
  (error:any) => {
    return Promise.reject(error);
  }
);
