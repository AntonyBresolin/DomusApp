// User types
export interface User {
  id: string;
  username: string;
  email: string;
  name?: string;
  phone?: string;
  cpf?: string;
  userType?: 'proprietario' | 'inquilino';
  roles?: string[];
}

// Auth types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  name?: string;
  phone?: string;
  cpf?: string;
  userType?: 'proprietario' | 'inquilino';
}

export interface AuthResponse {
  isAuthenticated: boolean;
  user?: User;
  username?: string;
  roles?: string[];
  message?: string;
}

// Auth state for context (não armazena token, apenas estado)
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

// Form types
export interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone: string;
  cpf: string;
}

// Modal types
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Auth Context types (modificado para não usar token)
export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

// Route types
export interface PrivateRouteProps {
  element: React.ComponentType<Record<string, unknown>>;
  [key: string]: unknown;
}

// Event types
export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type FormSubmitEvent = React.FormEvent<HTMLFormElement>;
export type ButtonClickEvent = React.MouseEvent<HTMLButtonElement>;
