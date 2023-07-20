import { assertType } from '@/helpers/testing-utils';
import { register, signin } from './api';

global.fetch = jest.fn();

describe('API methods', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const user = {
    email: 'test@email.com',
    password: 'testpassword',
  };

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
