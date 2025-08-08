import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

import { NewButton } from '@/components/ui/new-button';
import { BoraImpactarDark, BoraImpactarWhite, Destaque, HeroBackgroung } from '@/assets';

interface ActionButtonProps {
  text: string;
  href: string;
  variant?: 'default' | 'white';
}

interface DualActionButtonsProps {
  left: ActionButtonProps;
  right: ActionButtonProps;
  className?: string;
}

const DualActionButtons: React.FC<DualActionButtonsProps> = ({ left, right, className }) => (
  <div className={`flex flex-col md:flex-row gap-4 ${className || ''}`}>
    <Link href={left.href}>
      <NewButton className="w-fit px-10 py-3" variant={left.variant || 'default'}>{left.text}</NewButton>
    </Link>
    <Link href={right.href}>
      <NewButton className="w-fit px-10 py-3" variant={right.variant || 'white'}>{right.text}</NewButton>
    </Link>
  </div>
);

interface HeroProps {
  showButtons?: boolean;
  leftButton?: string; 
  rightButton?: string;
}

export default function Hero({ showButtons = false, leftButton, rightButton }: HeroProps) {
  return (
    <section className="relative w-full text-white h-[calc(80vh-80px)] md:h-[calc(100vh-80px)] bg-primary md:bg-transparent">
      <div className='md:bg-[#373737]/55 bg-transparent h-full w-full md:w-2/3 lg:w-1/2 absolute blur-lg'></div>
      <Image
        src={HeroBackgroung}
        alt="Background image of children"
        fill
        className="object-cover object-top -z-10"
        priority
      />
      <div className="relative z-10 w-full md:w-2/3 lg:w-1/2 h-full flex flex-col justify-center pr-4 md:pr-0 pl-4 md:pl-12 lg:pl-16">
        <div>
          <Image
            src={BoraImpactarWhite}
            alt="Bora Impactar Logo"
            className="hidden md:block h-auto w-auto mb-6"
          />
          <Image
            src={BoraImpactarDark}
            alt="Bora Impactar Logo"
            className="md:hidden h-auto w-auto mb-6"
          />
        </div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4 pr-16">
          Conectamos quem quer ajudar com quem faz{' '}
          <span className="relative inline-block px-3">
            <span className="relative z-50">a diferença.</span>
            <Image
              src={Destaque}
              alt="Highlight underline"
              width={160}
              height={10}
              className="absolute bottom-[-5px] left-0 w-full h-auto"
            />
          </span>
        </h1>
        <p className="text-base md:text-lg mb-8">
          Conectamos ONGs e empresas, voluntários e doadores que querem gerar
          impacto social real. Nossa plataforma facilita parcerias, promove
          projetos e fortalece quem já está transformando comunidades. <br />
          <span className="font-extrabold">
            Junte-se a essa rede e faça parte da mudança.
          </span>
        </p>

        {showButtons && leftButton && rightButton ? (
          <DualActionButtons
            left={{
              text: 'Ver todos os desafios',
              href: leftButton, 
              variant: 'default'
            }}
            right={{
              text: 'Ver meus desafios',
              href: rightButton, 
              variant: 'white'
            }}
            className="mt-2"
          />
        ) : (
          <Link href="/login">
            <NewButton className="w-fit">Quero fazer parte!</NewButton>
          </Link>
        )}
      </div>
    </section>
  );
}