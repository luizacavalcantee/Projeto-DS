// src/components/header.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { Logo, UserProfile } from '@/assets';
import Link from 'next/link';
import { NewButton } from '@/components/ui/new-button';
// Importe o TIPO Session e as funções do next-auth
import { useSession, signIn, signOut, Session } from 'next-auth/react'; 

// Defina a propriedade opcional 'session'
export default function Header({ session: serverSession }: { session?: Session | null }) {
  // O hook useSession continua sendo importante para reatividade no lado do cliente
  const { data: clientSession, status } = useSession();

  // Dê prioridade à sessão vinda do servidor (para a carga inicial),
  // mas use a do cliente se ela existir (para atualizações após login/logout).
  const session = serverSession ?? clientSession;
  const isAuthenticated = !!session;

  const handleLogin = () => signIn();
  const handleLogout = () => signOut({ callbackUrl: '/' });

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

      <div>
        {status === 'loading' && !serverSession ? (
          // Mostra o loading SÓ se não tivermos uma sessão do servidor
          <div className="h-10 w-36 bg-gray-400 animate-pulse rounded-md"></div>
        ) : isAuthenticated ? (
          <div className="flex items-center gap-4">
            <Link href="/profile"> {/* Garanta que a rota /profile exista ou aponte para a correta */}
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
            <NewButton onClick={handleLogout} size={'sm'} variant={'destructive'}>
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