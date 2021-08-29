import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';

import { api } from '../../services/api';
import { useAuth, AuthProvider } from '../../contexts/AuthContext';

interface DecodedToken {
  sub: string;
}

const apiMock = new MockAdapter(api);

jest.mock('jwt-decode', () => () => ({
  jwtDecode: (token: string) => ({
      sub: '1',
    } as DecodedToken),
}));

describe('Auth hook', () => {
  it('should be able to sign in', async () => {
    const loginResponse = {
      accessToken: 'jwt-token',
    };

    apiMock.onPost('login').reply(200, loginResponse);

    const getUserResponse = {
      id: '1',
      name: 'John Doe',
      email: 'johndoe@example.com',
    };

    apiMock.onGet('users').reply(200, getUserResponse);

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const apiResult = await result.current.signIn({
      email: 'johndoe@example.com',
      password: '123456',
    });

    console.log(apiResult);

    expect(result.current.accessToken).toEqual('jwt-token');
  });

  it('should restore saved data from storage when auth inits', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      switch (key) {
        case '@Doit:accessToken':
          return 'jwt-token';
        case '@Doit:user':
          return JSON.stringify({
            id: 'user-id',
            name: 'John Doe',
            email: 'johndoe@example.com',
          });
        default:
          return null;
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.accessToken).toEqual('jwt-token');
  });

  it('should be able to sign out', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      switch (key) {
        case '@Doit:accessToken':
          return 'jwt-token';
        case '@Doit:user':
          return JSON.stringify({
            id: 'user-id',
            name: 'John Doe',
            email: 'johndoe@example.com',
          });
        default:
          return null;
      }
    });

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(removeItemSpy).toHaveBeenCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });
});
