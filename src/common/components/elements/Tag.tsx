import { P } from "@elements/Text";

import type { TextProps } from "@elements/Text";
import clsx from "clsx";
import React from "react";

import type { Component } from "@appTypes/.";

const Tag: Component<TextProps> = ({ className, children, title }) => {
  return (
    <P
      className={clsx(
        "inline-block capitalize bg-gray-300 rounded-full px-3 py-1 !text-sm cursor-default",
        className
      )}
      title={title}
    >
      {children}
    </P>
  );
};

export default Tag;