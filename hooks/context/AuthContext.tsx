import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { clearTokenFromStorage, getTokenFromStorage, setTokenInStorage } from '../../api/storage';
import { AUTH_MESSAGES } from '../../app/constants/messages';
import { AuthContextType, User } from '../../common/types/index';

const getStorageManager = () => {
  return AsyncStorage;
};

const storage = getStorageManager();

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await getTokenFromStorage();
      const storedUser = await storage.getItem('authUser');
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error(AUTH_MESSAGES.ERRORS.LOADING_AUTH, error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (access_token: string, user: User) => {
    try {
      await setTokenInStorage(access_token);
      await storage.setItem('authUser', JSON.stringify(user));
      setToken(access_token);
      setUser(user);
    } catch (error) {
      console.error(AUTH_MESSAGES.ERRORS.SAVING_AUTH, error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await clearTokenFromStorage();
      await storage.removeItem('authUser');
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error(AUTH_MESSAGES.ERRORS.LOGGING_OUT, error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, access_token: token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
