import { renderHook, act, waitFor } from '@testing-library/react';
import { signin } from '@/lib/api';
import {
  ActionTypes,
  FormState,
  formStateReducer,
  useAuthForm,
  useAuthFormState,
} from './use-auth-form';
import { assertType } from './utils';
import React from 'react';

jest.mock('@/lib/api', () => ({
  register: jest.fn(),
  signin: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));

jest.mock('@/components/Alert', () => ({
  useAlert: jest.fn(),
}));

const defaultAlertMock = {
  alertDialog: { isOpen: false, message: '' },
  setAlertDialog: jest.fn(),
};

const initialState: FormState = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  error: '',
  loading: false,
};

describe('formStateReducer', () => {
  it('throws an error when an invalid action type is dispatched', () => {
    const state: FormState = { ...initialState };
    const invalidAction = { type: 'invalidActionType', payload: 'test' };

    try {
      formStateReducer(state, invalidAction as any);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect((e as any).message).toEqual(
        `Unexpected object: ${JSON.stringify(invalidAction)}`
      );
    }
  });
});

describe('useAuthFormState', () => {
  beforeEach(() => {
    require('@/components/Alert').useAlert.mockImplementation(
      () => defaultAlertMock
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('handles the form state correctly', () => {
    const { result } = renderHook(() => useAuthFormState());

    act(() => {
      result.current.handleChange(ActionTypes.SetEmail)(
        assertType<React.ChangeEvent<HTMLInputElement>>({
          target: { value: 'test@gmail.com' },
        })
      );
      result.current.handleChange(ActionTypes.SetPassword)(
        assertType<React.ChangeEvent<HTMLInputElement>>({
          target: { value: 'test-password' },
        })
      );
      result.current.handleChange(ActionTypes.SetFirstName)(
        assertType<React.ChangeEvent<HTMLInputElement>>({
          target: { value: 'John' },
        })
      );
      result.current.handleChange(ActionTypes.SetLastName)(
        assertType<React.ChangeEvent<HTMLInputElement>>({
          target: { value: 'Doe' },
        })
      );
    });

    expect(result.current.formState.email).toEqual('test@gmail.com');
    expect(result.current.formState.password).toEqual('test-password');
    expect(result.current.formState.firstName).toEqual('John');
    expect(result.current.formState.lastName).toEqual('Doe');
  });

  it('handles SetLoading action correctly', () => {
    const { result } = renderHook(() => useAuthFormState());

    act(() => {
      result.current.setLoading(true);
    });

    expect(result.current.formState.loading).toEqual(true);

    act(() => {
      result.current.setLoading(false);
    });

    expect(result.current.formState.loading).toEqual(false);
  });

  it('handles SetError action correctly', () => {
    const { result } = renderHook(() => useAuthFormState());

    act(() => {
      result.current.setError('test error message');
    });

    expect(result.current.formState.error).toEqual('test error message');
  });

  it('handles form state resetting correctly', () => {
    const { result } = renderHook(() => useAuthFormState());

    act(() => {
      result.current.handleChange(ActionTypes.SetEmail)(
        assertType<React.ChangeEvent<HTMLInputElement>>({
          target: { value: 'test@gmail.com' },
        })
      );
      result.current.resetForm();
    });

    expect(result.current.formState).toEqual(initialState);
  });
});

describe('useAuthForm', () => {
  beforeEach(() => {
    require('@/components/Alert').useAlert.mockImplementation(
      () => defaultAlertMock
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('handles successful form submission', async () => {
    const { result } = renderHook(() =>
      useAuthForm(signin, initialState, jest.fn(), jest.fn(), jest.fn())
    );

    assertType<jest.Mock>(signin).mockResolvedValue(true);

    act(() => {
      result.current.handleSubmit(
        assertType<React.FormEvent<HTMLFormElement>>({
          preventDefault: () => {},
        })
      );
    });

    await waitFor(() => {
      expect(signin).toBeCalledWith(initialState);
    });
  });

  it('handles unsuccessful form submission', async () => {
    const setError = jest.fn();
    const { result } = renderHook(() =>
      useAuthForm(signin, initialState, setError, jest.fn(), jest.fn())
    );

    const error = new Error('Test Error');
    assertType<jest.Mock>(signin).mockRejectedValue(error);

    act(() => {
      result.current.handleSubmit(
        assertType<React.ChangeEvent<HTMLInputElement>>({
          preventDefault: () => {},
        })
      );
    });

    await waitFor(() => {
      expect(setError).toBeCalledWith('Test Error');
    });
  });

  it('handles non-Error rejection correctly', async () => {
    const setError = jest.fn();
    const setAlertDialog = jest.fn();

    require('@/components/Alert').useAlert.mockImplementation(() => ({
      alertDialog: { isOpen: false, message: '' },
      setAlertDialog,
    }));

    const { result } = renderHook(() =>
      useAuthForm(signin, initialState, setError, jest.fn(), jest.fn())
    );

    // Throw a non-Error value to simulate a different kind of rejection
    assertType<jest.Mock>(signin).mockRejectedValue({
      someProperty: 'not an error instance',
    });

    act(() => {
      result.current.handleSubmit(
        assertType<React.FormEvent<HTMLFormElement>>({
          preventDefault: () => {}, // mock the preventDefault function of event
        })
      );
    });

    await waitFor(() => {
      expect(setError).toBeCalledWith('Could not perform action');
    });

    await waitFor(() => {
      expect(setAlertDialog).toBeCalledWith({
        isOpen: true,
        message: 'Could not perform action',
      });
    });
  });
});
