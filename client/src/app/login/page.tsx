'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// 1. Importe o serviço de login que criamos, em vez do 'signIn'
import { login, UserType } from '@/services/auth.services';
import { BoraImpactar } from '@/assets';
import { NewButton } from '@/components/ui/new-button';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // 2. Adicione um estado para controlar o tipo de usuário
  const [userType, setUserType] = useState<UserType>('ong');

  const handleReturn = () => {
    router.back();
  };

  // 3. Atualize a função handleLogin para usar nosso serviço
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Chama a nossa função de login com as credenciais e o userType
      const { loggedUser } = await login({
        email,
        password_hash: password, // O serviço já renomeia para 'password' internamente
        userType,
      });

      // Se o login for bem-sucedido, redireciona para uma página de dashboard
      alert(`Bem-vindo(a), ${'name' in loggedUser ? loggedUser.name : loggedUser.fullName}!`);
      if (userType === 'ong') {
        router.push('/ong'); // Crie uma página de dashboard para ONGs
      } else { 
        router.push('/manager'); // Crie uma página de dashboard para Gestores Escolares
      }

    } catch (err: any) {
      // Captura o erro da API e exibe uma mensagem amigável
      const errorMessage = err.response?.data?.message || 'Falha no login. Verifique suas credenciais.';
      setError(errorMessage);
    } finally {
      setLoading(false);
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
          {/* 4. Adicione o seletor de tipo de usuário */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Eu sou:</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="ong"
                  checked={userType === 'ong'}
                  onChange={() => setUserType('ong')}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <span className="ml-2 text-gray-700">ONG</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="manager"
                  checked={userType === 'manager'}
                  onChange={() => setUserType('manager')}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <span className="ml-2 text-gray-700">Gestor Escolar</span>
              </label>
            </div>
          </div>

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
          <NewButton type="submit" size={'fit'} disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </NewButton>
        </form>
        {userType === 'manager' && (
          <div className="mt-8 text-center">
            <p className="mb-4 text-sm text-black">Não possui cadastro?</p>
            <Link href="/manager-registration">
              <NewButton variant="white" size="fit" type="button">
                Criar conta
              </NewButton>
            </Link>
          </div>
        )}
        {userType === 'ong' && (
          <div className="mt-8 text-center">
            <p className="mb-4 text-sm text-black">Não possui cadastro?</p>
            <a
              href="https://boraimpactar.recife.pe.gov.br/register"
              target="_blank"
              rel="noopener noreferrer"
            >
              <NewButton variant="white" size="fit" type="button">
              Criar conta
              </NewButton>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
