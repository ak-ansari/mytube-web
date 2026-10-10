import axios from "axios";
import { getToken, isAuthenticated, login } from "@/auth/keycloak";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

http.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

http.interceptors.response.use(
  (res) => res.data.data,
  (err) => {
    // session expired or revoked in Keycloak
    if (err.response?.status === 401 && isAuthenticated.value) login();
    return Promise.reject(err.response?.data || err);
  }
);

/** Human readable message from a rejected API call. */
export const errorMessage = (err: unknown, fallback = "Something went wrong"): string => {
  if (err && typeof err === "object" && "message" in err && typeof err.message === "string" && err.message) {
    return err.message;
  }
  return fallback;
};
