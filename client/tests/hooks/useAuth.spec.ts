import { renderHook, act, waitFor } from '@testing-library/react';
import { useAuth } from '@/hooks/useAuth';
import { logout as logoutService } from '@/services/auth.services';

jest.mock('@/services/auth.services', () => ({
  logout: jest.fn(),
}));

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

const createLocalStorageMock = () => {
    let store: { [key: string]: string } = {};
    return {
        getItem: jest.fn((key: string) => store[key] || null),
        setItem: jest.fn((key: string, value: string) => {
            store[key] = value.toString();
        }),
        removeItem: jest.fn((key: string) => {
            delete store[key];
        }),
        clear: jest.fn(() => {
            store = {};
        }),
    };
};

let localStorageMock = createLocalStorageMock();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('useAuth Hook', () => {
    beforeEach(() => {
        localStorageMock.clear();
        jest.clearAllMocks();
    });

    it('should identify a logged-in manager user from localStorage', async () => {
        const managerUser = { id: 1, name: 'Gestor Teste', inepCode: '12345' };
        localStorageMock.setItem('user', JSON.stringify(managerUser));
        localStorageMock.setItem('accessToken', 'fake-token');

        const { result } = renderHook(() => useAuth());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.isAuthenticated).toBe(true);
        expect(result.current.user).toEqual({ ...managerUser, type: 'manager' });
    });

    it('should identify a logged-in ong user from localStorage', async () => {
        const ongUser = { id: 2, name: 'ONG Teste' };
        localStorageMock.setItem('user', JSON.stringify(ongUser));
        localStorageMock.setItem('accessToken', 'fake-token');

        const { result } = renderHook(() => useAuth());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.isAuthenticated).toBe(true);
        expect(result.current.user).toEqual({ ...ongUser, type: 'ong' });
    });

    it('should identify a user as not authenticated if token is missing', async () => {
        const user = { id: 1, name: 'User Sem Token' };
        localStorageMock.setItem('user', JSON.stringify(user));

        const { result } = renderHook(() => useAuth());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.isAuthenticated).toBe(false);
        expect(result.current.user).toBeNull();
    });

    it('should handle logout correctly', async () => {
        const managerUser = { id: 1, name: 'Gestor Teste', inepCode: '12345' };
        localStorageMock.setItem('user', JSON.stringify(managerUser));
        localStorageMock.setItem('accessToken', 'fake-token');

        const { result } = renderHook(() => useAuth());
        await waitFor(() => expect(result.current.isAuthenticated).toBe(true));

        await act(async () => {
            await result.current.logout();
        });

        expect(logoutService).toHaveBeenCalledTimes(1);
        expect(result.current.isAuthenticated).toBe(false);
        expect(result.current.user).toBeNull();
        expect(mockPush).toHaveBeenCalledWith('/');
    });
});
