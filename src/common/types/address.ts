import { TableEntity } from ".";

export type Address = {
  street: string;
  zipCode: string;
  city: string;
  state: State;
  country: Country;
} & TableEntity;

export type State = {
  name: string;
  country_id: Country;
}

export type Country = {
  code: string;
  name: string;
}