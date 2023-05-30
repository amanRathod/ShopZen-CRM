import { TableEntity } from ".";

export type Address = {
  fullName: string;
  phone: string;
  street: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
  isBilling?: boolean;
  isShipping?: boolean;
} & TableEntity;

export type State = {
  name: string;
  country_id: Country;
}

export type Country = {
  code: string;
  name: string;
}