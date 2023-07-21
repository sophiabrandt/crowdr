export function assertType<T>(object: unknown = undefined): T {
  return object as T;
}

export function assertNever(value: never): never {
  throw new Error(`Unexpected object: ${JSON.stringify(value)}`);
}
