"use client";

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode'; // Precisaremos instalar esta biblioteca

// Definindo os tipos para o nosso contexto
interface AuthContextType {
  token: string | null;
  user: { id: number; email: string } | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

// Criando o contexto com um valor padrão
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Criando o Provedor do Contexto
export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: number; email: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Começa como true para verificar o token
  const router = useRouter();

  useEffect(() => {
    // Esta função roda uma vez quando o app carrega
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      try {
        const decodedUser: { id: number; email: string } = jwtDecode(storedToken);
        setUser(decodedUser);
        setToken(storedToken);
      } catch (error) {
        // Se o token for inválido, limpa
        localStorage.removeItem('authToken');
      }
    }
    setIsLoading(false); // Verificação inicial concluída
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem('authToken', newToken);
    try {
      const decodedUser: { id: number; email: string } = jwtDecode(newToken);
      setUser(decodedUser);
      setToken(newToken);
      router.push('/dashboard'); // Redireciona após o login
    } catch (error) {
      console.error("Token inválido recebido no login", error);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setToken(null);
    router.push('/login');
  };

  const value = { token, user, isLoading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Criando um hook customizado para facilitar o uso do contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}