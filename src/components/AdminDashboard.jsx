import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import ProductPage from "./dashboardPage/ProductPage";
import AdminPage from "./dashboardPage/AdminPage";
import ReviewPage from "./dashboardPage/ReviewsPage";
import ContactPage from "./dashboardPage/ContactPage";
import SideNavbar from "../components/SIdeNavAdmin";
import { Routes, Route } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("jwt_token");
    if (!token) {
      console.error("Token tidak ditemukan, redirect ke login...");
      navigate("/login", { replace: true });
      return;
    }

    try {
      const decoded = jwtDecode(token);
      console.log("Decoded token:", decoded); // Debug hasil decode token
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

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login", { replace: true });
  };

  const handleMenuSelect = (menu) => {
    switch (menu) {
      case "Contact":
        navigate("/dashboard/contact");
        break;
      case "User":
        navigate("/dashboard/user");
        break;
      case "Product":
        navigate("/dashboard/product");
        break;
      case "Reviews":
        navigate("/dashboard/reviews");
        break;
      default:
        navigate("/dashboard");
    }
  };

  return (
    <div className="flex h-screen">
      <SideNavbar onMenuSelect={handleMenuSelect} handleLogout={handleLogout} />
      <div className="flex-1 bg-gray-50 p-6">
        <Routes>
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/user" element={<AdminPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/reviews" element={<ReviewPage />} />
          <Route
            path="/"
            element={
              <div>
                <h1 className="text-2xl font-bold">Welcome to Admin Dashboard</h1>
                <p>Pilih menu di sebelah kiri untuk melihat data.</p>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
