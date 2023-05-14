import clsx from "clsx";
import Divider from "./Divider";
import { H5, P } from "./Text";

type PriceInfoFieldProps = {
  field: string;
  value: string;
  children?: React.ReactNode;
};

export const PriceInfoField = ({ field, value, children }: PriceInfoFieldProps) => {
  return (
    <div className="flex items-center justify-between w-full">
      <P className="text-gray-800">{field} {children}</P>
      <P className="text-gray-600">{value}</P>
    </div>
  );
}; 

type AddressInfoFieldProps = {
  field: string;
  children: React.ReactNode;
};

export const AddressInfoField = ({ field, children }: AddressInfoFieldProps) => {
  return (
    <div className="flex jusitfy-start items-start flex-col space-y-2">
      <P className="font-semibold text-gray-800">{field}</P>
      <P className=" text-gray-600">{children}</P>
    </div>
  );
};

type OrderInfoField ={
  field: string,
  value: string,
  className?: string
}

export const OrderInfoField = ({ field, value, className }: OrderInfoField) => {
  return (
    <>
      <div className={clsx("flex justify-between  py-4 lg:py-0", className)}>
        <P>{field}&nbsp;&nbsp;</P>
        <P className="text-gray-600">{value}</P>
      </div>
      <Divider className="lg:hidden" />
    </>
  );
};
