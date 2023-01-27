import axios from "axios";

const app_api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

app_api.interceptors.request.use((config) => {
  if (!!localStorage.getItem("cogoportAdminKey")) {
    let cp_user = JSON.parse(localStorage.getItem("cogoportAdminKey"));
    let token = cp_user["Authorization"];
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default app_api;
