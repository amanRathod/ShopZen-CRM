import Form from '@components/form';
import AuthPage from '@layouts/page/AuthPage';
import * as y from 'yup';
import React, { useEffect } from 'react';
import Input from '@elements/form/Input';
import LinkedItem from '@elements/LinkedItem';
import { useAuth } from '@lib/auth';
import { useRouter } from 'next/router';

const loginSchema = y.object().shape({
  email: y.string().email('Invalid email').required('Email is required'),
  password: y.string().required('Password is required'),
});

const Login = () => {
  const {login, user, refetchUser} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/");
  }, [user]);
  
  return (
    <AuthPage pageTitle="Login" title="Sign in to your account">
      <Form
        schema={loginSchema}
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async (data) => {
          await login(data);
          await refetchUser();
        }}
        submitButton={{ title: "Sign In", className: 'w-full' }}
      >
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

        <div className="text-sm text-right">
          <LinkedItem
            href="/forgot-password"
            className="font-medium text-info-500 hover:text-info-400 hover:underline"
          >
            Forgot your password?
          </LinkedItem>
        </div>
      </Form>
      <div className='mt-2'>
        <LinkedItem
          href="/register"
          className="font-medium text-info-500 hover:text-info-400"
        >
          Don't have an account? <span className='text-info-600 hover:underline'>Sign Up</span>
        </LinkedItem>
      </div>
    </AuthPage>
  );
};

export default Login;
