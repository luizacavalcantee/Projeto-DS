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
  
  // --- CORREÇÃO PRINCIPAL: DEFININDO O PREFIXO DA ROTA ---
  // Se o usuário estiver autenticado, o prefixo será '/ong' ou '/manager'.
  // Se não, será uma string vazia, levando às páginas públicas.
  const routePrefix = isAuthenticated ? (user.type === 'ong' ? '/ong' : '/manager') : '';

  const navLinks = [
    { label: 'Início', href: '/' }, // A página inicial é sempre a mesma
    { label: 'Desafios', href: `${routePrefix}/challenges` },
    { label: 'Ranking', href: `${routePrefix}/ranking` },
  ];

  // Adiciona o link "Criar Desafio" apenas se for uma ONG autenticada
  if (isAuthenticated && user?.type === 'ong') {
    navLinks.push({ label: 'Criar Desafio', href: '/ong/my-challenges/create-challenge' });
  }

  // Define o link de perfil dinamicamente
  const profileLink = `${routePrefix}/profile`;

  const handleLogin = () => router.push('/login');
  const handleLogout = () => logout();

  // Variáveis seguras para nome e imagem, evitando erros de tipo
  const userName = user ? (user.type === 'ong' ? user.name : user.fullName) : 'Ver meu perfil';
  const userImage = user ? (user.type === 'ong' ? user.logoPhotoUrl : user.schoolImageUrl) : UserProfile;

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
        {isAuthenticated && user ? (
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
