import Image, { StaticImageData } from "next/image";

interface ChallengeCardProps {
  imageSrc: StaticImageData | string;
  imageAlt: string;
  title: string;
  description: string;
  progress: number; 
  link: string;
}

export default function ChallengeCard({
  imageSrc,
  imageAlt,
  title,
  description,
  progress,
  link,
}: ChallengeCardProps) {
  return (
    <div className="flex bg-white rounded-md overflow-hidden drop-shadow-md max-w-[600px]">
      {/* Imagem */}
      <div className="w-2/5">
        <Image
          src={imageSrc}
          alt={imageAlt}
          className="object-cover h-full w-full rounded"
          quality={100}
          unoptimized
        />
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col gap-6 px-6 py-3 w-3/5">
        {/* Título e descrição */}
        <div>
          <h2 className="text-base font-medium text-gray-900 mt-4 leading-snug">
            {title}
          </h2>
          <p className="text-sm text-gray-700 mt-2 leading-tight line-clamp-2">
            {description}
          </p>
        </div>

        {/* Barra de progresso + Detalhes */}
        <div className="flex items-center justify-between">
          <div className="w-1/2 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${progress}%`}}
            ></div>
          </div>

          <a
            href={link}
            className="text-sm text-blue-600 font-medium hover:underline whitespace-nowrap"
          >
            Ver detalhes
          </a>
        </div>
      </div>
    </div>
  );
}
