import { useState, useEffect } from 'react';
import { AuthContext } from './contexts/AuthContext';
import { API_URL } from './config/api';

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/verify`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setIsAuth(true);
        setAdmin(data.admin);
      } else {
        setIsAuth(false);
        setAdmin(null);
      }
    } catch (error) {
      // On ne log l'erreur que si ce n'est pas une erreur 401
      if (error.response?.status !== 401) {
        console.error('Erreur de vérification:', error);
      }
      setIsAuth(false);
      setAdmin(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_URL}/api/admin/logout`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      setIsAuth(false);
      setAdmin(null);
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
    }
  };

  if (isLoading) {
    return null; // ou un composant de chargement
  }

  return (
    <AuthContext.Provider value={{ isAuth, admin, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
