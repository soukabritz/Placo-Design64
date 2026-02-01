"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const AuthContext = createContext({
  isAuth: false,
  admin: null,
  isLoading: true,
  checkAuth: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/verify", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
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
      console.error("Erreur de vérification auth:", error);
      setIsAuth(false);
      setAdmin(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const logout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      setIsAuth(false);
      setAdmin(null);
    } catch (error) {
      console.error("Erreur de déconnexion:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuth, admin, isLoading, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};
