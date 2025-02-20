import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./components/AdminDashboard";

const App = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboardPage = location.pathname.startsWith("/dashboard");
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("jwt_token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserRole(decoded.role);
      } catch (error) {
        console.error("Invalid token:", error);
        Cookies.remove("jwt_token");
        setUserRole(null);
      }
    } else {
      setUserRole(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      if (isDashboardPage && userRole !== "ADMIN") {
        console.error("Akses ditolak: bukan ADMIN");
        navigate("/login", { replace: true });
      }
    }
  }, [userRole, isDashboardPage, navigate, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!isDashboardPage && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setUserRole={setUserRole} />} />
        <Route
          path="/dashboard"
          element={userRole === "ADMIN" ? <AdminDashboard /> : <Navigate to="/login" />}
        />
      </Routes>
      {location.pathname === "/" && <Footer />}
    </>
  );
};

export default App;
