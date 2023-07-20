import { render, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { AuthForm } from './AuthForm';
import { AuthMode, actions, authModes } from '@/helpers/auth-form';
import userEvent from '@testing-library/user-event';
import { assertType } from '@/helpers/testing-utils';

jest.mock('@/helpers/auth-form', () => ({
  ...jest.requireActual('@/helpers/auth-form'),
  actions: {
    register: jest.fn(),
    signin: jest.fn(),
  },
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('AuthForm', () => {
  const setup = (mode: AuthMode) => {
    jest.clearAllMocks();
    const mockRouter = {
      replace: jest.fn(),
    };
    assertType<jest.Mock>(useRouter).mockReturnValue(mockRouter);

    const utils = render(<AuthForm mode={authModes[mode]} />);
    const emailInput = utils.getByPlaceholderText('Email');
    const passwordInput = utils.getByPlaceholderText('Password');
    const submitButton = utils.getByText(authModes[mode].buttonText);

    return {
      ...utils,
      mockRouter,
      emailInput,
      passwordInput,
      submitButton,
    };
  };

  it('should register when the form is submitted', async () => {
    const { mockRouter, emailInput, passwordInput, submitButton } =
      setup('register');

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    userEvent.click(submitButton);

    await waitFor(() => expect(actions.register).toHaveBeenCalledTimes(1));
    expect(actions.register).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: 'testpassword',
      firstName: '',
      lastName: '',
      error: '',
    });

    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledTimes(1);
      expect(mockRouter.replace).toHaveBeenCalledWith('/home');
    });
  });

  it('should sign in when the form is submitted', async () => {
    const { mockRouter, emailInput, passwordInput, submitButton } =
      setup('signin');

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    userEvent.click(submitButton);

    await waitFor(() => expect(actions.signin).toHaveBeenCalledTimes(1));
    await waitFor(() => {
      expect(actions.signin).toHaveBeenCalledWith({
        email: 'test@test.com',
        password: 'testpassword',
        firstName: '',
        lastName: '',
        error: '',
      });

      expect(mockRouter.replace).toHaveBeenCalledTimes(1);
      expect(mockRouter.replace).toHaveBeenCalledWith('/home');
    });
  });
});
