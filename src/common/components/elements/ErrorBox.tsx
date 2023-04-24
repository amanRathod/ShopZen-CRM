import React from "react";
import { PrimaryButton } from "@elements/button";
import type { ButtonProps } from "@elements/button";
import { P, H3 } from "@elements/Text";

type Props = {
  title?: string;
  text?: string;
  prefix?: string;
  image?: boolean;
  redirectButton?: ButtonProps;
};

const GIF_NOT_FOUND = "not-found.gif";

const ErrorBox: React.FC<Props> = ({
  title,
  text,
  redirectButton = {
    text: "Go Home",
    href: "/",
  },
  prefix = "Oops!",
  image = true,
}) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center">
        {image && (
          <div className="flex items-center justify-center">
            <img
              src={GIF_NOT_FOUND}
              alt="not found"
              className="w-full h-full max-w-[600px] mx-auto"
            />
          </div>
        )}

        {title && (
          <div className="mx-auto">
            <H3 className="mb-2 font-bold text-center text-gray-800 tracking-wider">
              {prefix && <span className="text-blue-600">{prefix} </span>}
              {title}
            </H3>
          </div>
        )}
        {text && (
          <P className="mb-8 text-center text-gray-500 md:text-lg">{text}</P>
        )}

        <PrimaryButton {...redirectButton} />
      </div>
    </div>
  );
};

export default ErrorBox;
