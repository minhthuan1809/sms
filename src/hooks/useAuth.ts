import { useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/constants';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const loginStatus = localStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN);
      setIsLoggedIn(loginStatus === 'true');
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (username: string, password: string) => {
    // In real app, this would be an API call
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true');
      setIsLoggedIn(true);
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.IS_LOGGED_IN);
    localStorage.removeItem(STORAGE_KEYS.USER_INFO);
    setIsLoggedIn(false);
  };

  return {
    isLoggedIn,
    loading,
    login,
    logout,
  };
}; 