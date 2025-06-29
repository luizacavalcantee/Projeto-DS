'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Logo, UserProfile } from '@/assets';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NewButton } from '@/components/ui/new-button';

export default function Header() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    router.push('/login');
  };

  const handleViewProfile = () => {
    router.push('/profile');
  };

  return (
    <header className="fixed z-50 w-full flex items-center bg-primary py-4 px-10 text-white drop-shadow-lg">
      <div className="mr-auto">
        <Link href="/">
          <Image src={Logo} alt="Logo" className="h-12" />
        </Link>
      </div>

      <nav>
        <ul className="flex justify-between">
          <li>
            <Link href="/">
              <NewButton variant={'transparent'} size={'sm'}>
                Início
              </NewButton>
            </Link>
          </li>
          <li>
            <Link href="/challenges">
              <NewButton variant={'transparent'} size={'sm'}>
                Desafios
              </NewButton>
            </Link>
          </li>
          <li>
            <Link href="/ranking">
              <NewButton variant={'transparent'} size={'sm'}>
                Ranking
              </NewButton>
            </Link>
          </li>
        </ul>
      </nav>

      {isAuthenticated ? (
        <NewButton
          onClick={handleViewProfile}
          size={'sm'}
          variant={'transparent'}
          className="flex items-center ml-5"
        >
          <Image src={UserProfile} alt="Perfil" className="h-10 w-10 mr-3" />
          Ver meu perfil
        </NewButton>
      ) : (
        <NewButton onClick={handleLogin} size={'sm'} className="ml-7">
          Entrar
        </NewButton>
      )}
    </header>
  );
}
