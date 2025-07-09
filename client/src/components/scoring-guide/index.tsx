import { Home_work, Emoji_people, Calendar, Public } from '@/assets';
import Image from 'next/image';

export default function ScoringGuide() {
  return (
    <section className="flex flex-col my-16 items-center justify-center shadow-md rounded-md px-40 py-14 w-full bg-gradient-to-r from-[#32B9F3] via-[#009FE3] to-[#029FE2]">
      <h2 className="text-4xl font-bold text-center text-white mb-5">
        Como Pontuar e Subir no Ranking?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
        <div className="flex flex-col items-center text-center">
          <Image
            src={Home_work}
            alt="Casa"
            width={82}
            height={82}
            className="mb-4"
          />
          <h3 className="text-base font-bold text-white mb-2 whitespace-nowrap">
            Conclua Projetos de Impacto
          </h3>
          <p className="text-sm text-white font-light">
            Cada projeto finalizado e validado gera pontos para a sua escola.
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <Image
            src={Emoji_people}
            alt="Pessoa"
            width={82}
            height={82}
            className="mb-4"
          />
          <h3 className="text-base font-bold text-white mb-2 whitespace-nowrap">
            Engaje Alunos e Voluntários
          </h3>
          <p className="text-sm text-white font-light">
            Quanto mais alunos e membros da comunidade participarem, mais pontos
            sua escola acumula.
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <Image
            src={Calendar}
            alt="Calendário"
            width={82}
            height={82}
            className="mb-4"
          />
          <h3 className="text-base font-bold text-white mb-2 whitespace-nowrap">
            Participe de Desafios Especiais
          </h3>
          <p className="text-sm text-white font-light">
            Fique atento aos desafios sazonais do &quot;Bora Impactar&quot; para
            pontos bônus!
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <Image
            src={Public}
            alt="Público"
            width={82}
            height={82}
            className="mb-4"
          />
          <h3 className="text-base font-bold text-white mb-2 whitespace-nowrap">
            Divulgue seu Impacto
          </h3>
          <p className="text-sm text-white font-light">
            Compartilhe suas conquistas na plataforma e nas redes sociais para
            amplificar seu reconhecimento.
          </p>
        </div>
      </div>
    </section>
  );
}
