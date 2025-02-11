import axios from "axios";

// Buat instance Axios
const axiosInstance = axios.create({
  baseURL: "http://10.20.20.23:8080", // Ganti dengan base URL API-mu
  headers: {
    "Content-Type": "application/json",
  },
});

// Tambahkan interceptor untuk menyertakan token otomatis
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token"); // Gunakan sessionStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
