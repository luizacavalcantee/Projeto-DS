'use client';

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { BoraImpactar } from '@/assets';
import { NewButton } from '@/components/ui/new-button';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import api from '@/services/api';

interface ExternalUser {
  name: string;
  email: string;
}

interface ExternalNgo {
  id: number;
  name: string;
  description: string;
  contact_phone: string | null;
  instagram_link: string | null;
  facebook_link: string | null;
  site: string | null;
  cover_photo_url: string | null;
  logo_photo_url: string | null;
}

interface ExternalApiResponse {
  message: string;
  user: ExternalUser;
  ngo: ExternalNgo;
}

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleReturn = () => {
    router.back();
  };

  const saveOngToYourDatabase = async (
    externalApiData: ExternalApiResponse,
    userPassword: string
  ) => {
    const { user, ngo } = externalApiData;
    const payloadForYourApi = {
      name: ngo.name,
      email: user.email,
      password: userPassword,
      description: ngo.description,
      contactPhone: ngo.contact_phone,
      instagramLink: ngo.instagram_link,
      facebookLink: ngo.facebook_link,
      site: ngo.site,
      coverPhotoUrl: ngo.cover_photo_url,
      logoPhotoUrl: ngo.logo_photo_url
    };

    try {
      const response = await api.post('/ong', payloadForYourApi);
      setSuccess('Login bem-sucedido e ONG sincronizada!');
    } catch (err: any) {
      const response = err.response;
      if (
        response &&
        response.status === 400 &&
        response.data?.message.includes('already registered')
      ) {
        setSuccess('Login bem-sucedido! Os dados desta ONG já estavam no seu banco de dados.');
      } else {
        setError(response?.data?.message || 'Não foi possível conectar ao seu servidor para salvar os dados.');
      }
    }
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post<ExternalApiResponse>('/api/proxy/login', {
        email,
        password,
      });

      const data = response.data;
      await saveOngToYourDatabase(data, password);

    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const responseData = err.response.data;
        setError(responseData?.message || 'E-mail ou senha incorretos.');
      } else {
        setError(
          'Não foi possível conectar ao servidor de autenticação. Tente novamente mais tarde.'
        );
      }
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
          {success && (
            <p className="text-sm text-green-600 text-center">{success}</p>
          )}

          <div className="text-center">
            <a
              href="#"
              className="text-sm text-[#1474FF] hover:text-indigo-500"
            >
              Esqueceu a senha?
            </a>
          </div>
          <NewButton type="submit" size={'fit'}>
            Entrar
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
