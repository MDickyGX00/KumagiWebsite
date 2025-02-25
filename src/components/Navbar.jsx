import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance, { cekLogin } from "./axiosInstance";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(""); // Menyimpan nama pengguna
  const [tampil, setTampil] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const status = await cekLogin();
      setIsLoggedIn(status);

      if (status) {
        try {
          const response = await axiosInstance.get("/user/me", {
            withCredentials: true, // Pastikan cookie dikirim
          });

          if (response.data && response.data.nama) {
            setUserName(response.data.nama);
          } else {
            console.error(
              "Field 'nama' tidak ditemukan dalam respons:",
              response.data
            );
          }
        } catch (error) {
          console.error("Gagal mengambil data pengguna:", error);
        }
      } else {
        setUserName(""); // Reset nama jika tidak login
      }
    };

    checkAuth();

    const interval = setInterval(() => {
      checkAuth();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/logout");

      document.cookie =
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

      setIsLoggedIn(false);
      setUserName(""); // Reset nama saat logout
      navigate("/login");
    } catch (error) {
      console.error("Logout gagal", error);
    }
  };

  return (
    <nav className="bg-white fixed w-full z-10 shadow-lg">
      <div className="max-w-7xl py-2 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-black text-xl font-bold">
              Kumagi Bake.
            </a>
          </div>

          {/* Menu Items - Desktop */}
          <div className="hidden md:flex space-x-8">
            <a href="/#home" className="text-black-300">
              Beranda
            </a>
            <a href="/#about" className="text-black-300">
              Tentang Kami
            </a>
            <a href="/#testimoni" className="text-black-300">
              Testimoni
            </a>
            <a href="/#produk" className="text-black-300">
              Produk
            </a>
            <a href="/#kontak" className="text-black-300">
              Kontak
            </a>
          </div>

          {/* Profile / Login Dropdown - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative ml-3">
              <button
                type="button"
                className="relative flex max-w-xs items-center rounded-full px-2 py-1 border-black border-2 text-black text-3xl hover:bg-black hover:text-white transition-all"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Open user menu</span>
                <i className="ri-user-line"></i>
              </button>

              {/* Dropdown */}
              {showDropdown && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5">
                  {isLoggedIn ? (
                    <>
                      <div className="px-4 py-2 text-sm font-semibold text-gray-900">
                        Halo, {userName} 👋
                      </div>
                      <hr className="border-gray-200" />
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </>
                  ) : (
                    <>
                      <a
                        href="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Login
                      </a>
                      <a
                        href="/register"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Daftar
                      </a>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {/* Profile / Login Dropdown - Mobile */}
            <div className="md:flex items-center space-x-4 px-4">
              <div className="relative ml-3">
                <button
                  type="button"
                  className="relative flex max-w-xs items-center rounded-full px-2 py-1 border-black border-2 text-black text-3xl hover:bg-black hover:text-white transition-all"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <i className="ri-user-line"></i>
                </button>

                {/* Dropdown */}
                {showDropdown && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5">
                    {isLoggedIn ? (
                      <>
                        <div className="px-4 py-2 text-sm font-semibold text-gray-900">
                          Halo, {userName} 👋
                        </div>
                        <hr className="border-gray-200" />
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          Sign out
                        </button>
                      </>
                    ) : (
                      <>
                        <a
                          href="/login"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Login
                        </a>
                        <a
                          href="/register"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Daftar
                        </a>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => setTampil(!tampil)}
              className="text-black focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {tampil ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-16 6h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-md transition-all duration-300 ${
          tampil ? "block" : "hidden"
        }`}
      >
        <a href="/#home" className="block px-4 py-2 text-black-300">
          Beranda
        </a>
        <hr className="border-gray-200" />
        <a href="/#about" className="block px-4 py-2 text-black-300">
          Tentang Kami
        </a>
        <hr className="border-gray-200" />
        <a href="/#testimoni" className="block px-4 py-2 text-black-300">
          Testimoni
        </a><hr className="border-gray-200" />
        <a href="/#produk" className="block px-4 py-2 text-black-300">
          Produk
        </a><hr className="border-gray-200" />
        <hr className="border-gray-200" />
        <a href="/#kontak" className="block px-4 py-2 text-black-300">
          Kontak
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
