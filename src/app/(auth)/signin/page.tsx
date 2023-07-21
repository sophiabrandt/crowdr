import { AuthFormContainer } from '@/components/AuthFormContainer';
import { authModes } from '@/helpers/auth-modes';

export default function Signin() {
  return (
    <div>
      <AuthFormContainer mode={authModes.signin} />
    </div>
  );
}
