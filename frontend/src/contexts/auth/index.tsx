import { createContext, useCallback, useState, useContext} from 'react';
import { Props } from '..';

import api from '../../api';

export interface User {
  id: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  error: string;
}



const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: Props) => {
  const [error, setError] = useState('');
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Beholder:token');
    const user = localStorage.getItem('@Beholder:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
      setError('');
      
      const response = await api.post('/sessions', {
        email,
        password,
      });

      if(!response.data.data) {
        setError('Invalid credentials');
        return
      }

      const { token, user } = response.data.data;

      localStorage.setItem('@Beholder:token', token);
      localStorage.setItem('@Beholder:user', JSON.stringify(user));

      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({ token, user });
      setError('');
  }, []);

  const signOut = useCallback(async () => {
    await api.post('/logout');
    localStorage.removeItem('@Beholder:token');
    localStorage.removeItem('@Beholder:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}