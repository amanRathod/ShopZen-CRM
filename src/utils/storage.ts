const ACCESS_TOKEN_KEY = "token";

export const storage = {
  getToken: (): string | null => window.localStorage.getItem(ACCESS_TOKEN_KEY),
  setToken: (token: string) =>
    window.localStorage.setItem(ACCESS_TOKEN_KEY, token),
  clearToken: () => window.localStorage.removeItem(ACCESS_TOKEN_KEY),
};
