import LinkedItem from '@elements/LinkedItem';
import Input from '@elements/form/Input';
import Form from '@components/form';
import AuthPage from '@common/layouts/page/AuthPage';
import { Response } from '@common/types';
import { RequestType, useMutation } from '@lib/react-query';
import { showSuccessAlert } from '@utils/alert';
import { endpoint } from '@utils/constants/endpoints';
import { showWarningToast } from '@utils/toast';
import { useRouter } from 'next/router';
import * as y from 'yup';

const resetPasswordSchema = y.object().shape({
  password: y
    .string()
    .min(8, 'Password must be atleast 8 characters')
    .required('Password is required'),
  confirmPassword: y
    .string()
    .min(8, 'Password must be atleast 8 characters')
    .required('Confirm password is required')
    .oneOf([y.ref('password')], 'Passwords must match'),
});

const ResetPassword = ({ token }: any) => {
  const router = useRouter();

  const { mutateAsync } = useMutation(
    endpoint.auth.resetPassword,
    RequestType.Put
  );

  return (
    <AuthPage pageTitle="Reset Password" title="Reset your Password">
      <Form
        className="space-y-6"
        schema={resetPasswordSchema}
        initialValues={{
          password: '',
          confirmPassword: '',
        }}
        onSubmit={async ({ password, confirmPassword }) => {
          if (password !== confirmPassword) {
            showWarningToast('Password did not match.');
            return;
          }
          const object: any = {
            password,
            token,
          };
          const { message }: Response = await mutateAsync(object);

          if (message) {
            showSuccessAlert('Reset password', message);

            router.replace('/login');
          }
        }}
        submitButton={{ title: 'Update Password' }}
      >
        <Input
          name="password"
          label="New Password"
          type="password"
          required
          autoComplete="current-password"
        />

        <Input
          name="confirmPassword"
          label="Confirm New Password"
          type="password"
          required
          autoComplete="current-password"
        />

        <div className="text-sm text-right">
          <LinkedItem
            href="/login"
            className="font-medium text-info-500 hover:text-info-400"
          >
            Changed your mind? <span className='text-info-600 hover:underline'>Login</span>
          </LinkedItem>
        </div>
      </Form>
    </AuthPage>
  );
};

export default ResetPassword;

export const getServerSideProps = async (context: any) => {
  const { token } = await context.query;

  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: '/forgot-password',
      },
    };
  } else {
    return {
      props: {
        token: token,
      },
    };
  }
};
