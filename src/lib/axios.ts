import Axios, { AxiosRequestConfig, HeadersDefaults } from "axios";
import { storage } from "@utils/storage";

// Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

type headers = {
  'Content-Type': string;
  Accept: string;
  Authorization: string;
};

const axios = Axios.create({
  baseURL: process.env.SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  }as headers & HeadersDefaults,
});

axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error.response.data);
  }
);

axios.interceptors.request.use((config) => {
  const token = storage.getToken();
  token && (config.headers.Authorization = `Bearer ${token}`);

  return config;
});

export default axios;
