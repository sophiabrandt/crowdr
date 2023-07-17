type Cache = Record<string, string | undefined>;

const cache: Cache = {};

const getFromCache = (key: string): string | undefined => {
  return key in cache ? cache[key] : undefined;
};

const getFromEnv = (key: string): string => {
  if (!(key in process.env)) {
    throw new Error(
      `Environment variable ${key} not found and no default value provided!`
    );
  }
  return process.env[key]!;
};

export const accessEnv = (key: string | undefined): string => {
  if (key === undefined) {
    throw new Error('No key provided to access environment variable!');
  }
  const value = getFromCache(key) ?? getFromEnv(key);
  cache[key] = value;
  return value;
};
