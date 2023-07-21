import { assertType } from '@/helpers/utils';
import { fetcher, register, signin } from './api';

global.fetch = jest.fn();

describe('API methods', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const user = {
    email: 'test@email.com',
    password: 'testpassword',
  };

  it('should return parsed JSON when response is ok and json parameter is true', async () => {
    const mockJsonPromise = Promise.resolve({ message: 'Success' });
    const mockFetchPromise = Promise.resolve({
      ok: true,
      json: () => mockJsonPromise,
    });

    assertType<jest.Mock>(fetch).mockResolvedValueOnce(mockFetchPromise);

    const response = await fetcher({
      url: '/api/test',
      method: 'GET',
      body: null,
      json: true,
    });

    expect(fetch).toHaveBeenCalledWith('/api/test', {
      method: 'GET',
      body: null,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    expect(response).toEqual({ message: 'Success' });
  });

  it('should not parse response as JSON when json parameter is false', async () => {
    const mockFetchPromise = Promise.resolve({
      ok: true,
      text: () => Promise.resolve('Success'),
    });

    assertType<jest.Mock>(fetch).mockResolvedValueOnce(mockFetchPromise);

    const response = await fetcher({
      url: '/api/test',
      method: 'GET',
      body: null,
      json: false,
    });

    expect(fetch).toHaveBeenCalledWith('/api/test', {
      method: 'GET',
      body: null,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    expect(response).toBeUndefined();
  });

  it('should register a user', async () => {
    assertType<jest.Mock>(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(),
    });

    await register(user);
    expect(fetch).toHaveBeenCalledWith('/api/register', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  });

  it('should login a user', async () => {
    assertType<jest.Mock>(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(),
    });

    await signin(user);
    expect(fetch).toHaveBeenCalledWith('/api/signin', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  });

  it('should throw an error when response is not ok', async () => {
    assertType<jest.Mock>(fetch).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve(),
    });

    expect(register(user)).rejects.toThrow('API Error');
  });
});
