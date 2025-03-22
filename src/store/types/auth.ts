import { User } from '@/types/user';

type AuthStateStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginSuccessResponse {
  user: User;
  message: string;
}

export interface LoginFailureResponse {
  error: string;
  message: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  data: Partial<User>;
  status: AuthStateStatus;
  userInfo: User;
}
