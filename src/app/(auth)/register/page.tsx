import { AuthForm } from '@/components/AuthForm';
import { authModes } from '@/shared/auth-form';

export default function Register() {
  return (
    <div>
      <AuthForm mode={authModes.register} />
    </div>
  );
}
