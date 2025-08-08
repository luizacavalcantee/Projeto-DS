import api from './api';
import { OngData } from './ong.services';
import { SchoolManagerData } from './schoolManager.services';

export type UserType = 'ong' | 'manager';

export type AuthenticatedUser =
  | (OngData & { type: 'ong' })
  | (SchoolManagerData & { type: 'manager' });
  
export interface LoginCredentials {
  email: string;
  password_hash: string; // O backend espera 'password', mas vamos manter 'password_hash' por enquanto e ajustar na chamada
  userType: UserType;
}

interface AuthResponse {
  accessToken: string;
  loggedUser: OngData | SchoolManagerData;
}

/**
 * Realiza o login.
 */
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const { password_hash: password, ...dataToSend } = credentials;
  const payload = { ...dataToSend, password };

  const response = await api.post<{ data: AuthResponse }>('/sessions', payload);
  const { accessToken, loggedUser } = response.data.data;

  if (accessToken && loggedUser) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(loggedUser));
    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    return { accessToken, loggedUser };
  }
  
  throw new Error('Resposta da API de login inválida.');
};

/**
 * Realiza o logout.
 */
export const logout = async () => {
  try {
    await api.delete('/sessions');
  } catch (error) {
    console.error("Erro no logout do servidor, limpando localmente.", error);
  } finally {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
  }
};

/**
 * Configura o header do Axios no início da aplicação.
 */
export const setupAuthHeader = () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

// INTERCEPTOR para renovação automática do token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await api.patch<{ data: { accessToken: string } }>('/sessions');
        const { accessToken } = refreshResponse.data.data;
        
        localStorage.setItem('accessToken', accessToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        
        return api(originalRequest);
      } catch (refreshError) {
        await logout();
        window.location.href = '/login'; // ou sua página de login
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
