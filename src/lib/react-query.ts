import { showErrorAlert } from "@utils/alert";
import axios from "@lib/axios";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  useMutation as rqUseMutation,
  useQuery as rqUseQuery,
} from "react-query";

export enum RequestType {
  Get = "get",
  Post = "post",
  Put = "put",
  Patch = "patch",
  Delete = "delete",
}


export const useQuery = <T>(
  url: string,
  queryKey: string = "",
  config?: AxiosRequestConfig,
  toShowAlert: boolean = true
) => {
  return rqUseQuery(
    queryKey,
    async () => {
      const { data } = await axios.get<T>(url, config);
      return data;
    },
    {
      onError: ({error, message}) => {
        if (toShowAlert) showErrorAlert(error, message);
      },
    }
  );
}

export const useMutation = <T>(
  url: string,
  requestType: RequestType = RequestType.Post,
  queryKey: string = ""
) => {
  return rqUseMutation<AxiosResponse, any, T>(
    queryKey,
    (data) => axios[requestType]<T>(url, data),
    {
      onError: ({ error, message }) => {
        showErrorAlert(error, message);
      },
    }
  );
};

