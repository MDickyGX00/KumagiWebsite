import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");

  console.log("Token dari sessionStorage di PrivateRoute:", token); // Debugging

  if (!token) {
    alert("Anda harus login terlebih dahulu!");
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    console.log("Decoded Token:", decoded); // Cek isi token

    const role = decoded.role;
    console.log("Role dari token:", role); // Cek apakah role terbaca dengan benar

    if (role !== "ADMIN") {
      alert("Anda tidak memiliki akses ke halaman ini!");
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    console.error("Token tidak valid:", error);
    sessionStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return children;
};


PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
