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
    // Redirect to Google Auth endpoint using relative URL
    const authUrl = '/auth/google';
    console.log('Redirecting to Google auth:', authUrl);
    
    // Store the current URL to redirect back after login
    const currentPath = window.location.pathname;
    if (currentPath !== '/login') {
      sessionStorage.setItem('redirectAfterLogin', currentPath);
    }
    
    window.location.href = authUrl;
  };

  const loginWithEmail = async (email, password) => {
    try {
      console.log('Attempting email login for:', email);
      const response = await api.post('/auth/login', { email, password });
      console.log('Login successful:', response.data);
      
      setUser(response.data.user);
      setIsAuthenticated(true);
      
      // Redirect to stored path or dashboard
      const redirectPath = sessionStorage.getItem('redirectAfterLogin') || '/dashboard';
      sessionStorage.removeItem('redirectAfterLogin');
      window.location.href = redirectPath;
      
      return response.data;
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log('Attempting logout');
      await api.post('/auth/logout');
      console.log('Logout successful');
      
      // Clear all auth-related data
      localStorage.removeItem('token');
      sessionStorage.clear();
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
      
      // Redirect to home page
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      // Even if the server request fails, clear local state
      localStorage.removeItem('token');
      sessionStorage.clear();
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
      window.location.href = '/';
    }
  };

  const register = async ({ firstName, lastName, email, password }) => {
    try {
      const response = await api.post('/auth/register', { firstName, lastName, email, password });
      setUser(response.data.user);
      setIsAuthenticated(true);
      return response.data;
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    loginWithEmail,
    logout,
    isAuthenticated,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 