import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface ChallengeCardProps {
  id: string;
  imageSrc: StaticImageData | string;
  imageAlt: string;
  title: string;
  description: string;
  progress: number;
}

export default function ChallengeCard({
  id,
  imageSrc,
  imageAlt,
  title,
  description,
  progress,
}: ChallengeCardProps) {
  return (
    <Link href={`/challenges/${id}`} className="block hover:scale-[1.02] transition-transform duration-200 ease-in-out h-full">
      <div className="flex bg-white rounded-md overflow-hidden drop-shadow-md max-w-[600px] cursor-pointer h-full">
        {/* --- CORREÇÃO 3: AJUSTE PARA O COMPONENTE IMAGE --- */}
        {/* Adicionado 'relative' para que a propriedade 'fill' do Image funcione corretamente */}
        <div className="w-2/5 relative"> 
          <Image
            src={imageSrc}
            alt={imageAlt}
            // A propriedade 'fill' faz a imagem preencher o contêiner pai.
            fill 
            // 'object-cover' garante que a imagem cubra o espaço sem distorcer.
            className="object-cover" 
            // Não é mais necessário 'h-full', 'w-full', 'quality' ou 'unoptimized' ao usar 'fill'.
          />
        </div>

        <div className="flex flex-col gap-6 px-6 py-3 w-3/5">
          <div>
            <h2 className="text-base font-medium text-gray-900 mt-4 leading-snug">
              {title}
            </h2>
            <p className="text-sm text-gray-700 mt-2 leading-tight line-clamp-2">
              {description}
            </p>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <div className="w-1/2 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <span
              className="text-sm text-blue-600 font-medium hover:underline whitespace-nowrap"
            >
              Ver detalhes
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
