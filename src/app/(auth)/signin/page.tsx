import { AuthForm } from '@/components/AuthForm';
import { authModes } from '@/helpers/auth-form';

export default function Signin() {
  return (
    <div>
      <AuthForm mode={authModes.signin} />
    </div>
  );
}
