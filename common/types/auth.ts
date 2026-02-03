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

export interface LoginScreenProps {}

export interface FormState {
  loading: boolean;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  adminSecretKey?: string;
}

export interface IAuthAPI {
  login(data: LoginData): Promise<AuthResponse>;
  signup(data: SignupData): Promise<AuthResponse>;
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
