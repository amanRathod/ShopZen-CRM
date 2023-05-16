import {
  LoginIcon,
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
  UserAddIcon,
} from '@heroicons/react/outline';
import clsx from 'clsx';
import React, { useContext, useEffect, useState } from 'react';
import MobileSidebar from './sidebar/MobileSidebar';
import LinkedItem from './elements/LinkedItem';
import { PrimaryButton } from './elements/button';
import { CartItem, StoreContext } from '@utils/store';
import { useRouter } from 'next/router';
import { useAuth } from '@lib/auth';
import { getDummyPicture } from '@utils';
import { Menu } from '@headlessui/react';

type Props = {
  className?: string;
};

const Navbar: React.FC<Props> = ({ className }) => {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [query, setQuery] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const { user, logout } = useAuth();
  const router = useRouter();
  const { state }: any = useContext(StoreContext);
  const { cart } = state;

  useEffect(() => {
    setCartItemsCount(
      cart.cartItems.reduce((a: number, c: CartItem) => a + c.quantity, 0)
    );
  }, [cart.cartItems, user]);

  const submitHandler = (e: any) => {
    e.preventDefault();
    const newQuery = query.trim().replace(/\s+/g, '+');
    router.push(`/search?query=${newQuery}`);
  };

  return (
    <div
      className={clsx(
        'relative flex items-center justify-between h-16 px-4 bg-white shadow shadow-gray-300',
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

      <form
        className="max-w-md mx-auto w-full justify-center sm:flex"
        onSubmit={submitHandler}
      >
        <div className="relative flex items-center h-10 border border-gray-200 rounded-lg focus-within:shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-primary-800 bg-white ">
          <input
            className="h-full w-full outline-none text-sm px-3 py-2 placeholder-gray-400 text-gray-700"
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Products"
          />
          <button className="py-2 px-4 hover:bg-gray-200">
            <SearchIcon className="w-6 h-6 text-gray-300"></SearchIcon>
          </button>
        </div>
      </form>

      <div className="hidden items-center sm:flex grid gap-x-5">
        <PrimaryButton
          href="/cart"
          Icon={ShoppingCartIcon}
          className=""
          disabled={false}
        >
          Cart
          {cartItemsCount > 0 && (
            <span className="ml-1 inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-primary-600 text-white">
              {cartItemsCount}
            </span>
          )}
        </PrimaryButton>

        {user ? (
          <Menu as="div" className="relative inline-block">
            <Menu.Button className="overflow-hidden rounded-full border-2 border-gray-400 focus:outline-none focus:border-primary-600">
              <img
                src={
                  user.image ||
                  getDummyPicture(`${user.firstName} ${user.lastName}`)
                }
                className="inline-block h-[2.375rem] w-[2.375rem] rounded-full ring-2 ring-gray-200"
              />
            </Menu.Button>
            <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white rounded shadow-lg ">
              <Menu.Item>
                <LinkedItem
                  className="flex p-2 hover:bg-gray-200 hover:text-primary-600"
                  href="/profile"
                >
                  Profile
                </LinkedItem>
              </Menu.Item>
              <Menu.Item>
                <LinkedItem
                  className="flex p-2 hover:bg-gray-200 hover:text-primary-600"
                  href="/order-history"
                >
                  Orders
                </LinkedItem>
              </Menu.Item>
              <Menu.Item>
                <LinkedItem
                  href="#"
                  onClick={logout}
                  className="flex p-2 hover:bg-gray-200 hover:text-primary-600"
                >
                  Logout
                </LinkedItem>
              </Menu.Item>
            </Menu.Items>
          </Menu>
        ) : (
          <PrimaryButton
            href="/login"
            Icon={LoginIcon}
            className=""
            disabled={false}
          >
            Login
          </PrimaryButton>
        )}
      </div>
    </div>
  );
};

export default Navbar;
