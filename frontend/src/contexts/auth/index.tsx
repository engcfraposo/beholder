import { createContext, useCallback, useState, useContext, useEffect} from 'react';
import { Props } from '..';

import api from '../../api';

export interface User {
  email: string;
  password: string;
  apiUrl: string;
  accessKey: string;
  secretKey: string;
}

interface AuthState {
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  data: AuthState;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser({values}:any): void;
  error: string;
}



const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: Props) => {
  const [error, setError] = useState('');
  const [user, setUser] = useState<User>({} as User)
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Beholder:token');
    if (token) {
      // @ts-ignore
      api.defaults.headers.authorization = `Bearer ${token}`;
      return {token}
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

      const { token } = response.data.data;

      localStorage.setItem('@Beholder:token', token);
      // @ts-ignore
      api.defaults.headers.authorization = `Bearer ${token}`;

      const result = await api.get('/settings');
      console.log(result.data.data);

      setData({ token });
      setUser(result.data.data.user);
      setError('');
  }, []);

  const updateUser = useCallback(async (requestUser: User) => {
    setError('');
    
    const response = await api.put('/settings', requestUser);

    if(!response.data.data) {
      setError('Invalid data');
      return
    }

    setUser(response.data.data.user);
}, []);

  const signOut = useCallback(async () => {
    await api.post('/logout');
    localStorage.removeItem('@Beholder:token');

    setData({} as AuthState);
  }, []);

  useEffect(() => {
    if(data.token) {
      api.get('/settings').then(response => {
        setUser(response.data.data.user);
      })
    }
  },[data.token])

  return (
    <AuthContext.Provider
      value={{ user, data, signIn, signOut, updateUser, error }}
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