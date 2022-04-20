import { createContext, useCallback, useState, useContext, useEffect} from 'react';
import { Props } from '..';


interface ErrorContextData {
  errorAuth: string;
  handleErrorAuth: (error: string) => void;
  errorSettings: string;
  handleErrorSettings: (error: string) => void;
  errorSymbol: string;
  handleErrorSymbol: (error: string) => void;
  errorSyncSymbol: string;
  handleErrorSyncSymbol: (error: string) => void;
}

const ErrorContext = createContext<ErrorContextData>({} as ErrorContextData);

export const ErrorProvider = ({ children }: Props) => {
  const [ errorAuth, setErrorAuth ] = useState('');
  const [ errorSettings, setErrorSettings ] = useState('');
  const [ errorSymbol, setErrorSymbol ] = useState('');
  const [ errorSyncSymbol, setErrorSyncSymbol ] = useState('');

  const handleErrorAuth = useCallback((error: string) => {
    setErrorAuth(error);
  },[]);

  const handleErrorSettings = useCallback((error: string) => {
    setErrorSettings(error);
  },[]);

  const handleErrorSymbol = useCallback((error: string) => {
    setErrorSymbol(error);
  },[]);

  const handleErrorSyncSymbol = useCallback((error: string) => {
    setErrorSyncSymbol(error);
  },[]);

  return (
    <ErrorContext.Provider
      value={{ 
        errorAuth,
        handleErrorAuth,
        errorSettings,
        handleErrorSettings,
        errorSymbol,
        handleErrorSymbol,
        errorSyncSymbol,
        handleErrorSyncSymbol,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
};

export function useError(): ErrorContextData {
  const context = useContext(ErrorContext);

  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }

  return context;
}