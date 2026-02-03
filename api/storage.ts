import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { AUTH_MESSAGES } from '../app/constants/messages';

const isNative = Platform.OS === 'ios' || Platform.OS === 'android';

// Minimal storage wrapper used only for non-sensitive web fallback if needed
const getStorageWrapper = () => {
  return AsyncStorage;
};

const storageManager = getStorageWrapper();


export const setTokenInStorage = async (token: string) => {
  try {
    if (!token) {
      throw new Error(AUTH_MESSAGES.ERRORS.TOKEN_REQUIRED);
    }

    if (isNative) {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);
      const payload = JSON.stringify({ token, expiresAt: expiresAt.toISOString() });
      await SecureStore.setItemAsync('authToken', payload, {
        keychainService: 'native-crm-auth',
        requireAuthentication: false,
        keychainAccessible: SecureStore.WHEN_UNLOCKED
      });
      return;
    }
    await storageManager.setItem('authToken', token);
  } catch (error) {
    console.error(AUTH_MESSAGES.ERRORS.ERROR_SETTING_TOKEN, error);
    throw error;
  }
};

export const getTokenFromStorage = async () => {
  try {
    if (isNative) {
      const raw = await SecureStore.getItemAsync('authToken');
      if (!raw) return null;
      try {
        const parsed: { token: string; expiresAt?: string } = JSON.parse(raw);
        if (parsed?.expiresAt) {
          const now = Date.now();
          const exp = Date.parse(parsed.expiresAt);
          if (!Number.isNaN(exp) && now >= exp) {
            await SecureStore.deleteItemAsync('authToken');
            return null;
          }
        }
        return parsed.token ?? null;
      } catch {
        return null;
      }
    }

    return await storageManager.getItem('authToken');
  } catch (error) {
    console.error(AUTH_MESSAGES.ERRORS.ERROR_RETRIEVING_TOKEN, error);
    return null;
  }
};

export const clearTokenFromStorage = async () => {
  try {
    if (isNative) {
      await SecureStore.deleteItemAsync('authToken');
      return;
    }
    await storageManager.removeItem('authToken');
  } catch (error) {
    console.error(AUTH_MESSAGES.ERRORS.ERROR_CLEARING_TOKEN, error);
    throw error;
  }
};
