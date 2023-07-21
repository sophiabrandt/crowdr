import Link from 'next/link';
import { Alert } from './Alert';
import { AuthModeContent } from '@/helpers/auth-modes';
import { Button } from './Button';
import { Card } from './Card';
import { FormInput } from './FormInput';
import React, { FormEventHandler } from 'react';
import { ActionTypes, FormState } from '@/helpers/use-auth-form';
import { register, signin } from '@/lib/api';

interface AuthFormDisplayProps {
  action: typeof signin | typeof register;
  content: AuthModeContent;
  formState: FormState;
  alertDialog: { isOpen: boolean; message: string };
  handleChange: Function;
  handleSubmit: FormEventHandler<HTMLFormElement>;
}

export const AuthFormDisplay = ({
  action,
  content,
  formState,
  alertDialog,
  handleChange,
  handleSubmit,
}: AuthFormDisplayProps) => {
  return (
    <Card>
      <div className="w-full">
        <div className="text-center">
          <h2 className="mb-2 text-3xl">{content.header}</h2>
          <p className="tex-lg text-black/25">{content.subheader}</p>
        </div>
        <form
          data-testid="auth-form"
          onSubmit={handleSubmit}
          className="w-full py-10"
        >
          {action === register && (
            <div className="mb-8 flex justify-between">
              <div className="pr-2">
                <FormInput
                  name="First Name"
                  placeholder="First Name"
                  value={formState.firstName}
                  required={true}
                  className="border-gray w-full rounded-3xl border-2 border-solid px-6 py-2 text-lg"
                  onChange={handleChange(ActionTypes.SetFirstName)}
                />
              </div>
              <div className="pl-2">
                <FormInput
                  name="Last Name"
                  placeholder="Last Name"
                  required={true}
                  value={formState.lastName}
                  className="border-gray w-full rounded-3xl border-2 border-solid px-6 py-2 text-lg"
                  onChange={handleChange(ActionTypes.SetLastName)}
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
            onChange={handleChange(ActionTypes.SetEmail)}
          />
          <FormInput
            name="Password"
            placeholder="Password"
            required={true}
            value={formState.password}
            type="password"
            className="border-gray w-full rounded-3xl border-2 border-solid px-6 py-2 text-lg"
            onChange={handleChange(ActionTypes.SetPassword)}
          />
          <div className="flex items-center justify-between">
            <div>
              <span>
                <Link
                  href={content.linkUrl}
                  className="font-bold text-purple-800"
                >
                  {content.linkText}
                </Link>
              </span>
            </div>
            <div>
              <Button
                disabled={formState.loading}
                type="submit"
                intent="secondary"
              >
                {content.buttonText}
              </Button>
            </div>
          </div>
        </form>
        {alertDialog.isOpen && <Alert message={alertDialog.message} />}
      </div>
    </Card>
  );
};
