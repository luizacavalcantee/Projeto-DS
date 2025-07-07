import { NewButton } from '@/components/ui/new-button';
import Image from 'next/image';
import { BoraImpactarWhite, Destaque, HeroBackgroung } from '@/assets';
import Link from 'next/link';
import { DualActionButtons } from '@/components/ui/dual-action-buttons';

export default function Hero() {
  return (
    // A classe foi adicionada aqui!
    <section className="relative w-full text-white h-[calc(100vh-80px)]">
      <div className='bg-[#373737]/55 h-full w-1/2 absolute blur-lg'></div>

      <Image
        src={HeroBackgroung}
        alt="Background image of children"
        fill
        className="object-cover object-top -z-10"
        priority
      />

      <div className="relative z-10 w-1/2 h-full flex flex-col justify-center pl-16">
        <div>
          <Image
            src={BoraImpactarWhite}
            alt="Bora Impactar Logo"
            className="h-auto w-auto mb-6"
          />
        </div>

        <h1 className="text-4xl font-bold leading-tight mb-4 pr-16">
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

        <p className="text-lg mb-8">
          Conectamos ONGs e empresas, voluntários e doadores que querem gerar
          impacto social real. Nossa plataforma facilita parcerias, promove
          projetos e fortalece quem já está transformando comunidades. <br />
          <span className="font-extrabold">
            Junte-se a essa rede e faça parte da mudança.
          </span>
        </p>

        <Link href="/login">
          <NewButton className="w-fit">Quero fazer parte!</NewButton>
        </Link>
      </div>
      <DualActionButtons
        left={{ text: 'Ver todos os desafios', href: '/challenges', variant: 'default' }}
        right={{ text: 'Ver meus desafios', href: '/manager/my-challenges', variant: 'white' }}
      />
    </section>
  );
}
