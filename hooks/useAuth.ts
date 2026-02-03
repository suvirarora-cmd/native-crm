import { useContext } from 'react';
import { AUTH_MESSAGES } from '../app/constants/messages';
import { AuthContext } from './context/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(AUTH_MESSAGES.ERRORS.AUTH_CONTEXT_ERROR);
  }
  return context;
};
