import { TableEntity } from ".";

export type User = {
  email: string;
  firstName: string;
  lastName?: string;
  role: "ADMIN" | "CUSTOMER";
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
