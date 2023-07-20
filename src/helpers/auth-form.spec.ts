import { register, signin } from '@/lib/api';
import {
  actions,
  authModes,
  AuthModeContent,
  registerContent,
  signinContent,
} from './auth-form';

jest.mock('@/lib/api', () => ({
  register: jest.fn(),
  signin: jest.fn(),
}));

describe('Auth file', () => {
  describe('actions', () => {
    it('should contain register and signin actions', () => {
      expect(actions).toHaveProperty('register');
      expect(actions).toHaveProperty('signin');
      expect(actions.register).toBe(register);
      expect(actions.signin).toBe(signin);
    });
  });

  describe('authModes', () => {
    it('should contain register and signin modes', () => {
      expect(authModes).toHaveProperty('register');
      expect(authModes).toHaveProperty('signin');
    });

    it('should have valid AuthModeContent for register mode', () => {
      const registerMode: AuthModeContent = authModes.register;
      expect(registerMode).toEqual({
        ...registerContent,
        action: 'register',
      });
    });

    it('should have valid AuthModeContent for signin mode', () => {
      const signinMode: AuthModeContent = authModes.signin;
      expect(signinMode).toEqual({
        ...signinContent,
        action: 'signin',
      });
    });
  });

  describe('signinContent', () => {
    it('should have valid AuthContent for signin', () => {
      expect(signinContent).toEqual({
        linkUrl: '/register',
        linkText: "Don't have an account?",
        header: 'Welcome Back',
        subheader: 'Enter your credentials to access your account',
        buttonText: 'Sign In',
      });
    });
  });

  describe('registerContent', () => {
    it('should have valid AuthContent for register', () => {
      expect(registerContent).toEqual({
        linkUrl: '/signin',
        linkText: 'Already have an account?',
        header: 'Create a new Account',
        subheader: 'Just a few things to get started',
        buttonText: 'Register',
      });
    });
  });
});
