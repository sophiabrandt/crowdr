import { render, fireEvent, waitFor, act } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { Action, AuthForm, formStateReducer } from './AuthForm';
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

describe('formStateReducer', () => {
  const initialState = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    error: '',
    loading: false,
  };

  it('should handle setEmail', () => {
    const action = assertType<Action>({
      type: 'setEmail',
      payload: 'test@test.com',
    });
    const expectedState = { ...initialState, email: 'test@test.com' };
    expect(formStateReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle setPassword', () => {
    const action = assertType<Action>({
      type: 'setPassword',
      payload: 'testpassword',
    });
    const expectedState = { ...initialState, password: 'testpassword' };
    expect(formStateReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle setFirstName', () => {
    const action = assertType<Action>({
      type: 'setFirstName',
      payload: 'John',
    });
    const expectedState = { ...initialState, firstName: 'John' };
    expect(formStateReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle setLastName', () => {
    const action = assertType<Action>({ type: 'setLastName', payload: 'Doe' });
    const expectedState = { ...initialState, lastName: 'Doe' };
    expect(formStateReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle setError', () => {
    const action = assertType<Action>({
      type: 'setError',
      payload: 'Error Message',
    });
    const expectedState = { ...initialState, error: 'Error Message' };
    expect(formStateReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle setLoading', () => {
    const action = assertType<Action>({
      type: 'setLoading',
      payload: true,
    });
    const expectedState = { ...initialState, loading: true };
    expect(formStateReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle reset', () => {
    const currentState = {
      email: 'test@test.com',
      password: 'testpassword',
      firstName: 'John',
      lastName: 'Doe',
      error: '',
      loading: false,
    };
    const action = assertType<Action>({ type: 'reset' });
    expect(formStateReducer(currentState, action)).toEqual(initialState);
  });
});

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

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
      fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    });

    userEvent.click(submitButton);

    await waitFor(() => expect(actions.register).toHaveBeenCalledTimes(1));

    await waitFor(() => {
      expect(actions.register).toHaveBeenCalledWith({
        email: 'test@test.com',
        password: 'testpassword',
        firstName: '',
        lastName: '',
        error: '',
        loading: false,
      });
    });

    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/home');
    });
  });

  it('should sign in when the form is submitted', async () => {
    const { mockRouter, emailInput, passwordInput, submitButton } =
      setup('signin');

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
      fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    });

    userEvent.click(submitButton);

    await waitFor(() => expect(actions.signin).toHaveBeenCalledTimes(1));
    await waitFor(() => {
      expect(actions.signin).toHaveBeenCalledWith({
        email: 'test@test.com',
        password: 'testpassword',
        firstName: '',
        lastName: '',
        error: '',
        loading: false,
      });
    });

    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/home');
    });
  });
});
