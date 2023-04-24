import React from "react";
import { AxiosResponse } from "axios";

export type TableEntity = {
  id: string;
  createdAt?: string;
  updatedAt?: string;
};

export interface Component<T = {}>
  extends React.FC<
    {
      className?: string;
    } & T
  > {}

export type Response = {
  error?: string;
  message?: string;
} & AxiosResponse;
