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
    <div className="flex bg-white rounded-md overflow-hidden drop-shadow-md">
      {/* Imagem */}
      <div className="w-56">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={240}
          height={144}
          className="object-cover w-60 h-36 border border-primary rounded"
          quality={100}
          unoptimized
        />
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col justify-between pl-6 pr-4 py-3 w-full max-w-72">
        {/* Título e descrição */}
        <div>
          <h2 className="text-base font-medium text-gray-900 mt-4 leading-snug">
            {title}
          </h2>
          <p className="text-sm text-gray-700 mt-2 leading-tight">
            {description}
          </p>
        </div>

        {/* Barra de progresso + Detalhes */}
        <div className="flex items-center gap-x-11 mt-2">
          <div className="w-[50%] bg-gray-200 rounded-full h-[8px]">
            <div
              className="bg-blue-600 h-[8px] rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <a
            href={link}
            className="text-sm text-blue-600 font-medium hover:underline"
          >
            Detalhes
          </a>
        </div>
      </div>
    </div>
  );
}
