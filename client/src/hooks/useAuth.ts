'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logout as logoutService } from '@/services/auth.services';
import { AuthenticatedUser } from '@/services/auth.services';

export function useAuth() {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthState = () => {
      try {
        const userJson = localStorage.getItem('user');
        const token = localStorage.getItem('accessToken');

        if (userJson && token) {
          const parsedUser = JSON.parse(userJson);
          const userType = 'inepCode' in parsedUser ? 'manager' : 'ong';
          
          setUser({ ...parsedUser, type: userType });
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Falha ao ler dados de autenticação do localStorage", error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthState();

    // Adiciona um listener para sincronizar o estado entre abas diferentes
    window.addEventListener('storage', checkAuthState);

    // Limpa o listener quando o componente é desmontado
    return () => {
      window.removeEventListener('storage', checkAuthState);
    };
  }, []);

  const logout = async () => {
    await logoutService();
    setUser(null);
    setIsAuthenticated(false);
    router.push('/'); // Redireciona para a home após o logout
  };

  return { user, isAuthenticated, loading, logout };
}
