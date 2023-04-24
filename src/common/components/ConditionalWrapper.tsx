import React from "react";

type Props = {
  condition: boolean;
  wrapper: (children: any) => any;
  children: React.ReactNode;
};

const ConditionalWrapper: React.FC<Props> = ({
  condition,
  wrapper,
  children,
}) => {
  return condition ? wrapper(children) : children;
};

export default ConditionalWrapper;
