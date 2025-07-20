import Image from 'next/image';
import { Grid1, Grid2, Grid3, Underline } from '@/assets';

export default function ImpactSection() {
  return (
    <section className="flex items-center justify-center gap-20 mx-20">
      <div className="w-2/5 flex gap-8">
        <div className="w-full flex flex-col gap-8">
            <Image
              src={Grid2}
              alt={'Criança sorrindo durante atividade de pintura'}
              className="h-52 object-cover rounded-3xl shadow-md"
            />
            <Image
              src={Grid1}
              alt={'Criança sorrindo durante atividade de pintura'}
              className="h-40 object-cover rounded-3xl shadow-md"
            />
        </div>
        <div className="w-full">
          <Image
            src={Grid3}
            alt="Voluntário entregando alimento para uma criança"
            className="h-[400px] object-cover rounded-3xl"
          />
        </div>
      </div>

      <div className="text-left w-3/5">
        <h2 className="text-4xl font-bold leading-tight">
          Conectar, fortalecer, transformar: Descubra como fazemos{' '}
          <span className="relative inline-block">
            <span className="relative z-10 text-[#009FE3]">isso juntos!</span>
            <span className='absolute z-10 -bottom-2 left-0'>
              <Image
                src={Underline}
                alt="Sublinhado"
              />
            </span>
          </span>
        </h2>

        <p className="mt-6 text-lg">
          Atuar com o{' '}
          <strong className="font-bold italic">Bora Impactar</strong> é unir
          forças com uma rede comprometida em gerar impacto social real.
          Facilitamos conexões entre empresas e ONGs sérias, com projetos
          transparentes, mensuráveis e alinhados aos Objetivos de
          Desenvolvimento Sustentável (ODS).
        </p>

        <p className="mt-6 text-lg font-bold">
          Oferecemos curadoria, visibilidade e suporte para que sua marca seja
          reconhecida não só pelo que faz, mas pelo que transforma.
        </p>
      </div>
    </section>
  );
}