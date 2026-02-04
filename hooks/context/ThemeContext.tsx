import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { Theme, ThemeContextType } from "../../common/types/index";
import { THEME_MESSAGES } from "@/common/constants";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export { ThemeContext };

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>(
    systemTheme === "dark" ? "dark" : "light",
  );

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme) {
        setTheme(savedTheme as Theme);
      }
    } catch (error) {
      console.error(THEME_MESSAGES.LOADING_THEME, error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = theme === "light" ? "dark" : "light";
      await AsyncStorage.setItem("theme", newTheme);
      setTheme(newTheme);
    } catch (error) {
      console.error(THEME_MESSAGES.SAVING_THEME, error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, isDark: theme === "dark" }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
