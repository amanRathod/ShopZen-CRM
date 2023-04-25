import { MenuIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import Link from 'next/link';
import React, { useState } from 'react';
import MobileSidebar from './sidebar/MobileSidebar';

type Props = {
  className?: string;
};

const Navbar: React.FC<Props> = ({ className }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div
      className={clsx(
        'flex h-16 items-center px-4 bg-primary-50 justify-between md:justify-end shadow shadow-gray-300',
        className
      )}
    >
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
      <div>
        <MobileSidebar {...{ sidebarOpen, setSidebarOpen }} />
        <Link href="/cart" className="p-2">
          Cart
        </Link>
        <Link href="/login" className="p-2">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
