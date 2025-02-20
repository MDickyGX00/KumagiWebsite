import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link dan useNavigate
import axiosInstance, { cekLogin } from "./axiosInstance"; // Import axiosInstance dan cekLogin

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tampil, setTampil] = useState(false);
  const navigate = useNavigate();

  // Mengecek status login saat komponen pertama kali dirender
  useEffect(() => {
    const checkAuth = async () => {
      const status = await cekLogin(); // Panggil fungsi cekLogin()
      setIsLoggedIn(status);
    };

    checkAuth(); // Cek saat pertama kali render

    // Event listener untuk memantau perubahan login/logout
    const interval = setInterval(() => {
      checkAuth();
    }, 3000); // Cek setiap 3 detik

    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/logout"); // Panggil API logout di backend
      
      // Hapus cookie secara eksplisit (gunakan path sesuai domain backend)
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  
      setIsLoggedIn(false); // Update state
      navigate("/login"); // Redirect ke halaman login
    } catch (error) {
      console.error("Logout gagal", error);
    }
  };
  

  const handleClick = () => {
    setTampil(!tampil);
  };

  let menuActive = tampil ? "left-0" : "-left-full";
  let scrollActive = "py-6 bg-white shadow"; // Bisa diatur sesuai kebutuhan

  return (
    <div className={`navbar fixed w-full transition-all ${scrollActive}`}>
      <div className="container mx-auto px-4">
        <div className="navbar-box flex items-center justify-between">
          <a href="/">
            <div className="logo">
              <h1 className="sm:text-2xl text-xl font-bold">Kumagi Bake.</h1>
            </div>
          </a>
          <ul
            className={`flex lg:gap-12 gap-8 lg:static lg:flex-row lg:shadow-none lg:p-0 lg:m-0 lg:transition-none lg:bg-transparent lg:w-auto lg:h-full lg:translate-y-0 fixed ${menuActive} top-1/2 -translate-y-1/2 flex-col px-8 py-6 rounded shadow-md shadow-black bg-yellow-400 font-bold lg:text-black text-black transition-all`}
          >
            <li>
              <a href="/#home" className="font-medium opacity-75">
                Beranda
              </a>
            </li>
            <li>
              <a href="/#about" className="font-medium opacity-75">
                Tentang Kami
              </a>
            </li>
            <li>
              <a href="/#testimoni" className="font-medium opacity-75">
                Testimoni
              </a>
            </li>
            <li>
              <a href="/#produk" className="font-medium opacity-75">
                Produk
              </a>
            </li>
            <li>
              <a href="/#kontak" className="font-medium opacity-75">
                Kontak
              </a>
            </li>
          </ul>
          <div className="social flex items-center gap-2">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 px-5 py-2 rounded-lg text-white font-bold hover:bg-red-600 transition-all"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-yellow-400 px-5 py-2 rounded-lg text-black font-bold hover:bg-yellow-500 transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-yellow-400 px-5 py-2 rounded-lg text-black font-bold hover:bg-yellow-500 transition-all"
                >
                  Daftar
                </Link>
              </>
            )}
            <i
              className="ri-menu-line text-3xl lg:hidden block"
              onClick={handleClick}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
