// client/src/app/(main)/layout.tsx
import React from 'react';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/options';

export default async function MainLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(nextAuthOptions);

  return (
    <div className="flex flex-col min-h-screen w-screen">
      <Header session={session} />
      <main className="flex-grow mt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}