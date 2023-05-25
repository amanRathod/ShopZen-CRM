import { TableEntity } from ".";

export type Address = {
  fullName: string;
  mobile: string;
  street: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
} & TableEntity;

export type State = {
  name: string;
  country_id: Country;
}

export type Country = {
  code: string;
  name: string;
}