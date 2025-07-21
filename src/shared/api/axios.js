import { default as axiosImported } from "axios";

const axios = axiosImported.create({
  baseURL: "https://api.saxovatuztatu.uz/api",
});

// ✅ Добавляем токен в каждый запрос
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  return config;
});

// ✅ Перехватываем ответы и обрабатываем 401
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token"); // очищаем токен
      window.location.href = "/auth/login"; // редиректим на страницу входа
    }
    return Promise.reject(error);
  }
);

export default axios;
