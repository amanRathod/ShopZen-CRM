import React from "react";

type Props = {
  condition: boolean;
  children: React.ReactNode;
  wrapper: any;
};

const ConditionalWrapper: React.FC<Props> = ({
  condition,
  wrapper,
  children,
}) => {
  return condition ? wrapper(children) : children;
};

export default ConditionalWrapper;
