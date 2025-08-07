'use client';

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useMemo } from "react";

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
  const { user, isAuthenticated } = useAuth();

  const detailUrl = useMemo(() => {
    if (!isAuthenticated || !user) {
      return `/challenges/${id}`;
    }
    
    const prefix = user.type === 'ong' ? '/ong' : '/manager';
    return `${prefix}/challenges/${id}`;

  }, [isAuthenticated, user, id]);

  return (
    <Link href={detailUrl} className="block hover:scale-[1.02] transition-transform duration-200 ease-in-out h-full">
      {/* MUDANÇA 1: O flex container agora é flex-col por padrão e lg:flex-row em telas grandes */}
      <div className="flex flex-col lg:flex-row bg-white rounded-md overflow-hidden drop-shadow-md max-w-[600px] cursor-pointer h-full">
        
        {/* MUDANÇA 2: O container da imagem tem w-full e uma proporção no mobile. Em lg, volta ao normal. */}
        <div className="w-full aspect-video lg:aspect-auto lg:w-2/5 relative"> 
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill 
            className="object-cover" 
          />
        </div>

        {/* MUDANÇA 3: O container do conteúdo tem w-full no mobile e volta ao normal em lg. */}
        <div className="flex flex-col gap-4 p-4 lg:p-6 w-full lg:w-3/5">
          <div>
            <h2 className="text-base font-medium text-gray-900 leading-snug">
              {title}
            </h2>
            <p className="text-sm text-gray-700 mt-2 leading-tight line-clamp-2">
              {description}
            </p>
          </div>

          {/* O 'mt-auto' garante que a barra de progresso fique no final do card */}
          <div className="flex items-center justify-between mt-auto">
            {/* A barra de progresso foi ajustada para ser um pouco mais flexível */}
            <div className="flex-grow bg-gray-200 rounded-full h-2 mr-4">
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