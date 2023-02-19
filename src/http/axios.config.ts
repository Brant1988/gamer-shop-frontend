import axios from "axios";
import { AxiosHeaders } from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const apiClient = axios.create({
  baseURL: API_URL + "api/",
  headers: {
    "Content-Type": "application/json",
  },
});

const authClient = axios.create({
  baseURL: API_URL + "api/",
  headers: {
    "Content-Type": "application/json",
  },
});

authClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (!token) return config;
  if (config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);
  }
  return config;
});
export { apiClient, authClient };
