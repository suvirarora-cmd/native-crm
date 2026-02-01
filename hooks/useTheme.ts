import { useContext } from 'react';
import { THEME_MESSAGES } from '../app/constants/messages';
import { ThemeContext } from '../app/context/ThemeContext';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(THEME_MESSAGES.THEME_CONTEXT_ERROR);
  }
  return context;
};
