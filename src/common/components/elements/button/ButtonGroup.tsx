import React from "react";

interface Props {
  children: React.ReactNode;
}

const ButtonGroup: React.FC<Props> = ({ children }) => {
  return <div className="grid grid-flow-col ml-auto gap-x-4">{children}</div>;
};

export default ButtonGroup;