import { ChangeEvent, FormEvent, useCallback, useReducer } from 'react';
import { assertNever } from './utils';
import { useRouter } from 'next/navigation';
import { useAlert } from '@/components/Alert';
import { register, signin } from '@/lib/api';

export interface FormState {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  error: string;
  loading: boolean;
}

const initialState: FormState = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  error: '',
  loading: false,
};

export enum ActionTypes {
  SetEmail = 'setEmail',
  SetPassword = 'setPassword',
  SetFirstName = 'setFirstName',
  SetLastName = 'setLastName',
  SetError = 'setError',
  SetLoading = 'setLoading',
  Reset = 'reset',
}

export type Action =
  | { type: ActionTypes.SetEmail; payload: string }
  | { type: ActionTypes.SetPassword; payload: string }
  | { type: ActionTypes.SetFirstName; payload: string }
  | { type: ActionTypes.SetLastName; payload: string }
  | { type: ActionTypes.SetError; payload: string }
  | { type: ActionTypes.SetLoading; payload: boolean }
  | { type: ActionTypes.Reset };

export type StringActionType = Extract<Action, { payload: string }>;

export const formStateReducer = (
  state: FormState,
  action: Action
): FormState => {
  switch (action.type) {
    case ActionTypes.SetEmail:
      return { ...state, email: action.payload };
    case ActionTypes.SetPassword:
      return { ...state, password: action.payload };
    case ActionTypes.SetFirstName:
      return { ...state, firstName: action.payload };
    case ActionTypes.SetLastName:
      return { ...state, lastName: action.payload };
    case ActionTypes.SetError:
      return { ...state, error: action.payload };
    case ActionTypes.SetLoading:
      return { ...state, loading: action.payload };
    case ActionTypes.Reset:
      return initialState;
    default:
      return assertNever(action);
  }
};

export const handleChange =
  (dispatch: (action: Action) => void, actionType: StringActionType['type']) =>
  (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: actionType, payload: e.target.value });
  };

export const useAuthFormState = () => {
  const [formState, dispatch] = useReducer(formStateReducer, initialState);

  const handleChangeCallback = useCallback(
    (actionType: StringActionType['type']) =>
      handleChange(dispatch, actionType),
    [dispatch]
  );

  const setError = useCallback((message: string) => {
    dispatch({ type: ActionTypes.SetError, payload: message });
  }, []);

  const setLoading = useCallback((isLoading: boolean) => {
    dispatch({ type: ActionTypes.SetLoading, payload: isLoading });
  }, []);

  const resetForm = useCallback(() => {
    dispatch({ type: ActionTypes.Reset });
  }, []);

  return {
    formState,
    handleChange: handleChangeCallback,
    setError,
    setLoading,
    resetForm,
  };
};

export const useAuthForm = (
  action: typeof signin | typeof register,
  formState: FormState,
  setError: (message: string) => void,
  setLoading: (isLoading: boolean) => void,
  resetForm: () => void
) => {
  const { alertDialog, setAlertDialog } = useAlert();
  const router = useRouter();

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setLoading(true);

      try {
        await action(formState);
        router.replace('/home');
      } catch (e) {
        const message =
          e instanceof Error ? `${e.message}` : 'Could not perform action';
        setAlertDialog({ isOpen: true, message });
        setError(message);
      } finally {
        resetForm();
      }
    },
    [router, resetForm, setError, setLoading, formState, action, setAlertDialog]
  );

  return { handleSubmit, alertDialog };
};
