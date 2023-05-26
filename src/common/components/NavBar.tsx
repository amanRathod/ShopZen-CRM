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
import { Action, CartState, OrderItem, State, StoreContext } from '@utils/store';
import { useRouter } from 'next/router';
import { useAuth } from '@lib/auth';
import { getDummyPicture } from '@utils';
import { Menu } from '@headlessui/react';

type Props = {
  className?: string;
};

const UserMenuItem = ({ link, action, menuName }: any) => {
  return (
    <Menu.Item>
      <LinkedItem
        className="flex p-2 hover:bg-gray-200 hover:text-primary-600"
        href={link}
        onClick={link ? undefined : action}
      >
        {menuName}
      </LinkedItem>
    </Menu.Item>
  );
};

const Navbar: React.FC<Props> = ({ className }) => {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [query, setQuery] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const { user, logout } = useAuth();
  const router = useRouter();
  const { state } = useContext<CartState>(StoreContext);
  const { cart } = state;

  useEffect(() => {
    setCartItemsCount(
      cart.orderItems.reduce((a: number, c: OrderItem) => a + c.quantity, 0)
    );
  }, [cart.orderItems, user]);

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
        <div className="relative flex items-center h-10 border border-gray-200 focus:border-primary-400 focus:ring focus:ring-primary-400 rounded-lg focus-within:shadow-md bg-white ">
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
              <UserMenuItem link="/profile" menuName="Profile" />
              <UserMenuItem link="/order-history" menuName="Orders" />
              <UserMenuItem menuName="Logout" action={logout} link="" />
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
      <div className="sm:hidden">
        <Menu as="div" className="relative inline-block">
          <Menu.Button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              className="w-6 h-6 text-gray-500 hover:text-gray-900 cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
          </Menu.Button>
          <Menu.Items className="mx-w-auto absolute right-0 w-56 origin-top-right bg-white rounded shadow-lg ">
            <UserMenuItem link="/cart" menuName="Cart" />
            {user ? (
              <>
                <UserMenuItem link="/profile" menuName="Profile" />
                <UserMenuItem link="/order-history" menuName="Orders" />
                <UserMenuItem menuName="Logout" action={logout} link="" />
              </>
            ) : (
              <UserMenuItem link="/login" menuName="Login" />
            )}
          </Menu.Items>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
