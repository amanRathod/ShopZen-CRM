import clsx from "clsx";
import React, { PropsWithoutRef, forwardRef } from "react";
import { useField, useFormikContext } from "formik";
import ErrorText from "@elements/form/ErrorText";

interface Props extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  name: string;
  label?: string;
}

const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ name, id = name, label, className = "", ...props }, ref) => {
    const [input] = useField(name);
    const { isSubmitting } = useFormikContext();

    return (
      <div>
        <div className={clsx("flex items-center", className)}>
          <input
            id={id}
            {...input}
            disabled={isSubmitting}
            {...props}
            ref={ref}
            type="checkbox"
            className="w-4 h-4 border-gray-300 rounded text-gray-500 focus:ring-gray-400"
          />

          {!!label && (
            <label
              htmlFor={id}
              className="block ml-2 text-sm text-gray-900 select-none"
            >
              {label}
            </label>
          )}
        </div>

        <ErrorText name={name} />
      </div>
    );
  }
);

export default Checkbox;