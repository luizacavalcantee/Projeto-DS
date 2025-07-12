'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo, UserProfile } from '@/assets';
import { NewButton } from '@/components/ui/new-button';

// 1. Importa o nosso hook customizado
import { useAuth } from '@/hooks/useAuth';

export default function Header() {
  // 2. Usa o nosso hook para obter o estado de autenticação
  const { user, isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();

  // Exibe um loader enquanto o hook verifica o localStorage
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
  
  // 3. Determina as variáveis com base no nosso objeto 'user'
  const isOng = user?.type === 'ong';

  const navLinks = [
    { label: 'Início', href: '/' },
    { label: 'Desafios', href: isOng ? '/ong/challenges' : '/challenges' },
    { label: 'Ranking', href: isOng ? '/ong/ranking' : '/ranking' },
  ];

  if (isAuthenticated && isOng) {
    navLinks.push({ label: 'Criar Desafio', href: '/ong/my-challenges/create' });
  }

  const profileLink = isOng ? '/ong/profile' : '/manager/profile'; // Ajuste para a rota de perfil do gestor

  // 4. Define as funções de login e logout para usar nosso sistema
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

      <div className="flex items-center"> {/* Adicionado ml-auto para empurrar para a direita */}
        {isAuthenticated && user ? (
          <div className="flex items-center gap-4">
            <Link href={profileLink}>
              <NewButton size={'sm'} variant={'transparent'} className="flex items-center">
                <Image
                  // 5. Usa os dados do nosso objeto 'user'
                  src={UserProfile}
                  alt={'Perfil'}
                  className="h-10 w-10 mr-3 rounded-full object-cover" // Adicionado object-cover
                  width={40}
                  height={40}
                />
                {user.name || user.fullName || 'Ver meu perfil'}
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
