import Image from 'next/image';
import { Grid1, Grid2, Grid3, Underline } from '@/assets';

export default function ImpactSection() {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 mx-6 md:mx-12 lg:mx-20 my-10 md:my-16 lg:my-20">
      
     <div className="w-full lg:w-2/5 flex gap-4 sm:gap-8 md:gap-5 lg:gap-8 order-2 lg:order-1">
        <div className="w-full flex flex-col gap-4 sm:gap-8">
            <Image
              src={Grid2}
              alt={'Criança sorrindo durante atividade de pintura'}
              className="sm:h-52 object-cover rounded-3xl shadow-md w-full h-full"
            />
            <Image
              src={Grid1}
              alt={'Criança sorrindo durante atividade de pintura'}
              className="sm:h-40 object-cover rounded-3xl shadow-md w-full h-full"
            />
        </div>
        <div className="w-full">
            <Image
              src={Grid3}
              alt="Voluntário entregando alimento para uma criança"
              className="h-[304px] sm:h-[400px] object-cover rounded-3xl shadow-md w-full"
            />
        </div>
      </div>

      <div className="w-full lg:w-3/5 text-center lg:text-left order-1 lg:order-2">
        <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
          Conectar, fortalecer, transformar: Descubra como fazemos{' '}
          <span className="relative inline-block">
            <span className="relative z-10 text-[#009FE3]">isso juntos!</span>
            <span className='absolute z-10 -bottom-2 left-0 w-full'>
              <Image
                src={Underline}
                alt="Sublinhado"
                style={{ width: '100%' }} 
              />
            </span>
          </span>
        </h2>

        <p className="mt-8 text-base md:text-lg">
          Atuar com o{' '}
          <strong className="font-bold italic">Bora Impactar</strong> é unir
          forças com uma rede comprometida em gerar impacto social real.
          Facilitamos conexões entre empresas e ONGs sérias, com projetos
          transparentes, mensuráveis e alinhados aos Objetivos de
          Desenvolvimento Sustentável (ODS).
        </p>

        <p className="mt-6 text-base md:text-lg font-bold">
          Oferecemos curadoria, visibilidade e suporte para que sua marca seja
          reconhecida não só pelo que faz, mas pelo que transforma.
        </p>
      </div>
    </section>
  );
}