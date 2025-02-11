import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");
  const location = useLocation();

  console.log("Token yang didapat dari sessionStorage:", token); // Debugging

  if (!token) {
    alert("Anda harus login terlebih dahulu!");
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    console.log("Decoded Token:", decoded); // Cek isi token

    const role = decoded.role; // Ambil role dari payload JWT
    console.log("Role dari token:", role); // Cek apakah role terbaca

    if (location.pathname.startsWith("/dashboard") && role !== "ADMIN") {
      alert("Anda harus login sebagai admin!");
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    console.error("Token tidak valid:", error);
    sessionStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
