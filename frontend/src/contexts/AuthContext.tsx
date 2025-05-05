// AuthContext.tsx
import axios from 'axios';
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
  loading: boolean;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Cek token di localStorage saat aplikasi dimuat pertama kali
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);  // Jika token ada, set status autentikasi ke true
    }
  }, []); // Effect ini hanya dijalankan sekali saat komponen pertama kali dimuat

  const login = async (email: string, password: string, recaptchaToken?: string) => {
    // Integrate recaptchaToken into the login logic if necessary
    console.log("6LdS5PkqAAAAADaRJHikF9N02JBEcHXWcABZ5Kfj:", recaptchaToken);
    setLoading(true);
    try {
      // Proses login dengan API dan simpan token di localStorage
      const response = await axios.post('/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('authToken', token);  // Simpan token di localStorage
      setIsAuthenticated(true);
      setLoading(false);
    } catch (err) {
      setError("Login failed");
      setLoading(false);
      throw err;  // Agar error bisa ditangani oleh komponen login
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');  // Hapus token dari localStorage saat logout
    setIsAuthenticated(false);  // Set status autentikasi ke false
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, error, loading, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};
