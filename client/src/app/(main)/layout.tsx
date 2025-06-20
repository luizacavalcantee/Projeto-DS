import React from 'react';
import Footer from '@/components/footer';

export default function MainLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}