import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // Ubah ke server lokal
  withCredentials: true, // Pastikan cookies dikirim dalam setiap request
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
