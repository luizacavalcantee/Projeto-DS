import React from 'react';
import Footer from '@/components/footer';
import Header from '@/components/header';

export default async function MainLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen w-screen">
      <Header />
      <main className="flex-grow mt-20 px-4 md:px-12 lg:px-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}