import { AuthForm } from '@/components/AuthForm';
import { authModes } from '@/shared/auth-form';

export default function Signin() {
  return (
    <div>
      <AuthForm mode={authModes.signin} />
    </div>
  );
}
