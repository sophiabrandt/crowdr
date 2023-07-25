export function assertType<T>(object: unknown = undefined): T {
  return object as T;
}

export function assertNever(value: never): never {
  throw new Error(`Unexpected object: ${JSON.stringify(value)}`);
}

export function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), time);
  });
}
