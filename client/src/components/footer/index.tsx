'use client';

import { Logo } from '@/assets';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  // 1. Usamos o hook de autenticação para obter o status e tipo do usuário
  const { user, isAuthenticated } = useAuth();

  // 2. Definimos os links de navegação com a mesma lógica do Header
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
    // Adiciona o link de "Criar Desafio" apenas para ONGs
    if (user.type === 'ong') {
      navLinks.push({ label: 'Criar Desafio', href: '/ong/my-challenges/create-challenge' });
    }
  }

  // Link dinâmico para a página de perfil ou login
  const profileLink = isAuthenticated && user 
    ? (user.type === 'ong' ? '/ong/profile' : '/manager/profile') 
    : '/login';
  const profileLabel = isAuthenticated ? 'Meu Perfil' : 'Entrar';

  return (
    <footer className="bg-primary text-white px-4 md:px-12 lg:px-16">
      <div className="mx-auto max-w-screen-xl py-12 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coluna da Logo e Slogan */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" aria-label="Página Inicial">
              <Image src={Logo} alt="Logo Bora Impactar" className="h-14 w-auto" />
            </Link>
            <p className="mt-4 text-center text-lg font-bold md:text-left">
              Bora Impactar
            </p>
            <p className="mt-1 text-center text-white/80 md:text-left">
              A união que transforma vidas.
            </p>
          </div>

          {/* Colunas de links */}
          <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-2 md:col-span-2 md:grid-cols-2 md:text-left lg:grid-cols-3 md:ml-6 lg:ml-0">
            {/* Coluna de Navegação Principal */}
            <div>
              <p className="font-bold">Navegação</p>
              <ul className="mt-4 space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:opacity-75 transition">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coluna de Conta */}
            <div>
              <p className="font-bold">Sua Conta</p>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href={profileLink} className="hover:opacity-75 transition">
                    {profileLabel}
                  </Link>
                </li>
                {/* Você pode adicionar mais links aqui, como "Configurações" */}
              </ul>
            </div>
          </div>
        </div>

        {/* Linha de Copyright */}
        <div className="mt-4 md:mt-10 lg:mt-12 border-t border-white/20 pt-8">
          <p className="text-center text-sm text-white/80">
            &copy; {new Date().getFullYear()} Bora Impactar. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}