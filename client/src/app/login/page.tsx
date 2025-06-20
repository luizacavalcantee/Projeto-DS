import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { BoraImpactar } from '@/assets';
import { Button } from '@/components/ui/button';

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#CBEFFF] p-4">
      {/* Botão de Voltar (fora do card principal) */}
      <button className="absolute left-8 top-8 text-gray-600 hover:text-gray-800">
        <ArrowLeft size={24} />
      </button>

      {/* Card de Login */}
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg md:p-12">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <Image
            src={BoraImpactar} // Substitua pelo caminho do seu logo
            alt="Logo Bora Impactar" 
            className="mb-6 h-12"
          />

          {/* Título */}
            <h1
              className="mb-6 text-2xl font-bold text-gray-800 bg-gradient-to-r from-[#26BDE2] to-[#294BB6] bg-clip-text text-transparent"
            >
              Entrar
            </h1>
            </div>

        {/* Formulário */}
        <form className="space-y-6">
          {/* Campo CNPJ */}
          <div>
            <label 
              htmlFor="cnpj" 
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              id="cnpj"
              placeholder="Digite seu Email"
              className="h-10 mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Campo Senha */}
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
            />
          </div>

          {/* Link "Esqueci a senha" */}
          <div className="text-center">
            <a href="#" className="text-sm text-[#1474FF] hover:text-indigo-500">
              Esqueceu a senha?
            </a>
          </div>

          {/* Botão Entrar */}
          <Button type='submit' size={"fit"}>Entrar</Button>
        </form>

        <div className="mt-8 text-center">
          <p className="mb-4 text-sm text-black">
            Não possui cadastro?
          </p>
          <Button
            variant="white"
            size="fit"
            type='button'
          >
              Criar conta
          </Button>
        </div>
      </div>
    </div>
  );
};