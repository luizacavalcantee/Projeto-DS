import React from 'react';
import Footer from '@/components/footer';
import Header from '@/components/header';

export default function MainLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen w-screen">
      <Header />
      <main className="flex-grow mt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}