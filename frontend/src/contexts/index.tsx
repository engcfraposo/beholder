import React from 'react';
import { AuthProvider } from './auth';

export type Props = {
  children?: React.ReactNode;
}

const AppProvider = ({children}: Props) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}

export default AppProvider;