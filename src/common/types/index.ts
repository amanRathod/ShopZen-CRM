import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { AppProps } from "next/app";
import { AxiosResponse } from "axios";

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type NextPageWithLayout<T = {}> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type TableEntity = {
  id: string;
  dateCreated?: string;
  lastUpdated?: string;
};

export interface Component<T = {}>
  extends React.FC<
    {
      className?: string;
      children?: ReactNode;
    } & T
  > {}

  export type Response = {
    error?: string;
    message?: string;
  } & AxiosResponse;