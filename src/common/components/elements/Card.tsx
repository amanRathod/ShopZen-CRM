import clsx from "clsx";
import React from "react";

type Props = {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

const Card: React.FC<Props> = ({ className, children }) => {
  return (
    <div
      className={clsx(
        " bg-white rounded-lg shadow-md overflow-y-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
export type { Props as CardProps };
