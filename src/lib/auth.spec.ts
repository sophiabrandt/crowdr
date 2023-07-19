import {
  hashPassword,
  comparePasswords,
  getDecodedSecret,
  createJWT,
} from './auth';

describe('Authentication utilities', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = process.env;
    process.env = { ...originalEnv, JWT_SECRET: 'testSecret' };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('hashPassword should hash a given password', async () => {
    const password = 'password';
    const hashedPassword = await hashPassword(password);
    expect(hashedPassword).not.toEqual(password);
  });

  it('comparePasswords should correctly compare a password and its hash', async () => {
    const password = 'password';
    const hashedPassword = await hashPassword(password);
    const result = await comparePasswords(password, hashedPassword);
    expect(result).toBeTruthy();
  });

  it('getDecodedSecret should return the decoded JWT_SECRET', () => {
    const decodedSecret = getDecodedSecret();
    expect(decodedSecret).toEqual(new TextEncoder().encode('testSecret'));
  });

  it('createJWT should create a JWT with the user payload', async () => {
    const user = { id: '1', email: 'test@example.com' };
    const jwt = await createJWT(user);
    const jwtComponents = jwt.split('.');
    expect(jwtComponents).toHaveLength(3);
  });
});
