import clsx from "clsx";
import React from "react";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

const Card: React.FC<Props> = ({ className, children }) => {
  return (
    <div
      className={clsx(
        "p-3 sm:p-4 bg-white rounded-lg shadow-md overflow-y-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
export type { Props as CardProps };
