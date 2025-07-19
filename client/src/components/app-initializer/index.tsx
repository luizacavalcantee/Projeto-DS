'use client';

import { useEffect } from 'react';
import { setupAuthHeader } from '@/services/auth.services';

export default function AppInitializer({ children }: { children: React.ReactNode }) {
  // useEffect para configurar o token do Axios quando a aplicação carregar
  useEffect(() => {
    setupAuthHeader();
  }, []);

  // Este componente apenas executa o efeito e renderiza os filhos que recebe.
  return <>{children}</>;
}
