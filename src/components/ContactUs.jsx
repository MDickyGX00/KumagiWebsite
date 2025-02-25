import axiosInstance from "./axiosInstance"; // Gunakan axiosInstance
import { useState, useEffect } from "react";
import Cookies from "js-cookie"; // Import Cookies

const ContactUs = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    pesan: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Mengecek apakah pengguna sudah login
  useEffect(() => {
    const token = Cookies.get("jwt_token");
    if (token) {
      axiosInstance
        .get("/validate-token")
        .then(() => setIsLoggedIn(true))
        .catch(() => setIsLoggedIn(false));
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      setShowLoginModal(true); // Tampilkan modal jika belum login
      return;
    }

    axiosInstance
      .post("/kontak", credentials)
      .then((response) => {
        console.log(response.data);
        alert("Pesan berhasil dikirim");

        setCredentials({
          email: "",
          pesan: "",
        });
      })
      .catch((error) => {
        console.error(error);
        alert("Gagal mengirim pesan. Silakan coba lagi.");
      });
  };

  return (
    <div className="kontak bg-yellow-400 px-5 py-20" id="kontak">
      <h2 className="xl:text-5xl text-2xl font-bold mb-2 text-center">
        Hubungi Kami
      </h2>
      <p className="text-center mb-10">
        Jika anda memiliki keluhan, silahkan hubungi kami disini!
      </p>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="hidden sm:grid grid-cols-2 gap-4 px-10">
          <div className="p-4 border rounded shadow bg-white text-center py-10">
            <i className="ri-mail-line text-7xl text-yellow-300"></i>
            <h3 className="font-bold mb-1">Email</h3>
            <p>kumagibake@gmail.com</p>
          </div>
          <div className="p-4 border rounded shadow bg-white text-center py-10">
            <i className="ri-map-pin-line text-7xl text-yellow-300"></i>
            <h3 className="font-bold mb-1">Alamat</h3>
            <p>
              Universitas Sumatera Utara, Jl. Universitas No.9, Padang Bulan,
              Kec. Medan Baru, Kota Medan, Sumatera Utara 20155
            </p>
          </div>
          <div className="p-4 border rounded shadow bg-white text-center py-10">
            <i className="ri-instagram-line text-7xl text-yellow-300"></i>
            <h3 className="font-bold mb-1">Instagram</h3>
            <p>@kumagi.bake</p>
          </div>
          <div className="p-4 border rounded shadow bg-white text-center py-10">
            <i className="ri-whatsapp-line text-7xl text-yellow-300"></i>
            <h3 className="font-bold mb-1">Telepon</h3>
            <p>+62 898 5551 285</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-yellow-200 p-5 rounded-xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label htmlFor="pesan" className="block text-sm font-medium mb-1">
                Pesan
              </label>
              <textarea
                id="pesan"
                name="pesan"
                value={credentials.pesan}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-700 text-white py-2 rounded-full transition-all hover:bg-yellow-800 shadow-lg"
            >
              Kirim
            </button>
          </form>
        </div>
      </div>

      {/* Modal Peringatan Login */}
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
            <h2 className="text-lg font-bold mb-4">Anda Harus Login</h2>
            <p>Silakan login terlebih dahulu untuk menghubungi kami.</p>
            <div className="mt-4">
              <button
                onClick={() => setShowLoginModal(false)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
