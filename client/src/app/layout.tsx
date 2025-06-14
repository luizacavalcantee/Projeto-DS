import type { Metadata } from 'next';

import Footer from 'components/footer';
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
      <body className='font-dmSans'>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}