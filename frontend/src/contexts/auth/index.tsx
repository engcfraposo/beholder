import { createContext, useCallback, useState, useContext, useEffect} from 'react';
import { Props } from '..';

import api from '../../api';
import { useError } from '../error';

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
  const { handleErrorAuth, handleErrorSettings } = useError();
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
      handleErrorAuth('');
      
      const response = await api.post('/sessions', {
        email,
        password,
      }).catch(err => {
        handleErrorAuth('Invalid credentials');
      })

      const { token } = response?.data.data;

      localStorage.setItem('@Beholder:token', token);
      // @ts-ignore
      api.defaults.headers.authorization = `Bearer ${token}`;
      setData({ token });
      setError('');
  }, []);

  const updateUser = useCallback(async (requestUser: User) => {
    handleErrorSettings('');
    
    const response = await api.put('/settings', requestUser);

    if(!response.data.data) {
      handleErrorSettings('Invalid data');
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
      handleErrorSettings('');
      api.get('/settings').then(response => {
        setUser(response.data.data.user);
      }).catch(err => {
        handleErrorSettings(err.response && err.response.data.data.error);
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