import React from 'react';
import { AuthProvider } from './auth';
import { ModalProvider } from './modal';
import { SymbolsProvider } from './symbols';

export type Props = {
  children?: React.ReactNode;
}

const AppProvider = ({children}: Props) => {
  return (
    <AuthProvider>
      <ModalProvider>
        <SymbolsProvider>
          {children}
        </SymbolsProvider>
      </ModalProvider>
    </AuthProvider>
  );
}

export default AppProvider;