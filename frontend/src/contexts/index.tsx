import React from 'react';
import { AuthProvider } from './auth';
import { BalancesProvider } from './balances';
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
          <BalancesProvider>
            {children}
          </BalancesProvider>
        </SymbolsProvider>
      </ModalProvider>
    </AuthProvider>
    </ErrorProvider>
  );
}

export default AppProvider;