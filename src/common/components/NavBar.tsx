import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

type Props = {
  className?: string;
};

const Navbar: React.FC<Props> = ({ className }) => {
  return (
    <div className={clsx("flex h-16 items-center px-4 bg-primary-200 justify-between shadow-md", className)} >
      <Link href="/" className="text-lg font-bold">
        ShopZen
      </Link>
      <div>
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
