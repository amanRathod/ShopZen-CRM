import { LoginCredentials, User } from "@appTypes/user";
import { showErrorAlert, showSuccessAlert } from "@utils/alert";
import { endpoint } from "@utils/constants/endpoints";
import { storage } from "@utils/storage";
import { showSuccessToast } from "@utils/toast";
import axios from "axios";
import { initReactQueryAuth } from "react-query-auth";


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
  // @ts-ignore: expects a JSX element providing FC
  LoaderComponent: InlineLoader,
});

async function loadUser(): Promise<User> {
  const token = storage.getToken();

  // @ts-ignore: allow null user
  if (!token) return null;

  const data = await axios
    .get(endpoint.customer.profile)
    .then(({ data }) => data)
    .catch(() => storage.clearToken());

  const user = data.staff;
  return user;
}

function handleUserResponse(response: any) {
  const { accessToken, user } = response;

  showSuccessToast("Login successful!");

  storage.setToken(accessToken);
  return user; // User is undefined
}

async function loginFn(credentials: LoginCredentials): Promise<User> {
  return await axios
    .post(endpoint.auth.login, credentials)
    .then(({ data }) => {
      return handleUserResponse(data);
    })
    .catch(({ error }) => {
      storage.clearToken();
      showErrorAlert("Login Unsuccessful", error);
    });
}

async function registerFn(): Promise<User> {
  return await axios
    .post(endpoint.auth.register)
    .then(({ data }) => {
      return handleUserResponse(data);
    })
    .catch(({ error }) => {
      storage.clearToken();
      showErrorAlert("Registration Unsuccessful", error);
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