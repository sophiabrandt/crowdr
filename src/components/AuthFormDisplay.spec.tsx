import { render, fireEvent, screen } from '@testing-library/react';
import { AuthFormDisplay } from './AuthFormDisplay';
import { signin, register } from '@/lib/api';
import { ActionTypes } from '@/helpers/use-auth-form';

const mockHandleChange = jest.fn();
const mockHandleChangeCallback = jest.fn(() => mockHandleChange);
const mockHandleSubmit = jest.fn();

describe('AuthFormDisplay', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(
      <AuthFormDisplay
        action={signin}
        content={{
          header: 'Sign in',
          subheader: 'Welcome back',
          linkUrl: '/register',
          linkText: 'Register',
          buttonText: 'Sign in',
          action: 'signin',
        }}
        formState={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          error: '',
          loading: false,
        }}
        alertDialog={{
          isOpen: false,
          message: '',
        }}
        handleChange={mockHandleChangeCallback}
        handleSubmit={mockHandleSubmit}
      />
    );

    expect(getByTestId('auth-form')).toBeInTheDocument();
  });

  it('should display the alert when alertDialog.isOpen is true', () => {
    render(
      <AuthFormDisplay
        action={register}
        content={{
          header: 'Register',
          subheader: 'Create a new account',
          linkUrl: '/signin',
          linkText: 'Sign in',
          buttonText: 'Register',
          action: 'register',
        }}
        formState={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          error: '',
          loading: false,
        }}
        alertDialog={{
          isOpen: true,
          message: 'Test alert message',
        }}
        handleChange={mockHandleChangeCallback}
        handleSubmit={mockHandleSubmit}
      />
    );

    expect(screen.getByText('Test alert message')).toBeInTheDocument();
  });

  it('should call handleChange when input fields change', () => {
    render(
      <AuthFormDisplay
        action={register}
        content={{
          header: 'Register',
          subheader: 'Create a new account',
          linkUrl: '/signin',
          linkText: 'Sign in',
          buttonText: 'Register',
          action: 'register',
        }}
        formState={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          error: '',
          loading: false,
        }}
        alertDialog={{
          isOpen: false,
          message: '',
        }}
        handleChange={mockHandleChangeCallback}
        handleSubmit={mockHandleSubmit}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('First Name'), {
      target: { value: 'John' },
    });

    expect(mockHandleChangeCallback).toHaveBeenCalledWith(
      ActionTypes.SetFirstName
    );
    expect(mockHandleChange).toHaveBeenCalled();
  });
});
