import { accessEnv } from './access-env';

describe('accessEnv', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = process.env;
    process.env = { ...originalEnv, TEST_KEY: 'testValue' };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should throw an error if key is undefined', () => {
    expect(() => accessEnv(undefined)).toThrow(
      'No key provided to access environment variable!'
    );
  });

  it('should throw an error if key is not in env variables and not in cache', () => {
    expect(() => accessEnv('INVALID_KEY')).toThrow(
      'Environment variable INVALID_KEY not found!'
    );
  });

  it('should return the value from env variables if key is valid', () => {
    const value = accessEnv('TEST_KEY');
    expect(value).toBe('testValue');
  });

  it('should return the value from cache if key is cached', () => {
    accessEnv('TEST_KEY');
    delete process.env.TEST_KEY;
    const value = accessEnv('TEST_KEY');
    expect(value).toBe('testValue');
  });
});
