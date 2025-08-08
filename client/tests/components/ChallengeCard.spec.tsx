import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ChallengeCard from '@/components/challenge-card';
import { useAuth } from '@/hooks/useAuth';

jest.mock('@/hooks/useAuth');

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { fill, ...rest } = props; 
    return <img {...rest} />;
  },
}));

const mockedUseAuth = useAuth as jest.Mock;

describe('ChallengeCard Component', () => {
    const defaultProps = {
        id: '123',
        imageSrc: '/placeholder.png',
        imageAlt: 'Imagem do desafio',
        title: 'Desafio de Leitura de Verão',
        description: 'Incentive os alunos a lerem 5 livros durante as férias de verão.',
        progress: 50,
    };

    it('should render the basic challenge information correctly', () => {
        mockedUseAuth.mockReturnValue({ isAuthenticated: false, user: null });
        render(<ChallengeCard {...defaultProps} />);
        expect(screen.getByText('Desafio de Leitura de Verão')).toBeInTheDocument();
        expect(screen.getByText(/Incentive os alunos a lerem 5 livros/i)).toBeInTheDocument();
        expect(screen.getByAltText('Imagem do desafio')).toBeInTheDocument();
    });

    it('should have the correct public URL when user is not authenticated', () => {
        mockedUseAuth.mockReturnValue({ isAuthenticated: false, user: null });
        render(<ChallengeCard {...defaultProps} />);
        const linkElement = screen.getByRole('link');
        expect(linkElement).toHaveAttribute('href', '/challenges/123');
    });

    it('should have the correct URL for a "manager" user', () => {
        mockedUseAuth.mockReturnValue({
            isAuthenticated: true,
            user: { type: 'manager' },
        });
        render(<ChallengeCard {...defaultProps} />);
        const linkElement = screen.getByRole('link');
        expect(linkElement).toHaveAttribute('href', '/manager/challenges/123');
    });

    it('should have the correct URL for an "ong" user', () => {
        mockedUseAuth.mockReturnValue({
            isAuthenticated: true,
            user: { type: 'ong' },
        });
        render(<ChallengeCard {...defaultProps} />);
        const linkElement = screen.getByRole('link');
        expect(linkElement).toHaveAttribute('href', '/ong/challenges/123');
    });
});
