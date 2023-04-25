import Page from '@layouts/page';
import React from 'react';
import type { Props as PageProps } from '@layouts/page';
import Sidebar from '@components/sidebar';
import { H3 } from '@elements/Text';
import Divider from '@elements/Divider';

type Props = {} & PageProps;

const PortalPage: React.FC<Props> = ({ title, children, ...rest }) => {
  return (
    <Page titlePrefix={`${title} -`} {...rest} navbar={true} container={false}>
      <main className="flex w-full">
        <Sidebar className="hidden md:flex" />

        <div className="flex flex-col flex-1 md:pl-64">
          <main className="flex-1 px-4 py-2 overflow-hidden md:py-6 sm:px-6 md:px-8">
            <div className="mx-auto max-w-7xl">
              <H3 className="text-2xl font-semibold text-gray-900">{title}</H3>
            </div>

            <Divider className="mt-2 mb-4 -mx-10" />

            <div className="min-h-full mx-auto max-w-7xl">{children}</div>
          </main>
        </div>
      </main>
    </Page>
  );
};

export default PortalPage;
