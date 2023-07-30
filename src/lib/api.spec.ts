import { assertType } from '@/helpers/utils';
import { addReward, createNewProject, fetcher, register, signin } from './api';

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
      text: jest
        .fn()
        .mockResolvedValue(JSON.stringify({ message: 'we have an error' })),
      status: 404,
    });

    expect(register(user)).rejects.toThrow('API Error: 404 we have an error');
  });

  it('should create a new project', async () => {
    const projectName = 'Test Project';
    assertType<jest.Mock>(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(),
    });

    await createNewProject(projectName);

    expect(fetch).toHaveBeenCalledWith('/api/project', {
      method: 'POST',
      body: JSON.stringify({ name: projectName }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  });

  it('should add a reward', async () => {
    const rewardDetails = {
      name: 'Reward 1',
      description: 'Reward 1 description',
      expected_due: '2023-08-31',
      projectId: 'test-project-id',
    };

    assertType<jest.Mock>(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(),
    });

    await addReward(
      rewardDetails.name,
      rewardDetails.description,
      rewardDetails.expected_due,
      rewardDetails.projectId,
    );

    expect(fetch).toHaveBeenCalledWith('/api/reward', {
      method: 'POST',
      body: JSON.stringify(rewardDetails),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  });
});
