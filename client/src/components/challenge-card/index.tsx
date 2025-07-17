'use client'; // 1. Adicionar a diretiva para poder usar hooks

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useMemo } from "react";

// 2. Importar o hook de autenticação
import { useAuth } from "@/hooks/useAuth";

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
  // 3. Usar o hook para obter o estado de autenticação do utilizador
  const { user, isAuthenticated } = useAuth();

  // 4. Construir o URL de detalhe dinamicamente
  // useMemo otimiza a performance, evitando que o URL seja recalculado em cada renderização
  const detailUrl = useMemo(() => {
    // Se o utilizador não estiver autenticado ou se os dados ainda não carregaram, usa a rota pública
    if (!isAuthenticated || !user) {
      return `/challenges/${id}`;
    }
    
    // Se estiver autenticado, constrói o prefixo com base no tipo de utilizador
    const prefix = user.type === 'ong' ? '/ong' : '/manager';
    return `${prefix}/challenges/${id}`;

  }, [isAuthenticated, user, id]);

  return (
    // 5. Usar a variável com o URL dinâmico no Link
    <Link href={detailUrl} className="block hover:scale-[1.02] transition-transform duration-200 ease-in-out h-full">
      <div className="flex bg-white rounded-md overflow-hidden drop-shadow-md max-w-[600px] cursor-pointer h-full">
        <div className="w-2/5 relative"> 
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill 
            className="object-cover" 
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
