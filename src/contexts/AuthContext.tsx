import jwtDecode from 'jwt-decode';
import React, {
 createContext, ReactText, useCallback, useContext, useState,
} from 'react';
import { api } from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthState {
  accessToken: string;
  user: User;
}

interface AuthContextData {
  user: User;
  accessToken: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

type User = {
  id: string;
  email: string;
  name: string;
};

interface DecodedToken {
  sub: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const accessToken = localStorage.getItem('@Doit:accessToken');
    const user = localStorage.getItem('@Doit:user');

    if (accessToken && user) {
      return { accessToken, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post<AuthState>('/login', {
      email,
      password,
    });

    const { accessToken } = response.data;

    const { sub } = jwtDecode<DecodedToken>(accessToken);

    const userResponse = await api.get(`/users/${sub}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    localStorage.setItem('@Doit:accessToken', accessToken);
    localStorage.setItem('@Doit:user', JSON.stringify(userResponse.data));

    setData({ accessToken, user: userResponse.data });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Doit:accessToken');
    localStorage.removeItem('@Doit:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
        accessToken: data.accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
