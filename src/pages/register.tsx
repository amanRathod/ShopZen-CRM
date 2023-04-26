import Form from '@components/form';
import AuthPage from '@layouts/page/AuthPage';
import * as y from 'yup';
import React from 'react';
import Input from '@elements/form/Input';
import LinkedItem from '@elements/LinkedItem';

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
        submitButton={{ title: 'Sign Up' }}
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
          name="password"
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
          Already have an account? <span className='text-info-700 hover:underline'>Sign In</span>
        </LinkedItem>
      </div>
    </AuthPage>
  );
};

export default Register;
