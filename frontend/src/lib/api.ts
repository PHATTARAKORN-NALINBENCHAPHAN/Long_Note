import axios from "axios";
import { useAuthStore } from "../stores/authStore"; // 1. นำเข้า authStore

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use((config) => {
  const authStore = useAuthStore(); // 2. เรียกใช้ Store
  const token = authStore.token;    // 3. ดึง token จาก store ตรงๆ

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;