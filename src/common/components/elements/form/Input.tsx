import clsx from "clsx";
import React, { forwardRef, PropsWithoutRef } from "react";
import { useField, useFormikContext } from "formik";
import ErrorText from "@elements/form//ErrorText";

interface Props extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  type?: "text" | "password" | "email" | "number" | "url";
  name: string;
  label?: string;
  inputClassName?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  (
    { name, id = name, label, className, inputClassName, ...inputProps },
    ref
  ) => {
    const [input] = useField(name);
    const { isSubmitting, setFieldValue } = useFormikContext();

    return (
      <div className={className}>
        {!!label && (
          <label
            htmlFor={id}
            className="block mb-1 text-left text-sm font-medium text-gray-700"
          >
            {label} {inputProps.required && "*"}
          </label>
        )}

        <div>
          <input
            id={id}
            {...input}
            disabled={isSubmitting}
            {...inputProps}
            ref={ref}
            onBlur={({ target }) => setFieldValue(name, target.value.trim())}
            className={clsx(
              "block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none sm:text-sm",
              !inputProps.disabled &&
                !inputProps.readOnly &&
                "focus:ring-primary-500 focus:border-primary-500",
              inputClassName
            )}
          />
        </div>

        <ErrorText name={name} />
      </div>
    );
  }
);

Input.displayName = "Input"; 
export default Input;