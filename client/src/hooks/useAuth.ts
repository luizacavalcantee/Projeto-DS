'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logout as logoutService } from '@/services/auth.services';
import { OngData } from '@/services/ong.services';
import { SchoolManagerData } from '@/services/schoolManager.services';

// Um tipo unificado para o usuário, incluindo o 'type' que vamos determinar
type AuthenticatedUser = (OngData | SchoolManagerData) & { type: 'ong' | 'manager' };

/**
 * Hook customizado para gerenciar o estado de autenticação do usuário.
 * Lê os dados do usuário do localStorage e fornece informações e ações
 * para os componentes da UI.
 */
export function useAuth() {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Inicia como true para checar o estado inicial
  const router = useRouter();

  useEffect(() => {
    // Função para verificar o estado de login no localStorage
    const checkAuthState = () => {
      try {
        const userJson = localStorage.getItem('user');
        const token = localStorage.getItem('accessToken');

        if (userJson && token) {
          const parsedUser = JSON.parse(userJson);
          // Determina o tipo do usuário verificando uma propriedade única (ex: inepCode)
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
