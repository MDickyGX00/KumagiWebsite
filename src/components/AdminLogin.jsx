import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import brownKie from "../assets/images/brownkie.jpg"
import { useEffect } from "react";
function AdminLogin() {
  const [credentials, setCredentials] = useState({
    email: "",
    kataSandi: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/login-admin"); // Redirect ke dashboard jika sudah login
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://10.20.20.23:8080/admin/login", credentials)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      })
      .catch(() => alert("Invalid credentials"));
  };

  return (
    <div className="flex h-screen">
      {/* Bagian Kiri (Form) */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <form onSubmit={handleSubmit} className="w-full md:w-96 p-8 bg-white shadow-lg rounded-md">
          <h2 className="text-4xl mb-6 text-center">Selamat Datang</h2>
          <p className="pb-5 text-gray-500 text-center">Silahkan Log in untuk mengakses akunmu.</p>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
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
          <button type="submit" className="w-full py-2 mt-4 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 hover:text-black transition-all">
            Login
          </button>
        </form>
      </div>

      {/* Bagian Kanan (Gambar) */}
      <div className="hidden md:block md:w-1/2 bg-cover bg-center">
        <img src={brownKie} alt="Gambar Login" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

export default AdminLogin;
