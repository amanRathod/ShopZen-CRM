import { LoginCredentials, RegisterCredentials, User } from "@appTypes/user";
import { showErrorAlert, showSuccessAlert } from "@utils/alert";
import { endpoint } from "@utils/constants/endpoints";
import { storage } from "@utils/storage";
import { showSuccessToast } from "@utils/toast";
import axios from "@lib/axios";
import { initReactQueryAuth } from "react-query-auth";
import InlineLoader from "@elements/loader/InlineLoader";
import React from "react";

interface Error {
  statusCode: number;
  message: string[];
  error: string[];
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
};

export const { AuthProvider, useAuth } = initReactQueryAuth<
  User,
  Error,
  LoginCredentials,
  null
>({
  ...authConfig,
  LoaderComponent: () => React.createElement(InlineLoader),
});

async function loadUser(): Promise<User> {
  const token = storage.getToken();

  // @ts-ignore: allow null user
  if (!token) return null;

  const data = await axios
    .get(endpoint.customer.profile)
    .then(({ data }) => data)
    .catch(() => storage.clearToken());

  return data.profile;
}

function handleUserResponse(response: any, statusCode: number) {
  const { accessToken, user } = response.auth;

  if (!accessToken || !user) {
    storage.clearToken();
    showErrorAlert("Login Unsuccessful", "Invalid response from server");
    return;
  }

  if (statusCode === 201) showSuccessToast("Registration successful!");
  else showSuccessToast("Login successful!");

  storage.setToken(accessToken);
  return user;
}

async function loginFn(credentials: LoginCredentials): Promise<User> {
  return await axios
    .post(endpoint.auth.login, credentials)
    .then(({ data }) => {
      return handleUserResponse(data, 200);
    })
    .catch(({ error }) => {
      storage.clearToken();
      showErrorAlert("Login Unsuccessful", error);
    });
}

async function registerFn(credentials: RegisterCredentials): Promise<User> {
  return await axios
    .post(endpoint.auth.register, credentials)
    .then(({ data }) => {
      return handleUserResponse(data, 201);
    })
    .catch((ex) => {
      storage.clearToken();
      const { error, message} = ex;
      showErrorAlert(error, message);
    });
}

async function logoutFn(): Promise<any> {
  storage.clearToken();
  return await axios
    .post(endpoint.auth.logout)
    .catch(() => storage.clearToken())
    .finally(() => {
      showSuccessToast("You have been Logged out successfully");
      storage.clearToken();
    });
}