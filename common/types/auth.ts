export interface User {
  id: string;
  name: string;
  email: string;
  role: string; 
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  adminSecretKey?: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface AuthContextType {
  user: User | null;
  access_token: string | null;
  isLoading: boolean;
  login: (access_token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
}
