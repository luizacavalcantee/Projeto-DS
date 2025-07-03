'use client';

import React from 'react';
import Image from 'next/image';
import { Logo, UserProfile } from '@/assets';
import Link from 'next/link';
import { NewButton } from '@/components/ui/new-button';

import { useSession, signIn, signOut } from 'next-auth/react'; 

export default function Header() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  console.log(isAuthenticated, session);

  if (status === 'loading') {
    return (
        <header className="fixed z-50 w-full flex items-center bg-primary py-4 px-10 text-white drop-shadow-lg">
            <div className="mr-auto">
                <Link href="/">
                    <Image src={Logo} alt="Logo" className="h-12 w-auto" />
                </Link>
            </div>
            <div className="ml-auto h-10 w-48 bg-gray-300/20 animate-pulse rounded-md"></div>
        </header>
    );
  }
  
  const isOng = session?.user?.role === 'ong';

  const navLinks = [
    { label: 'Início', href: '/' },
    { label: 'Desafios', href: isOng ? '/ong/challenges' : '/challenges' },
    { label: 'Ranking', href: isOng ? '/ong/ranking' : '/ranking' },
  ];

  if (isOng) {
    navLinks.push({ label: 'Criar Desafio', href: '/ong/my-challenges/create' });
  }

  const profileLink = isOng ? '/ong/profile' : '/profile';

  const handleLogin = () => signIn();
  const handleLogout = () => signOut({ callbackUrl: '/' });

  return (
    <header className="fixed z-50 w-full flex items-center bg-primary py-4 px-10 text-white drop-shadow-lg">
      <div className="mr-auto">
        <Link href="/">
          <Image src={Logo} alt="Logo" className="h-12 w-auto" />
        </Link>
      </div>

      <nav>
        <ul className="flex items-center space-x-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>
                <NewButton variant={'transparent'} size={'sm'}>
                  {link.label}
                </NewButton>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center">
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <Link href={profileLink}>
              <NewButton size={'sm'} variant={'transparent'} className="flex items-center">
                <Image
                  src={session.user?.image || UserProfile}
                  alt={session.user?.name || 'Perfil'}
                  className="h-10 w-10 mr-3 rounded-full"
                  width={40}
                  height={40}
                />
                {session.user?.name || 'Ver meu perfil'}
              </NewButton>
            </Link>
            <NewButton onClick={handleLogout} size={'sm'} className="min-w-0">
              Sair
            </NewButton>
          </div>
        ) : (
          <NewButton onClick={handleLogin} size={'sm'} className="ml-7">
            Entrar
          </NewButton>
        )}
      </div>
    </header>
  );
}