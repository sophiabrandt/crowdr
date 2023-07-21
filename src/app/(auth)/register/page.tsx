import { AuthFormContainer } from '@/components/AuthFormContainer';
import { authModes } from '@/helpers/auth-modes';

export default function Register() {
  return (
    <div>
      <AuthFormContainer mode={authModes.register} />
    </div>
  );
}
