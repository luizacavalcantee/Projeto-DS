'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { BoraImpactar } from '@/assets';
import { NewButton } from '@/components/ui/new-button';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReturn = () => {
    router.back();
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    const result = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password
    });

    setLoading(false);

    if (result?.error) {
      setError(result.error);
    } else if (result?.ok) {
      router.push('/ong/dashboard');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#CBEFFF] p-4">
      <button
        onClick={handleReturn}
        className="absolute left-8 top-8 text-gray-600 hover:text-gray-800"
      >
        <ArrowLeft size={24} />
      </button>
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg md:p-12">
        <div className="flex flex-col items-center">
          <Image
            src={BoraImpactar}
            alt="Logo Bora Impactar"
            className="mb-6 h-12"
          />
          <h1 className="mb-6 text-2xl font-bold text-gray-800 bg-gradient-to-r from-[#26BDE2] to-[#294BB6] bg-clip-text text-transparent">
            Entrar
          </h1>
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu Email"
              className="h-10 mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              placeholder="Digite sua senha"
              className="h-10 mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          <div className="text-center">
            <a
              href="#"
              className="text-sm text-[#1474FF] hover:text-indigo-500"
            >
              Esqueceu a senha?
            </a>
          </div>
          <NewButton type="submit" size={'fit'} disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </NewButton>
        </form>
        <div className="mt-8 text-center">
          <p className="mb-4 text-sm text-black">Não possui cadastro?</p>
          <NewButton variant="white" size="fit" type="button">
            Criar conta
          </NewButton>
        </div>
      </div>
    </div>
  );
}
