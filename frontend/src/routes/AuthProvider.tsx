import React, { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { AuthContextType, User, LoginCredentials } from "../types";
import { AuthService } from "../services/AuthService";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkAuth = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await AuthService.checkAuthStatus();

      if (response.isAuthenticated) {
        setIsAuthenticated(true);
        const userData = response.user || {
          id: response.username || "",
          username: response.username || "",
          email: response.username || "",
          roles: response.roles || [],
        };

        setUser(userData);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("❌ Erro ao verificar autenticação:", error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      const response = await AuthService.login(credentials);
      if (response.isAuthenticated) {
        setIsAuthenticated(true);

        const userData = response.user || {
          id: response.username || "",
          username: response.username || "",
          email: response.username || "",
          roles: response.roles || [],
        };

        setUser(userData);
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("❌ Erro no login:", error);
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const contextValue: AuthContextType = {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
