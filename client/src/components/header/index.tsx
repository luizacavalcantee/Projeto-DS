'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo, UserProfile } from '@/assets';
import { NewButton } from '@/components/ui/new-button';
import { useAuth } from '@/hooks/useAuth';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

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

  const handleLinkClick = (action?: () => void) => {
    if (action) action();
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed z-30 w-full flex items-center bg-primary gap-8 py-4 px-4 md:px-12 lg:px-16 text-white drop-shadow-lg">
        <div className="mr-auto">
          <Link href="/">
            <Image src={Logo} alt="Logo" className="h-12 w-auto" />
          </Link>
        </div>

        <nav className="hidden lg:flex">
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

        <div className="items-center hidden md:flex">
          {isAuthenticated ? (
            <div className="flex items-center gap-8">
              <Link href={profileLink}>
                <NewButton size={'sm'} variant={'transparent'} className="flex items-center p-0">
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
              <NewButton onClick={handleLogout} size={'sm'} className="min-w-24">
                Sair
              </NewButton>
            </div>
          ) : (
            <NewButton onClick={handleLogin} size={'sm'} className="ml-7">
              Entrar
            </NewButton>
          )}
        </div>

        <button className="lg:hidden ml-auto md:ml-0 p-2" onClick={() => setIsMenuOpen(true)} aria-label="Abrir menu">
          <Menu size={32} />
        </button>
      </header>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      <div
        className={`
          fixed top-0 right-0 h-full w-4/5 max-w-sm bg-primary text-white z-50
          transform transition-transform ease-in-out duration-300
          flex flex-col
          lg:hidden
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={() => setIsMenuOpen(false)} aria-label="Fechar menu">
            <X size={32} />
          </button>
        </div>

        <div className="flex flex-col justify-between flex-grow p-6">
          <div className="w-full">
            {isAuthenticated && (
              <Link href={profileLink} onClick={() => handleLinkClick()}>
                <div className="flex flex-col items-center text-center mb-8">
                  <Image
                    src={userImage || UserProfile}
                    alt={userName || 'Perfil'}
                    className="h-20 w-20 rounded-full object-cover border-2 border-white"
                    width={80}
                    height={80}
                  />
                  <span className="mt-3 font-semibold text-lg">{userName}</span>
                </div>
              </Link>
            )}
            <nav className="w-full">
              <ul className="flex flex-col items-center space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href} className="w-full">
                    <Link href={link.href} onClick={() => handleLinkClick()}>
                      <span className="block w-full text-center text-lg p-3 rounded-md hover:bg-white/10 transition-colors">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="w-full flex flex-col items-center space-y-4 mt-6">
            {isAuthenticated ? (
              <NewButton onClick={() => handleLinkClick(handleLogout)} size={'lg'} className="w-full max-w-xs">
                Sair
              </NewButton>
            ) : (
              <NewButton onClick={() => handleLinkClick(handleLogin)} size={'lg'} className="w-full max-w-xs">
                Entrar
              </NewButton>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
