import clsx from 'clsx';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const GridContainer = ({ children, className }: Props) => {
  return (
    <div
      className={clsx(
        'w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-12 gap-x-14 mt-10 mb-5',
        className
      )}
    >
      {children}
    </div>
  );
};

export default GridContainer;
