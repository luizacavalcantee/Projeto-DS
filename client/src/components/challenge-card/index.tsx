import Image from "next/image";

interface CardHorizontalProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  progress: number; 
  link: string;
  linkLabel: string;
}

export default function CardHorizontal({
  imageSrc,
  imageAlt,
  title,
  description,
  progress,
  link,
  linkLabel,
}: CardHorizontalProps) {
  return (
    <div
      className="flex bg-white rounded-md overflow-hidden shadow"
      style={{ width: "507px", height: "145px" }}
    >
      {/* Imagem */}
      <div className="flex-shrink-0" style={{ width: "48%" }}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={243}
          height={145}
          className="object-cover w-full h-full"
          quality={100}
          unoptimized
        />
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col justify-between pl-6 pr-4 py-3 w-full">
        {/* Título e descrição */}
        <div>
          <h2 className="text-sm font-semibold text-gray-900 mt-4 leading-snug">
            {title}
          </h2>
          <p className="text-xs text-gray-700 mt-2 leading-tight">
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
            className="text-xs text-blue-600 font-medium hover:underline"
          >
            {linkLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
