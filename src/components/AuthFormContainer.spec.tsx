import React, { ChangeEvent } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import {
  useAuthFormState,
  useAuthForm,
  ActionTypes,
} from '@/helpers/use-auth-form';
import { AuthFormContainer } from './AuthFormContainer';
import { authModes } from '@/helpers/auth-modes';
import { assertType } from '@/helpers/utils';

jest.mock('@/helpers/use-auth-form');

jest.mock('@/helpers/auth-modes');

describe('AuthFormContainer', () => {
  const mockedHandleChange = jest.fn();
  beforeEach(() => {
    assertType<jest.Mock>(useAuthFormState).mockReturnValue({
      formState: {
        email: '',
        password: '',
      },
      handleChange: jest.fn(
        () => (e: ChangeEvent<HTMLInputElement>) =>
          mockedHandleChange(e.target.value)
      ),
    });
    assertType<jest.Mock>(useAuthForm).mockReturnValue({
      handleSubmit: jest.fn(),
      alertDialog: {
        isOpen: false,
        message: '',
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('initializes handleChange with correct actionType', () => {
    render(<AuthFormContainer mode={authModes.signin} />);

    expect(useAuthFormState().handleChange).toHaveBeenCalledWith(
      ActionTypes.SetEmail
    );
    expect(useAuthFormState().handleChange).toHaveBeenCalledWith(
      ActionTypes.SetPassword
    );
  });

  it('updates formState when input fields are changed', async () => {
    const { getByTestId } = render(
      <AuthFormContainer mode={authModes.signin} />
    );

    const emailInput = getByTestId('input-email');
    const passwordInput = getByTestId('input-password');

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
      fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    });

    await waitFor(() => {
      expect(mockedHandleChange).toHaveBeenNthCalledWith(1, 'test@test.com');
      expect(mockedHandleChange).toHaveBeenNthCalledWith(2, 'testpassword');
    });
  });

  it('calls handleSubmit on form submission', () => {
    const mockedHandleSubmit = jest.fn();
    assertType<jest.Mock>(useAuthForm).mockReturnValue({
      handleSubmit: mockedHandleSubmit,
      alertDialog: {
        isOpen: false,
        message: '',
      },
    });

    const { getByTestId } = render(
      <AuthFormContainer mode={authModes.signin} />
    );

    const form = getByTestId('auth-form');

    act(() => {
      fireEvent.submit(form);
    });

    expect(mockedHandleSubmit).toHaveBeenCalled();
  });
});
