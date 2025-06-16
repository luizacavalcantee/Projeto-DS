import { Home_work, Emoji_people, Calendar, Public } from "../../assets/index";
import Image from "next/image";

export default function ScoringGuide() {
    return (
        <section className="py-16 bg-gray-100 flex justify-center">
            <div className="bg-white shadow-md rounded-md px-[50px] py-12 max-w-[1240px] w-full">
                <h2 className="text-3xl font-bold text-center text-[#294BB6] mb-[12px]">
                    Como Pontuar e Subir no Ranking?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-[30px]">
                    <div className="flex flex-col items-center text-center">
                        <Image src={Home_work} alt="Casa" width={82} height={82} className="mb-4" />
                        <h3 className="text-base font-bold text-[#294BB6] mb-2">Conclua Projetos de Impacto</h3>
                        <p className="text-sm text-[#000000] font-light">
                            Cada projeto finalizado e validado gera pontos para a sua escola.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <Image src={Emoji_people} alt="Pessoa" width={82} height={82} className="mb-4" />
                        <h3 className="text-base font-bold text-[#294BB6] mb-2">Engaje Alunos e Voluntários</h3>
                        <p className="text-sm text-[#000000] font-light">
                            Quanto mais alunos e membros da comunidade participarem, mais pontos sua escola acumula.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <Image src={Calendar} alt="Calendário" width={82} height={82} className="mb-4" />
                        <h3 className="text-base font-bold text-[#294BB6] mb-2">Participe de Desafios Especiais</h3>
                        <p className="text-sm text-[#000000] font-light">
                            Fique atento aos desafios sazonais do "Bora Impactar" para pontos bônus!
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <Image src={Public} alt="Público" width={82} height={82} className="mb-4" />
                        <h3 className="text-base font-bold text-[#294BB6] mb-2">Divulgue seu Impacto</h3>
                        <p className="text-sm text-[#000000] font-light">
                            Compartilhe suas conquistas na plataforma e nas redes sociais para amplificar seu reconhecimento.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}