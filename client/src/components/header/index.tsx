"use client";

import React from 'react';
import Image from 'next/image';
import { Logo } from '@/assets';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function Header() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };
  return (
    <header className="fixed w-full flex items-center bg-primary py-4 px-10 text-white drop-shadow-lg">
      <div className="mr-auto">
        <Image src={Logo} alt="Logo" className="h-12" />
      </div>

      <nav className="mr-7">
        <ul className="flex justify-between">
          <li>
            <Button variant={'transparent'} size={'sm'}>Início</Button>
          </li>
          <li>
            <Button variant={'transparent'} size={'sm'}>Desafios</Button>
          </li>
          <li>
            <Button variant={'transparent'} size={'sm'}>Ranking</Button>
          </li>
        </ul>
      </nav>

      <Button onClick={handleLogin} size={'sm'}>Entrar</Button>
    </header>
  );
}
