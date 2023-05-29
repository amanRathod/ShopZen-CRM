import { useField, useFormikContext } from 'formik';
import { PropsWithoutRef, forwardRef } from 'react';

interface Props extends PropsWithoutRef<JSX.IntrinsicElements['input']> {
  name: string;
  label?: string;
}

const Radio = forwardRef<HTMLInputElement, Props>(
  ({ name, id = name, label, className = '', ...props }, ref) => {
    return (
      <li className="flex items-center" key={id}>
        <input
          id={id}
          {...props}
          ref={ref}
          type="radio"
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
      </li>
    );
  }
);

export default Radio;
