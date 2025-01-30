import PropTypes from "prop-types";
import { useState } from "react";

const SideNavbar = ({ onMenuSelect, handleLogout }) => {
  // State untuk melacak menu aktif
  const [activeMenu, setActiveMenu] = useState("Contact");

  // Fungsi untuk menangani klik menu
  const handleMenuClick = (menu) => {
    setActiveMenu(menu); // Perbarui menu aktif
    onMenuSelect(menu); // Panggil fungsi untuk memberi tahu parent
  };

  return (
    <div className="w-1/5 bg-gray-100 p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-bold mb-4">Admin Menu</h2>
        <ul className="space-y-2">
          <li
            className={`p-2 rounded cursor-pointer ${
              activeMenu === "Contact" ? "bg-yellow-500 text-white" : "hover:bg-gray-200 transition-all"
            }`}
            onClick={() => handleMenuClick("Contact")}
          >
            Contact
          </li>
          <li
            className={`p-2 rounded cursor-pointer ${
              activeMenu === "User" ? "bg-yellow-500 text-white" : "hover:bg-gray-200 transition-all"
            }`}
            onClick={() => handleMenuClick("User")}
          >
            User
          </li>
          <li
            className={`p-2 rounded cursor-pointer ${
              activeMenu === "Product" ? "bg-yellow-500 text-white" : "hover:bg-gray-200 transition-all"
            }`}
            onClick={() => handleMenuClick("Product")}
          >
            Product
          </li>
          <li
            className={`p-2 rounded cursor-pointer ${
              activeMenu === "Reviews" ? "bg-yellow-500 text-white" : "hover:bg-gray-200 transition-all"
            }`}
            onClick={() => handleMenuClick("Reviews")}
          >
            Reviews
          </li>
        </ul>
      </div>
      <button
        onClick={handleLogout}
        className="p-2 bg-white text-red-500 border-2 border-red-500 hover:text-white hover:bg-red-500 transition-all rounded-xl"
      >
        Log Out
      </button>
    </div>
  );
};

// Validasi props menggunakan PropTypes
SideNavbar.propTypes = {
  onMenuSelect: PropTypes.func.isRequired, // Harus berupa fungsi
  handleLogout: PropTypes.func.isRequired, // Harus berupa fungsi
};

export default SideNavbar;
