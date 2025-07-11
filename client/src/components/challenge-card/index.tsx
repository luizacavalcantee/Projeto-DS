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
    <Link href={`/challenges/${id}`} className="block hover:scale-[1.02] transition-transform duration-200 ease-in-out">
      <div className="flex bg-white rounded-md overflow-hidden drop-shadow-md max-w-[600px] cursor-pointer">
        <div className="w-2/5">
          <Image
            src={imageSrc}
            alt={imageAlt}
            className="object-cover h-full w-full"
            quality={100}
            unoptimized
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
