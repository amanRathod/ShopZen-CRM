import Axios, { AxiosRequestConfig } from "axios";
import { storage } from "@utils/storage";

const axios = Axios.create({
  baseURL: process.env.SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error.response.data);
  }
);

axios.interceptors.request.use((config) => {
  const token = storage.getToken();

  if (token) {
    config!.headers!.Authorization = token ? `Bearer ${token}` : "";
  }

  return config;
});

export default axios;
