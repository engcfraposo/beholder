import React from 'react';
import { AuthProvider } from './auth';
import { ErrorProvider } from './error';
import { ModalProvider } from './modal';
import { SymbolsProvider } from './symbols';

export type Props = {
  children?: React.ReactNode;
}

const AppProvider = ({children}: Props) => {
  return (
    <ErrorProvider>
    <AuthProvider>
      <ModalProvider>
        <SymbolsProvider>
          {children}
        </SymbolsProvider>
      </ModalProvider>
    </AuthProvider>
    </ErrorProvider>
  );
}

export default AppProvider;