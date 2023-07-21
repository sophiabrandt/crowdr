import { register, signin } from '@/lib/api';

export type AuthAction = 'register' | 'signin';

export const actions = { register: register, signin: signin };

interface AuthContent {
  linkUrl: string;
  linkText: string;
  header: string;
  subheader: string;
  buttonText: string;
}

export interface AuthModeContent {
  linkUrl: string;
  linkText: string;
  header: string;
  subheader: string;
  buttonText: string;
  action: AuthAction;
}

export const signinContent: AuthContent = {
  linkUrl: '/register',
  linkText: "Don't have an account?",
  header: 'Welcome Back',
  subheader: 'Enter your credentials to access your account',
  buttonText: 'Sign In',
};

export const registerContent: AuthContent = {
  linkUrl: '/signin',
  linkText: 'Already have an account?',
  header: 'Create a new Account',
  subheader: 'Just a few things to get started',
  buttonText: 'Register',
};

export const authModes: Record<AuthAction, AuthModeContent> = {
  register: {
    ...registerContent,
    action: 'register',
  },
  signin: {
    ...signinContent,
    action: 'signin',
  },
};
