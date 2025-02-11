import { Route, Routes, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Pastikan sudah install jwt-decode
import { useEffect } from "react";
import ProductPage from "./dashboardPage/ProductPage";
import AdminPage from "./dashboardPage/AdminPage";
import ReviewPage from "./dashboardPage/ReviewsPage";
import ContactPage from "./dashboardPage/ContactPage";
import SideNavbar from "../components/SIdeNavAdmin";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Cek token saat pertama kali halaman dimuat
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      alert("Anda harus login terlebih dahulu!");
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== "ADMIN") {
        alert("Akses ditolak! Anda bukan admin.");
        navigate("/");
      }
    } catch (error) {
      console.error("Invalid token:", error);
      sessionStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("token"); // Hapus token login
    navigate("/login"); // Arahkan ke halaman login
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
      {/* Side Navbar */}
      <SideNavbar onMenuSelect={handleMenuSelect} handleLogout={handleLogout} />

      {/* Content Area */}
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
