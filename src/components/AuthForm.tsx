'use client';
import { register } from '@/lib/api';
import { ChangeEvent, useCallback, useReducer, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from './Card';
import { Button } from './Button';
import { AuthModeContent, actions } from '@/helpers/auth-form';
import { FormInput } from './FormInput';

interface FormState {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  error: string;
}

const initialState: FormState = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  error: '',
};

type Action =
  | { type: 'setEmail'; payload: string }
  | { type: 'setPassword'; payload: string }
  | { type: 'setFirstName'; payload: string }
  | { type: 'setLastName'; payload: string }
  | { type: 'setError'; payload: string }
  | { type: 'reset' };

function formStateReducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case 'setEmail':
      return { ...state, email: action.payload };
    case 'setPassword':
      return { ...state, password: action.payload };
    case 'setFirstName':
      return { ...state, firstName: action.payload };
    case 'setLastName':
      return { ...state, lastName: action.payload };
    case 'setError':
      return { ...state, error: action.payload };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

interface AuthFormProps {
  mode: AuthModeContent;
}

export const AuthForm = ({ mode }: AuthFormProps) => {
  const [formState, dispatch] = useReducer(formStateReducer, initialState);
  const modeAction = actions[mode.action];

  const router = useRouter();
  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      try {
        await modeAction(formState);
        router.replace('/home');
      } catch (e) {
        dispatch({
          type: 'setError',
          payload: `Could not perform action`,
        });
      } finally {
        dispatch({
          type: 'reset',
        });
      }
    },
    [formState, modeAction, router]
  );

  return (
    <Card>
      <div className="w-full">
        <div className="text-center">
          <h2 className="mb-2 text-3xl">{mode.header}</h2>
          <p className="tex-lg text-black/25">{mode.subheader}</p>
        </div>
        <form onSubmit={handleSubmit} className="w-full space-y-3 py-10">
          {modeAction === register && (
            <div className="mb-8 flex justify-between">
              <div className="pr-2">
                <FormInput
                  name="First Name"
                  placeholder="First Name"
                  value={formState.firstName}
                  required={true}
                  className="border-gray w-full rounded-3xl border-2 border-solid px-6 py-2 text-lg"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    dispatch({ type: 'setFirstName', payload: e.target.value })
                  }
                />
              </div>
              <div className="pl-2">
                <FormInput
                  name="Last Name"
                  placeholder="Last Name"
                  required={true}
                  value={formState.lastName}
                  className="border-gray w-full rounded-3xl border-2 border-solid px-6 py-2 text-lg"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    dispatch({ type: 'setLastName', payload: e.target.value })
                  }
                />
              </div>
            </div>
          )}
          <FormInput
            name="Email"
            placeholder="Email"
            required={true}
            value={formState.email}
            type="email"
            className="border-gray w-full rounded-3xl border-2 border-solid px-6 py-2 text-lg"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: 'setEmail', payload: e.target.value })
            }
          />
          <FormInput
            name="Password"
            placeholder="Password"
            required={true}
            value={formState.password}
            type="password"
            className="border-gray w-full rounded-3xl border-2 border-solid px-6 py-2 text-lg"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: 'setPassword', payload: e.target.value })
            }
          />
          <div className="flex items-center justify-between">
            <div>
              <span>
                <Link href={mode.linkUrl} className="font-bold text-purple-800">
                  {mode.linkText}
                </Link>
              </span>
            </div>
            <div>
              <Button type="submit" intent="secondary">
                {mode.buttonText}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
};
