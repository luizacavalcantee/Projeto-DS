'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo, UserProfile } from '@/assets';
import { NewButton } from '@/components/ui/new-button';
import { useAuth } from '@/hooks/useAuth';

export default function Header() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();

  if (loading) {
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

  // 1. Valores padrão para quando o usuário não está logado
  let userName: string = 'Ver meu perfil';
  let userImage: string | any = UserProfile;
  let profileLink: string = '/login';
  let navLinks = [
    { label: 'Início', href: '/' },
    { label: 'Desafios', href: '/challenges' },
    { label: 'Ranking', href: '/ranking' },
  ];

  if (isAuthenticated && user) {
    const routePrefix = user.type === 'ong' ? '/ong' : '/manager';

    navLinks = [
      { label: 'Início', href: '/' },
      { label: 'Desafios', href: `${routePrefix}/challenges` },
      { label: 'Ranking', href: `${routePrefix}/ranking` },
    ];
    
    if (user.type === 'ong') {
      userName = user.name;
      userImage = user.logoPhotoUrl;
      navLinks.push({ label: 'Criar Desafio', href: '/ong/my-challenges/create-challenge' });
    } else {
      userName = user.fullName;
      userImage = user.schoolImageUrl;
    }

    profileLink = `${routePrefix}/profile`;
  }

  const handleLogin = () => router.push('/login');
  const handleLogout = () => logout();

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
                  src={userImage || UserProfile}
                  alt={userName || 'Perfil'}
                  className="h-10 w-10 mr-3 rounded-full object-cover"
                  width={40}
                  height={40}
                />
                {userName}
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