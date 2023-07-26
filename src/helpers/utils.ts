export const assertType = <T>(object: unknown = undefined): T => object as T;

export const assertNever = (value: never): never => {
  throw new Error(`Unexpected object: ${JSON.stringify(value)}`);
};

export const delay = (time: number) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(true), time);
  });
