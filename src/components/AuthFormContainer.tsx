'use client';
import { useAuthForm, useAuthFormState } from '@/helpers/use-auth-form';
import { AuthFormDisplay } from './AuthFormDisplay';
import { AuthModeContent, actions } from '@/helpers/auth-modes';

interface AuthFormContainerProps {
  mode: AuthModeContent;
}

export const AuthFormContainer = ({ mode }: AuthFormContainerProps) => {
  const action = actions[mode.action];
  const { formState, handleChange, setLoading, resetForm } = useAuthFormState();
  const { handleSubmit, alertDialog } = useAuthForm(
    action,
    formState,
    setLoading,
    resetForm
  );

  return (
    <AuthFormDisplay
      action={action}
      content={mode}
      formState={formState}
      alertDialog={alertDialog}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
