import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

// Main Layout untuk mengatur Navbar, Footer, dan Komponen Halaman
const MainLayout = () => {
  const location = useLocation();
  const isLoginAdminPage = location.pathname === "/login-admin";
  const isDashboardPage = location.pathname.startsWith("/dashboard"); // Periksa jika halaman adalah dashboard atau sub-halaman dashboard

  return (
    <>
      {/* Tampilkan Navbar jika bukan di halaman login-admin atau dashboard */}
      {!isLoginAdminPage && !isDashboardPage && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login-admin" element={<AdminLogin />} />
        <Route
          path="/dashboard/*" // Gunakan wildcard untuk routing internal di dashboard
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Tampilkan Footer hanya jika berada di HomePage */}
      {location.pathname === "/" && <Footer />}
    </>
  );
};

export default App;
