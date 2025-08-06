import { Home_work, Emoji_people, Calendar, Public } from '@/assets';
import Image from 'next/image';

export default function ScoringGuide() {
  return (
    <section className="my-16 w-full bg-gradient-to-r from-[#32B9F3] via-[#009FE3] to-[#029FE2] py-12 md:py-20">
      <div className="mx-auto max-w-screen-xl px-6 md:px-8">
        <h2 className="text-3xl font-bold text-center text-white mb-12 md:text-4xl">
          Como Pontuar e Subir no Ranking?
        </h2>
        
        {/* O grid agora tem espaçamento vertical e horizontal em todas as telas */}
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4">
          
          {/* Item 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 mb-5">
              <Image
                src={Home_work}
                alt="Ícone de uma casa com uma ferramenta, representando projetos"
                width={48}
                height={48}
              />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Conclua Projetos de Impacto
            </h3>
            <p className="text-sm text-white/90 font-light max-w-xs">
              Cada projeto finalizado e validado gera pontos para a sua escola.
            </p>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 mb-5">
              <Image
                src={Emoji_people}
                alt="Ícone de uma pessoa acenando, representando engajamento"
                width={48}
                height={48}
              />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Engaje Alunos e Voluntários
            </h3>
            <p className="text-sm text-white/90 font-light max-w-xs">
              Quanto mais participantes, mais pontos sua escola acumula.
            </p>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 mb-5">
               <Image
                src={Calendar}
                alt="Ícone de um calendário, representando desafios especiais"
                width={48}
                height={48}
              />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Participe de Desafios Especiais
            </h3>
            <p className="text-sm text-white/90 font-light max-w-xs">
              Fique atento aos desafios sazonais para ganhar pontos bônus!
            </p>
          </div>

          {/* Item 4 */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 mb-5">
              <Image
                src={Public}
                alt="Ícone do planeta Terra, representando divulgação pública"
                width={48}
                height={48}
              />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Divulgue seu Impacto
            </h3>
            <p className="text-sm text-white/90 font-light max-w-xs">
              Compartilhe suas conquistas para ampliar seu reconhecimento.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}