import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { theme } from '../styles/theme';
import { AuthProvider } from './AuthContext';
import { TaskProvider } from './TaskContext';

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => (
  <TaskProvider>
    <AuthProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </AuthProvider>
  </TaskProvider>
);
