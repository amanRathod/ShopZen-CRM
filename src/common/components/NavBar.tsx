import clsx from "clsx";
import React from "react";

type Props = {
  className?: string;
};

const Navbar: React.FC<Props> = ({ className }) => {
  return <div className={clsx("h-10 bg-primary-500", className)} />;
};

export default Navbar;
