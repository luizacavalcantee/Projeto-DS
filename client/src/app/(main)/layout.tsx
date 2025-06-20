import React from 'react';
import Footer from '@/components/footer';

export default function MainLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}