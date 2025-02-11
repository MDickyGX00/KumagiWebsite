import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";
import { jwtDecode } from "jwt-decode"; // Pastikan sudah install jwt-decode
import brownKie from "../assets/images/brownkie.jpg";

function Login() {
  const [credentials, setCredentials] = useState({ email: "", kataSandi: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded); // Tambahkan ini
        if (decoded.role === "ADMIN") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Invalid token:", error);
        sessionStorage.removeItem("token");
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/login", credentials);
      console.log("Response data:", response.data); // 👉 Cek data dari backend

      const token = response.data.token;
      if (!token) {
        console.error("Token tidak ditemukan!");
        return;
      }

      sessionStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      console.log("Decoded JWT:", decoded); // 👉 Cek isi token

      if (decoded.role === "ADMIN") {
        console.log("Login sebagai ADMIN, redirect ke /dashboard");
        navigate("/dashboard");
      } else {
        console.log("Login sebagai USER, redirect ke /");
        navigate("/");
      }
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex h-screen pt-20">
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-96 p-8 bg-white shadow-lg rounded-md"
        >
          <h2 className="text-4xl mb-6 text-center">Selamat Datang</h2>
          <p className="pb-5 text-gray-500 text-center">
            Silahkan Log in untuk mengakses akunmu.
          </p>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-inner"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="kataSandi"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="kataSandi"
              type="password"
              name="kataSandi"
              value={credentials.kataSandi}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-inner"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 hover:text-black transition-all"
          >
            Login
          </button>
          <p className="mt-4 text-center text-sm">
            Belum punya akun?{" "}
            <a href="/register" className="text-blue-500">
              Daftar di sini
            </a>
          </p>
        </form>
      </div>
      <div className="hidden md:block md:w-1/2 bg-cover bg-center">
        <img
          src={brownKie}
          alt="Gambar Login"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Login;
