import { AuthFormContainer } from '@/components/AuthFormContainer';
import { authModes } from '@/helpers/auth-modes';

const Signin = () => {
  return (
    <div>
      <AuthFormContainer mode={authModes.signin} />
    </div>
  );
};

export default Signin;
