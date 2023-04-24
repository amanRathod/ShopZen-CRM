import clsx from "clsx";
import React from "react";

type Props = {
  className?: string;
};

const Divider: React.FC<Props> = ({ className }) => {
  return <hr className={clsx("h-px border-none bg-primary-100", className)} />;
};

export default Divider;
