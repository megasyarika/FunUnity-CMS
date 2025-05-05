import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import authService from '../services/authService';

interface User {
  id?: number;
  email?: string;
  name?: string;
  [key: string]: any;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const hasValidToken = await authService.verifyToken();
        if (hasValidToken) {
          const userData = authService.getCurrentUser();
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          authService.logout();
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (err) {
        setError('Authentication initialization failed');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(email, password);
      setUser(response.user);
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const clearError = () => setError(null);

  const value = {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
