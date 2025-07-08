import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import api from 'services/api';
import axios from 'axios';

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

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Credenciais não fornecidas.');
        }

        try {
          const externalApiResponse = await axios.post<ExternalApiResponse>(
            'https://bora-impactar-dev.setd.rdmapps.com.br/api/login',
            {
              email: credentials.email,
              password: credentials.password
            }
          );

          const externalData = externalApiResponse.data;

          if (!externalData || !externalData.user) {
            throw new Error('Falha na autenticação com o serviço externo.');
          }

          const payloadForYourApi = {
            name: externalData.ngo.name,
            email: externalData.user.email,
            password: credentials.password,
            description: externalData.ngo.description
          };

          try {
            await api.post('/ong', payloadForYourApi);
          } catch (syncError) {
            if (
              axios.isAxiosError(syncError) &&
              syncError.response?.status !== 400
            ) {
              console.error(
                'Erro ao sincronizar ONG:',
                syncError.response?.data
              );
              throw new Error('Não foi possível sincronizar os dados da ONG.');
            }
          }

          return {
            id: externalData.ngo.id.toString(),
            name: externalData.user.name,
            email: externalData.user.email,
            role: 'ong'
          };
        } catch (error) {
          console.error('Erro na autorização:', error);
          if (axios.isAxiosError(error) && error.response) {
            throw new Error(
              error.response.data.message || 'E-mail ou senha incorretos.'
            );
          }
          throw new Error('Ocorreu um erro durante o login.');
        }
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      return session;
    }
  }
};
