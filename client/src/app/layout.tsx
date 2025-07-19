import type { Metadata } from 'next';
import 'styles/globals.css';

// 1. Importe o novo componente que criamos
import AppInitializer from '@/components/app-initializer';

// 2. Agora você pode exportar metadata sem erros, pois este é um Server Component
export const metadata: Metadata = {
  title: 'Bora Impactar!',
  description: 'Projeto Bora Impactar',
  icons: {
    icon: [
      {
        url: "/icons/icon.svg",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className='font-dmSans bg-background overflow-x-hidden'>
        {/* 3. Use o AppInitializer para envolver os filhos */}
        <AppInitializer>
          {children}
        </AppInitializer>
      </body>
    </html>
  );
}
