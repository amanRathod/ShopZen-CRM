import Page from "@layouts/page";
import React from "react";
import type { Props as PageProps } from "@layouts/page";
import { useState } from "react";
import { MenuIcon } from "@heroicons/react/outline";
// import MobileSidebar from "@components/sidebar/MobileSidebar";
import Sidebar from "@components/sidebar";
import { H3 } from "@elements/Text";
import Divider from "@elements/Divider";

type Props = {} & PageProps;

const PortalPage: React.FC<Props> = ({ title, children, ...rest }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <Page titlePrefix={`${title} -`} {...rest} navbar={true} container={false}>
      <main className="flex w-full">
        {/* <MobileSidebar {...{ sidebarOpen, setSidebarOpen }} /> */}

        <Sidebar className="hidden md:flex" />

        <div className="flex flex-col flex-1 md:pl-64">
          <div className="sticky top-0 z-10 p-1 md:hidden sm:p-3">
            <button
              type="button"
              className="inline-flex items-center justify-center w-12 h-12 text-gray-500 rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>

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
