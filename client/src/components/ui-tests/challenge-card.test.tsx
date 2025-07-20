// client/src/components/ChallengeCard.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from 'testing-library'; // Necessário para simular interações de usuário
import ChallengeCard from '@/components/challenge-card';
import { jest, expect } from '@jest/globals';

// 1. Mock do módulo '@/hooks/useAuth'
// Isso substitui a implementação real do hook useAuth em nossos testes.
jest.mock('../../hooks/useAuth', () => ({
  useAuth: jest.fn(), // Cria um mock de função para o useAuth
}));

// Importa o mock do useAuth para configurá-lo em cada teste
import { useAuth } from '../../hooks/useAuth';
import test, { describe, beforeEach } from 'node:test';

// Mock de uma imagem estática para o Next.js Image component
// No ambiente de teste, Image não renderiza de verdade, então um mock simples funciona.
const mockImageSrc = '/path/to/image.jpg'; // Ou qualquer string válida

describe('ChallengeCard', () => {
  // Limpa os mocks antes de cada teste para garantir isolamento
  beforeEach(() => {
    (useAuth as jest.Mock).mockClear();
  });

  const defaultProps = {
    id: 'challenge-123',
    imageSrc: mockImageSrc,
    imageAlt: 'Imagem do Desafio',
    title: 'Desafio Teste',
    description: 'Esta é uma descrição do desafio para teste.',
    progress: 50,
  };

  test('should render correctly', () => {
    // Mocka o useAuth como não autenticado para este teste
    (useAuth as jest.Mock).mockReturnValue({ user: null, isAuthenticated: false });

    render(<ChallengeCard {...defaultProps} />);

    // Verifica se os textos estão presentes
    expect(screen.getByText('Desafio Teste')).toBeInTheDocument();
    expect(screen.getByText('Esta é uma descrição do desafio para teste.')).toBeInTheDocument();
    expect(screen.getByText('Ver detalhes')).toBeInTheDocument();

    // Verifica o alt da imagem
    expect(screen.getByAltText('Imagem do Desafio')).toBeInTheDocument();

    // Verifica o estilo da barra de progresso (a largura)
    const progressBar = screen.getByText('Ver detalhes').previousElementSibling;
    expect(progressBar).toHaveStyle('width: 50%');
  });

  test('deve redirecionar para a rota pública se o usuário não estiver autenticado', async () => {
    // 2. Configura o mock de useAuth para simular um usuário NÃO AUTENTICADO
    (useAuth as jest.Mock).mockReturnValue({ user: null, isAuthenticated: false });

    render(<ChallengeCard {...defaultProps} />);

    // Encontra o link principal do card
    // Como o Link envolve todo o card, podemos procurar pelo texto do título ou description
    // ou pelo link 'Ver detalhes' que também está dentro do Link.
    const cardLink = screen.getByRole('link', { name: /desafio teste/i });

    // Verifica se o href está correto para um usuário não autenticado
    expect(cardLink).toHaveAttribute('href', `/challenges/${defaultProps.id}`);

    // Não precisamos simular o clique real, pois o Link do Next.js já resolve o href
    // no lado do cliente. O teste aqui é para garantir que o href está configurado corretamente.
    // Se você quisesse testar a navegação real (como se a página mudasse), isso seria um
    // teste E2E (com Cypress/Playwright), não um teste de unidade/integração de componente.
  });

  test('deve redirecionar para a rota de ONG se o usuário for uma ONG autenticada', async () => {
    // 3. Configura o mock de useAuth para simular um usuário AUTENTICADO como ONG
    (useAuth as jest.Mock).mockReturnValue({
      user: { id: 'user-ong-1', type: 'ong' }, // Simula um usuário tipo 'ong'
      isAuthenticated: true,
    });

    render(<ChallengeCard {...defaultProps} />);

    const cardLink = screen.getByRole('link', { name: /desafio teste/i });

    // Verifica se o href está correto para uma ONG autenticada
    expect(cardLink).toHaveAttribute('href', `/ong/challenges/${defaultProps.id}`);
  });

  test('deve redirecionar para a rota de Manager se o usuário for um Manager autenticado', async () => {
    // 4. Configura o mock de useAuth para simular um usuário AUTENTICADO como Manager
    (useAuth as jest.Mock).mockReturnValue({
      user: { id: 'user-manager-1', type: 'manager' }, // Simula um usuário tipo 'manager'
      isAuthenticated: true,
    });

    render(<ChallengeCard {...defaultProps} />);

    const cardLink = screen.getByRole('link', { name: /desafio teste/i });

    // Verifica se o href está correto para um Manager autenticado
    expect(cardLink).toHaveAttribute('href', `/manager/challenges/${defaultProps.id}`);
  });
});