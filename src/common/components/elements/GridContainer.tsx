import React from 'react';

type Props = {
  children: React.ReactNode;
};

const GridContainer = ({ children }: Props) => {
  return (
    <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-12 gap-x-14 mt-10 mb-5">
      {children}
    </div>
  );
};

export default GridContainer;