import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api.js';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const response = await api.get('/auth/me');
        setUser(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = () => {
    // Redirect to Google Auth endpoint
    const authUrl = `${api.defaults.baseURL}/auth/google`;
    console.log('Redirecting to:', authUrl);
    window.location.href = authUrl;
  };

  const loginWithEmail = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      setUser(response.data.user);
      setIsAuthenticated(true);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Call the logout endpoint
      await api.post('/auth/logout');
      
      // Clear local storage
      localStorage.removeItem('token');
      
      // Clear auth state
      setUser(null);
      setIsAuthenticated(false);
      
      // Clear any other auth-related data
      setLoading(false);
    } catch (error) {
      console.error('Logout error:', error);
      // Even if the server request fails, we should still clear local state
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    login,
    loginWithEmail,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 