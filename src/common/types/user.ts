import { TableEntity } from ".";
import { Address } from "./address";

export type User = {
  email: string;
  firstName: string;
  lastName?: string;
  role: string;
  image?: string;
  primaryAddress?: Address;
  addresses?: Address[];
} & TableEntity;

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
