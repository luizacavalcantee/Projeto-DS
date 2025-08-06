'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo, UserProfile } from '@/assets';
import { NewButton } from '@/components/ui/new-button';
import { useAuth } from '@/hooks/useAuth';
import { Menu, X } from 'lucide-react'; // Ícone X adicionado

export default function Header() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // O bloco de carregamento permanece o mesmo
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

  // A lógica para definir as variáveis permanece a mesma
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
    if (action) {
      action();
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed z-50 w-full flex items-center bg-primary gap-8 py-4 px-4 md:px-12 lg:px-16 text-white drop-shadow-lg">
      <div className="mr-auto">
        <Link href="/">
          <Image src={Logo} alt="Logo" className="h-12 w-auto" />
        </Link>
      </div>

      {/* Navegação para telas maiores */}
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

      {/* Seção do usuário para telas médias e maiores */}
      <div className="items-center hidden md:flex">
        {isAuthenticated ? (
          <div className="flex items-center gap-8">
            <Link href={profileLink}>
              <NewButton
                size={'sm'}
                variant={'transparent'}
                className="flex items-center p-0"
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

      {/* Botão Hamburger para abrir o menu em telas menores */}
      <button
        className="lg:hidden ml-auto md:ml-0 p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Abrir menu"
      >
        <Menu size={32} />
      </button>

      {/* --- Início do Componente de Menu Móvel --- */}
      {isMenuOpen && (
        <div>
        </div>
      )}
      {/* --- Fim do Componente de Menu Móvel --- */}
    </header>
  );
}
