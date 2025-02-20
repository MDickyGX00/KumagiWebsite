import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://10.20.20.213:8080", // Sesuaikan dengan backend kamu
  withCredentials: true, // Penting agar cookie dikirim!
});

export const cekLogin = async () => {
  try {
    const response = await axiosInstance.get("/isLoggedIn");
    return response.data; // Mengembalikan true atau false
  } catch {
    return false; // Jika error, anggap belum login
  }
};

export default axiosInstance;
