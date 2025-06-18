import { Artesenato } from "../../assets/index";
import { Button } from "components/ui/button";
import Image from "next/image";
import { BoraImpactar } from "../../assets/index";

interface HeaderProps {
    buttonText?: string;
    secondaryButtonText?: string;
    showSecondaryButton?: boolean;// mostra ou não o segundo botão
}

export default function Header({
    buttonText,
    secondaryButtonText,
    showSecondaryButton = false,
}: HeaderProps) {
    return (
        <section className="mx-auto py-16 pl-32">
            <div className="flex flex-col md:flex-row items-center">
                <div className="flex items-center">
                    <div className="mb-8 md:mb-0">
                        <Image src={BoraImpactar} alt="Artesanato" className="mb-12" />
                        <h1 className="text-[32px] md:text-3xl font-bold text-black mb-4">
                            Educação que Transforma: semeando o futuro do Recife, uma ação de cada vez.
                        </h1>

                        <p className="text-[16px] text-gray-700 mb-12">
                            No Painel de Impacto, sua escola se conecta a desafios e projetos sociais que transformam Recife todos os dias. Encontre causas que mobilizam seus alunos, desenvolva habilidades para o futuro e ajude a construir uma cidade mais justa e inovadora.
                            Juntos, podemos gerar um impacto real. Venha fazer parte deste movimento!
                        </p>

                        <div className="flex gap-4">
                            <Button variant="default">{buttonText}</Button>

                            {showSecondaryButton && (<Button variant="white">{secondaryButtonText}</Button>
                            )}
                        </div>
                    </div>
                </div>

                <Image src={Artesenato} alt="Artesanato" className="w-full h-full" />
            </div>
        </section>
    );
}