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
  loading: boolean;
}

const initialState: FormState = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  loading: false,
};

export enum ActionTypes {
  SetEmail = 'setEmail',
  SetPassword = 'setPassword',
  SetFirstName = 'setFirstName',
  SetLastName = 'setLastName',
  SetLoading = 'setLoading',
  Reset = 'reset',
}

export type Action =
  | { type: ActionTypes.SetEmail; payload: string }
  | { type: ActionTypes.SetPassword; payload: string }
  | { type: ActionTypes.SetFirstName; payload: string }
  | { type: ActionTypes.SetLastName; payload: string }
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

  const setLoading = useCallback((isLoading: boolean) => {
    dispatch({ type: ActionTypes.SetLoading, payload: isLoading });
  }, []);

  const resetForm = useCallback(() => {
    dispatch({ type: ActionTypes.Reset });
  }, []);

  return {
    formState,
    handleChange: handleChangeCallback,
    setLoading,
    resetForm,
  };
};

export const useAuthForm = (
  action: typeof signin | typeof register,
  formState: FormState,
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
      } catch (err) {
        const message =
          err instanceof Error ? `${err.message}` : 'Could not perform action';
        setAlertDialog({ isOpen: true, message });
      } finally {
        resetForm();
      }
    },
    [router, resetForm, setLoading, formState, action, setAlertDialog]
  );

  return { handleSubmit, alertDialog };
};
