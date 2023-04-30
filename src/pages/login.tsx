import Form from '@components/form';
import AuthPage from '@layouts/page/AuthPage';
import * as y from 'yup';
import React from 'react';
import Input from '@elements/form/Input';
import LinkedItem from '@elements/LinkedItem';

const loginSchema = y.object().shape({
  email: y.string().email('Invalid email').required('Email is required'),
  password: y.string().required('Password is required'),
});

const Login = () => {
  return (
    <AuthPage pageTitle="Login" title="Sign in to your account">
      <Form
        schema={loginSchema}
        initialValues={{
          email: '',
          password: '',
        }}
        submitButton={{ title: "Sign In" }}
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
