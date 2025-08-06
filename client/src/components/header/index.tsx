'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo, UserProfile } from '@/assets';
import { NewButton } from '@/components/ui/new-button';
import { useAuth } from '@/hooks/useAuth';
import { Menu } from 'lucide-react';

export default function Header() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  let userName: string = 'Ver meu perfil';
  let userImage: string | any = UserProfile;
  let profileLink: string = '/login';
  let navLinks = [
    { label: 'Início', href: '/' },
    { label: 'Desafios', href: '/challenges' },
    { label: 'Ranking', href: '/ranking' }
  ];

  if (isAuthenticated && user) {
    const routePrefix = user.type === 'ong' ? '/ong' : '/manager';

    navLinks = [
      { label: 'Início', href: '/' },
      { label: 'Desafios', href: `${routePrefix}/challenges` },
      { label: 'Ranking', href: `${routePrefix}/ranking` }
    ];

    if (user.type === 'ong') {
      userName = user.name;
      userImage = user.logoPhotoUrl;
      navLinks.push({
        label: 'Criar Desafio',
        href: '/ong/my-challenges/create-challenge'
      });
    } else {
      userName = user.fullName;
      userImage = user.schoolImageUrl;
    }

    profileLink = `${routePrefix}/profile`;
  }

  const handleLogin = () => router.push('/login');
  const handleLogout = () => logout();

  return (
    <>
      <header className="fixed z-50 w-full flex items-center bg-primary py-4 px-4 md:px-12 lg:px-16 text-white drop-shadow-lg">
        <div className="mr-auto">
          <Link href="/">
            <Image src={Logo} alt="Logo" className="h-12 w-auto" />
          </Link>
        </div>

        <button
          className="md:hidden ml-auto p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Abrir menu"
        >
          <Menu size={32} />
        </button>

        <nav className="hidden md:flex">
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

        <div className="hidden md:flex items-center">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link href={profileLink}>
                <NewButton
                  size={'sm'}
                  variant={'transparent'}
                  className="flex items-center"
                >
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

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary text-white gap-8 md:hidden">
          <nav>
            <ul className="flex flex-col items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={() => setIsMenuOpen(false)}>
                    <NewButton variant="transparent" size="lg">
                      {link.label}
                    </NewButton>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link href={profileLink} onClick={() => setIsMenuOpen(false)}>
                  <NewButton
                    size="lg"
                    variant="transparent"
                    className="flex items-center"
                  >
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
                <NewButton
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                  size="lg"
                >
                  Sair
                </NewButton>
              </>
            ) : (
              <NewButton
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogin();
                }}
                size="lg"
              >
                Entrar
              </NewButton>
            )}
          </div>

          <button
            className="absolute top-4 right-4 text-2xl font-bold"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Fechar menu"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
