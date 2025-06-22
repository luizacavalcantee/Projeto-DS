import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { BoraImpactarWhite, Destaque, HeroBackgroung } from '@/assets';

export default function Hero() {
  return (
    <section className="relative w-full text-white">
      <Image
        src={HeroBackgroung}
        alt="Background image of children"
        fill
        className="object-cover object-center -z-10"
        priority
      />

      <div className="relative z-10 w-full h-full flex flex-col justify-center px-16">
        <div>
          <Image
            src={BoraImpactarWhite}
            alt="Bora Impactar Logo"
            className="h-auto w-auto mb-6"
          />
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4 max-w-2xl">
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

        <p className="text-base mb-8 max-w-2xl">
          Conectamos ONGs e empresas, voluntários e doadores que querem gerar
          impacto social real. Nossa plataforma facilita parcerias, promove
          projetos e fortalece quem já está transformando comunidades. <br />
          <span className="font-extrabold">
            Junte-se a essa rede e faça parte da mudança.
          </span>
        </p>

        <Button className="bg-[#294BB6] hover:bg-[#1f3a8f] text-white font-semibold py-3 px-8 rounded-lg text-lg w-fit">
          Quero fazer parte!
        </Button>
      </div>
    </section>
  );
}
      {/* <div className="h-[600px] md:h-[700px] lg:h-[800px] relative z-20 px-4 md:px-8 lg:px-8 xl:px-16 max-w-7xl flex flex-col justify-center mt-[-110px] md:mt-[-190px] lg:mt-[-260px]">
        <div className="mb-4">
          <Image
            src={BoraImpactarWhite}
            alt="Bora Impactar Logo"
            width={200}
            height={60}
            className="h-auto w-auto"
          />
        </div>

<<<<<<< HEAD
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4 max-w-2xl">
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

        <p className="text-base mb-8 max-w-2xl">
          Conectamos ONGs e empresas, voluntários e doadores que querem gerar
          impacto social real. Nossa plataforma facilita parcerias, promove
          projetos e fortalece quem já está transformando comunidades. <br />
          <span className="font-extrabold">
            Junte-se a essa rede e faça parte da mudança.
          </span>
        </p>

        <Button className="bg-[#294BB6] hover:bg-[#1f3a8f] text-white font-semibold py-3 px-8 rounded-lg text-lg w-fit">
          Quero fazer parte!
        </Button>
      </div> */}
=======
export default function Hero({
  buttonText,
  secondaryButtonText,
  showSecondaryButton = false
}: HeroProps) {
  return (
    <section className="mx-auto py-16 pl-32">
      <div className="flex flex-col md:flex-row items-center">
        <div className="flex items-center">
          <div className="mb-8 md:mb-0">
            <Image src={BoraImpactar} alt="Artesanato" className="mb-12" />
            <h1 className="text-[32px] md:text-3xl font-bold text-black mb-4">
              Educação que Transforma: semeando o futuro do Recife, uma ação de
              cada vez.
            </h1>

            <p className="text-[16px] text-gray-700 mb-12">
              No Painel de Impacto, sua escola se conecta a desafios e projetos
              sociais que transformam Recife todos os dias. Encontre causas que
              mobilizam seus alunos, desenvolva habilidades para o futuro e
              ajude a construir uma cidade mais justa e inovadora. Juntos,
              podemos gerar um impacto real. Venha fazer parte deste movimento!
            </p>

            <div className="flex gap-4">
              <Button variant="default">{buttonText}</Button>

              {showSecondaryButton && (
                <Button variant="white">{secondaryButtonText}</Button>
              )}
            </div>
          </div>
        </div>

        <Image src={Artesenato} alt="Artesanato" className="w-full h-full" />
      </div>
    </section>
  );
}
>>>>>>> d6e39c770d63d58fdff06f6ffa4a63aa6f81f70d
