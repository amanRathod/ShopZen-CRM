import React from 'react';
import Page from '@layouts/page';
import { H2 } from '@elements/Text';

type Props = {
  pageTitle: string;
  title: string;
  text?: string;
  children?: React.ReactNode;
};

const AuthPage: React.FC<Props> = ({ pageTitle, title, text, children }) => {
  return (
    <Page titlePrefix={`${pageTitle} - `} navbar={false}>
      <div className="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="w-auto h-12 mx-auto"
            src="https://res.cloudinary.com/di9zvktdc/image/upload/v1682423840/ShopZen/logo-transparent-svg_y8ascp.svg"
            alt="Workflow"
          />
          <H2 className="mt-6 text-3xl font-extrabold text-center text-primary-900">
            {title}
          </H2>
          {text && (
            <p className="mt-3 text-sm text-center text-gray-600">{text}</p>
          )}
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-8 bg-white rounded-lg shadow sm:px-10">
            {children}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default AuthPage;
