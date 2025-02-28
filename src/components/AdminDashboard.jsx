import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import axiosInstance from "../components/axiosInstance";
import ProductPage from "./dashboardPage/ProductPage";
import AdminPage from "./dashboardPage/AdminPage";
import ReviewPage from "./dashboardPage/ReviewsPage";
import ContactPage from "./dashboardPage/ContactPage";
import SideNavbar from "../components/SIdeNavAdmin";
import LinkPage from "./dashboardPage/LinkPage";

const AdminDashboard = ({ setUserRole }) => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");

  useEffect(() => {
    const token = Cookies.get("jwt_token");

    if (!token) {
      console.error("Tidak ada token, redirect ke login...");
      navigate("/login", { replace: true });
      return;
    }

    try {
      const decoded = jwtDecode(token);
      console.log("Decoded token:", decoded);

      if (decoded.role !== "ADMIN") {
        console.error("Anda bukan ADMIN, redirect ke halaman utama...");
        Cookies.remove("jwt_token");
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Token tidak valid:", error);
      Cookies.remove("jwt_token");
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/logout", {}, { withCredentials: true });

      // Hapus semua data login di frontend
      Cookies.remove("jwt_token");
      sessionStorage.clear();
      localStorage.clear();
      setUserRole(null); // Reset state userRole

      console.log("✅ Logout berhasil, redirect ke login...");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("❌ Logout gagal:", error);
    }
  };

  const handleMenuSelect = (menu) => {
    setSelectedMenu(menu);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "Contact":
        return <ContactPage />;
      case "Admin":
        return <AdminPage />;
      case "Product":
        return <ProductPage />;
      case "Reviews":
        return <ReviewPage />;
      case "Link":
        return <LinkPage />;
      default:
        return (
          <div>
            <h1 className="text-2xl font-bold">Welcome to Admin Dashboard</h1>
            <p>Pilih menu di sebelah kiri untuk melihat data.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen">
      <SideNavbar onMenuSelect={handleMenuSelect} handleLogout={handleLogout} />
      <div className="flex-1 bg-gray-50 p-6">{renderContent()}</div>
    </div>
  );
};

AdminDashboard.propTypes = {
  setUserRole: PropTypes.func.isRequired,
};

export default AdminDashboard;
