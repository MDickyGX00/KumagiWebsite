import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";
import brownKie from "../assets/images/brownkie.jpg";

function Register() {
  const [credentials, setCredentials] = useState({
    nama: "",
    email: "",
    kataSandi: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/register", {
        ...credentials,
        role: "USER", // Pastikan role selalu USER
      });

      console.log("Register success:", response.data);
      alert("Pendaftaran berhasil! Silakan login.");
      navigate("/login"); // Redirect ke halaman login setelah sukses
    } catch (error) {
      console.error(
        "Register error:",
        error.response ? error.response.data : error.message
      );
      alert("Gagal mendaftar, coba lagi.");
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
            Silahkan Daftar untuk membuat akunmu.
          </p>
          <div className="mb-4">
            <label
              htmlFor="nama"
              className="block text-sm font-medium text-gray-700"
            >
              Nama
            </label>
            <input
              id="nama"
              type="nama"
              name="nama"
              value={credentials.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-inner"
              required
            />
          </div>
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
            className="w-full py-2 mt-4 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition-all"
          >
            Daftar
          </button>
          <p className="mt-4 text-center text-sm">
            Sudah punya akun?{" "}
            <a href="/login" className="text-blue-500">
              Login di sini
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

export default Register;
