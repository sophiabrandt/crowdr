import { AuthFormContainer } from '@/components/AuthFormContainer';
import { authModes } from '@/helpers/auth-modes';

const Register = () => {
  return (
    <div>
      <AuthFormContainer mode={authModes.register} />
    </div>
  );
};

export default Register;
