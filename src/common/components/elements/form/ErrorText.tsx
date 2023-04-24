import React from "react";
import { ErrorMessage } from "formik";
import { Component } from "@appTypes/.";

const ErrorText: Component<{ name: string }> = ({ name }) => {
  return (
    <ErrorMessage name={name}>
      {(msg) => (
        <div
          role="alert"
          className="mt-1 text-xs font-semibold text-danger-400 animate-slide-down -z-10"
        >
          {msg}
        </div>
      )}
    </ErrorMessage>
  );
};

export default ErrorText;