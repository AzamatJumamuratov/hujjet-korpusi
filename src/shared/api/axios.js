import { default as axiosImported } from "axios";
import { redirect } from "react-router";

const axios = axiosImported.create({
  baseURL: "http://10.95.4.174:8000/api",
});

// Автоматически добавлять токен
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (!token) {
    redirect("/auth/login");
  }

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default axios;
