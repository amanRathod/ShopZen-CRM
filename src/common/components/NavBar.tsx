import {
  LoginIcon,
  MenuIcon,
  ShoppingCartIcon,
} from '@heroicons/react/outline';
import clsx from 'clsx';
import Link from 'next/link';
import React, { useState } from 'react';
import MobileSidebar from './sidebar/MobileSidebar';
import LinkedItem from './elements/LinkedItem';
import { PrimaryButton } from './elements/button';

type Props = {
  className?: string;
};

const Navbar: React.FC<Props> = ({ className }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div
      className={clsx(
        'relative flex items-center justify-between h-16 px-4 bg-primary-50 shadow shadow-gray-300',
        className
      )}
    >
      <div className="block md:hidden sm:p-3">
        <button
          type="button"
          className="inline-flex items-center justify-center w-12 h-12 text-gray-500 rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        <MobileSidebar {...{ sidebarOpen, setSidebarOpen }} />
      </div>

      <div className="max-w-md mx-auto hidden w-full justify-center sm:flex">
        <div className="relative flex items-center h-12 border border-primary-400 rounded-lg focus-within:shadow-md focus:ring-0 bg-white overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="text"
            id="search"
            placeholder="Search something.."
          />
        </div>
      </div>

      <div className="hidden items-center sm:flex grid gap-x-5">
        <PrimaryButton
          href="/cart"
          Icon={ShoppingCartIcon}
          className=""
          disabled={false}
        >
          Cart
        </PrimaryButton>

        <PrimaryButton
          href="/login"
          Icon={LoginIcon}
          className=""
          disabled={false}
        >
          Login
        </PrimaryButton>
      </div>
    </div>
  );
};

export default Navbar;
