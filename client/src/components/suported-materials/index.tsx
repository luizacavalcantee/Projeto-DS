'use client';

import { File } from 'lucide-react';
import Link from 'next/link';

interface SupportMaterialsProps {
  urls: string[] | undefined;
}

export default function SupportMaterials({ urls }: SupportMaterialsProps) {
  // Se não houver URLs, não renderiza nada
  if (!urls || urls.length === 0) {
    return null;
  }

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold">Materiais de suporte</h2>
      <div className="mt-4 bg-white/60 shadow rounded-md">
        {urls.map((url, index) => (
          <Link
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center p-4 gap-4 border-b last:border-b-0">
              <div className="bg-detailsBackground p-3 rounded-lg">
                <File className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-medium">Material de Apoio {index + 1}</h3>
                <p className="text-sm text-textGray">
                  Clique para ver o material anexado
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
