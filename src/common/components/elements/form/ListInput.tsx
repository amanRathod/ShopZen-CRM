import { useField, useFormikContext } from "formik";
import { useState } from "react";
import Select from "react-select";
import ErrorText from "./ErrorText";
import { Component } from "@appTypes/.";

export type Option = {
  value: string;
  label: string;
};

type Props = {
  name: string;
  id?: string;
  label?: string;
  required?: boolean;
  isMulti?: boolean;
  className?: string;
  onChange?: (data: Option) => void;
  options: Option[];
};

const ListInput: Component<Props> = ({
  name,
  id = name,
  className,
  label,
  options,
  isMulti = false,
  onChange,
  required = false,
}) => {
  const [input, { value }] = useField(name);

  const [selectedValue, setSelectedValue] = useState<any>(
    input.value
      ? Array.isArray(value)
        ? value.map((v: string) => ({ value: v, label: v }))
        : { value: value, label: value }
      : ""
  );

  const { setFieldValue, isSubmitting } = useFormikContext();

  const handleSelectionChange = (data: Option) => {
    setFieldValue(
      name,
      Array.isArray(data) ? data.map((d: Option) => d.value) : data.value
    );

    setSelectedValue(data);
    onChange?.(data);
  };

  return (
    <div className={className}>
      {!!label && (
        <label
          htmlFor={id}
          className="block mb-1 text-left text-sm font-medium text-gray-700"
        >
          {label} {required && "*"}
        </label>
      )}

      <div>
        <Select
          id={id}
          {...input}
          isDisabled={isSubmitting}
          menuPosition="fixed"
          className="block capitalize w-full text-left placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none sm:text-sm"
          styles={{
            control: (base) => ({
              ...base,
              border: "0",
              boxShadow: "0",
              "&:hover": {
                border: "0",
              },
            }),
          }}
          value={
            isMulti
              ? value.length !== 0
                ? selectedValue
                : "" // if isMulti and value is an empty array, set value to "" else set value to selectedValue
              : value
              ? selectedValue
              : "" // if not isMulti and value is an empty string, set value to "" else set value to selectedValue
          }
          placeholder={`Select a ${name}`}
          onChange={handleSelectionChange}
          options={options}
          isSearchable={true}
          isMulti={isMulti}
        />
      </div>

      <ErrorText name={name} />
    </div>
  );
};

export default ListInput;
