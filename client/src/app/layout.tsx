import type { Metadata } from 'next';
import 'styles/globals.css';

export const metadata: Metadata = {
  title: 'Bora Impactar',
  description: 'Projeto Bora Impactar',
  manifest: '/manifest.json'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className='font-dmSans bg-background'>
        <main>{children}</main>
      </body>
    </html>
  );
}