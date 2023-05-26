import Form from '@components/form';
import AuthPage from '@layouts/page/AuthPage';
import * as y from 'yup';
import React, { useEffect } from 'react';
import Input from '@elements/form/Input';
import LinkedItem from '@elements/LinkedItem';
import { useAuth } from '@lib/auth';
import { useRouter } from 'next/router';

const registerSchema = y.object().shape({
  firstName: y.string().required('First Name is required'),
  lastName: y.string().required('Last Name is required'),
  email: y.string().email('Invalid email').required('Email is required'),
  password: y.string().required('Password is required'),
  confirmPassword: y
    .string()
    .required('Confirm Password is required')
    .oneOf([y.ref('password')], 'Passwords must match'),
});

const Register = () => {
  const { user, register, refetchUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/");
  }, [user]);

  return (
    <AuthPage pageTitle="Login" title="Register your account">
      <Form
        schema={registerSchema}
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={async (data) => {
          delete data.confirmPassword;
          await register(data);
          await refetchUser();
        }}
        submitButton={{ title: 'Sign Up', className: 'w-full' }}
      >
        <Input
          name="firstName"
          label="First Name"
          type="text"
          required
          autoComplete="username"
        />

        <Input
          name="lastName"
          label="Last Name"
          type="text"
          required
          autoComplete="username"
        />

        <Input
          name="email"
          label="Email"
          type="email"
          required
          autoComplete="username"
        />

        <Input
          name="password"
          label="Password"
          type="password"
          required
          autoComplete="current-password"
        />

        <Input
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          required
          autoComplete="current-password"
        />
      </Form>

      <div className='mt-2'>
        <LinkedItem
          href="/login"
          className="font-medium text-info-500 hover:text-info-400"
        >
          Already have an account? <span className='text-info-600 hover:underline'>Sign In</span>
        </LinkedItem>
      </div>
    </AuthPage>
  );
};

export default Register;
