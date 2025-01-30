import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Jika token tidak ada, redirect ke halaman login
  if (!token) {
    alert("Anda harus login terlebih dahulu!");
    return <Navigate to="/login-admin" />;
  }

  // Jika token ada, render halaman yang diminta
  return children;
};

// Tambahkan validasi untuk prop 'children'
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
