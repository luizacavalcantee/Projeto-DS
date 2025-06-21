import type { Metadata } from 'next';
import 'styles/globals.css';

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
        <main>{children}</main>
      </body>
    </html>
  );
}