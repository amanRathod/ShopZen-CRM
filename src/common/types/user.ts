import { TableEntity } from ".";

export type User = {
  email: string;
  firstName: string;
  lastName?: string;
} & TableEntity;

export type LoginCredentials = {
  email: string;
  password: string;
};
