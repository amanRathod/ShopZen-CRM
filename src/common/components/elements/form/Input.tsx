import clsx from "clsx";
import React, { forwardRef, PropsWithoutRef } from "react";
import { useField, useFormikContext } from "formik";
import ErrorText from "@elements/form//ErrorText";
import { EyeIcon } from "@heroicons/react/outline";

interface Props extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  type?: "text" | "password" | "email" | "number" | "url" | "radio" | "checkbox";
  name: string;
  label?: string;
  inputClassName?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  (
    { name, id = name, label, className, inputClassName, ...inputProps },
    ref
  ) => {
    const [input, meta, helpers] = useField(name);
    const { isSubmitting, setFieldValue } = useFormikContext();

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const { value } = e.target;
      helpers.setValue(value.trim());
      helpers.setTouched(true);
    };

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
            onBlur={handleBlur}
            className={clsx(
              "block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none outline-none sm:text-sm",
              !inputProps.disabled &&
                !inputProps.readOnly &&
                "ring-tertiary-300 focus:ring",
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