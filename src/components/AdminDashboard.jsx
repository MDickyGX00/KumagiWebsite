import { Route, Routes, useNavigate } from "react-router-dom";
import ProductPage from "./dashboardPage/ProductPage";
import UserPage from "./dashboardPage/UserPage";
import ReviewPage from "./dashboardPage/ReviewsPage";
import ContactPage from "./dashboardPage/ContactPage";
import SideNavbar from "../components/SIdeNavAdmin";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Hapus token login
    navigate("/login-admin"); // Arahkan ke halaman login
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
          <Route path="/user" element={<UserPage />} />
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
