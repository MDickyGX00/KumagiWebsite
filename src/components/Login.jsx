import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import brownKie from "../assets/images/brownkie.jpg";

function Login() {
  const [credentials, setCredentials] = useState({ email: "", kataSandi: "" });
  const [error] = useState(""); // Tambahkan state untuk pesan error
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("jwt_token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded?.role) {
          navigate(decoded.role === "ADMIN" ? "/dashboard" : "/");
        }
      } catch (error) {
        console.error("Token tidak valid:", error);
        Cookies.remove("jwt_token");
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axiosInstance.post("/login", credentials, {
        withCredentials: true, // ✅ Pastikan ini aktif!
      });
  
      console.log("Response dari backend:", response.data); // 🔍 Debug respons
  
      const userRole = response.data.role;
      if (!userRole) throw new Error("Role tidak ditemukan dalam respons backend.");
  
      navigate(userRole === "ADMIN" ? "/dashboard" : "/");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Login gagal, periksa email dan kata sandi!");
    }
  };
  

  return (
    <div className="flex h-screen pt-20">
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-96 p-8 bg-white shadow-lg rounded-md"
        >
          <h2 className="text-4xl mb-6 text-center">Login</h2>
          <p className="pb-5 text-gray-500 text-center">
            Masukkan email dan password untuk masuk.
          </p>

          {error && (
            <div className="mb-4 p-2 text-sm text-red-600 bg-red-100 border border-red-400 rounded">
              {error}
            </div>
          )}

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
            className="w-full py-2 mt-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-all"
          >
            Login
          </button>
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
