import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axiosInstance from "./axiosInstance";

const SideNavbar = ({ onMenuSelect }) => {
  const [activeMenu, setActiveMenu] = useState("Contact");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // Gunakan navigate untuk redirect

  // Fungsi menangani klik menu
  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    onMenuSelect(menu);
  };

  // Fungsi logout
  const handleLogout = async () => {
    try {
      await axiosInstance.post("/logout"); // Panggil API logout

      // Hapus cookie JWT
      document.cookie =
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

      navigate("/login"); // Redirect ke halaman login
    } catch (error) {
      console.error("Logout gagal", error);
    }
  };

  return (
    <div className="w-1/5 bg-gray-100 p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-bold mb-4">Admin Menu</h2>
        <ul className="space-y-2">
          {["Contact", "Admin", "Product", "Reviews"].map((menu) => (
            <li
              key={menu}
              className={`p-2 rounded cursor-pointer ${
                activeMenu === menu
                  ? "bg-yellow-500 text-white"
                  : "hover:bg-gray-200 transition-all"
              }`}
              onClick={() => handleMenuClick(menu)}
            >
              {menu}
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={() => setShowModal(true)}
        className="p-2 bg-white text-red-500 border-2 border-red-500 hover:text-white hover:bg-red-500 transition-all rounded-xl"
      >
        Log Out
      </button>
      {/* Modal Konfirmasi Logout */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Konfirmasi Logout</h3>
            <p>Apakah Anda yakin ingin logout?</p>
            <div className="mt-4 flex justify-between space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-all"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setShowModal(false);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Validasi props menggunakan PropTypes
SideNavbar.propTypes = {
  onMenuSelect: PropTypes.func.isRequired,
};

export default SideNavbar;
