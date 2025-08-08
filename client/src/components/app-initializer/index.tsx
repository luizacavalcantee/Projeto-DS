'use client';

import { useEffect } from 'react';
import { setupAuthHeader } from '@/services/auth.services';

export default function AppInitializer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    setupAuthHeader();
  }, []);

  return <>{children}</>;
}
