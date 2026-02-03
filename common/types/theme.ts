import { THEME_MESSAGES } from "@/app/constants";
export type Theme = typeof THEME_MESSAGES.DARK | typeof THEME_MESSAGES.LIGHT;

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}
