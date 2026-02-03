import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { THEME_MESSAGES } from '../../app/constants/messages';
import { Theme, ThemeContextType } from '../../common/types/index';
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export { ThemeContext };

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>(systemTheme === THEME_MESSAGES.DARK ? THEME_MESSAGES.DARK : THEME_MESSAGES.LIGHT);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_MESSAGES.THEME);
      if (savedTheme) {
        setTheme(savedTheme as Theme);
      }
    } catch (error) {
      console.error(THEME_MESSAGES.LOADING_THEME, error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = theme === THEME_MESSAGES.DARK ? THEME_MESSAGES.LIGHT : THEME_MESSAGES.DARK;
      await AsyncStorage.setItem(THEME_MESSAGES.THEME, newTheme);
      setTheme(newTheme);
    } catch (error) {
      console.error(THEME_MESSAGES.SAVING_THEME, error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === THEME_MESSAGES.DARK }}>
      {children}
    </ThemeContext.Provider>
  );
};
