import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

const MainLayout = () => {
  const location = useLocation();
  const isDashboardPage = location.pathname.startsWith("/dashboard");

  return (
    <>
      {/* Navbar hanya ditampilkan jika bukan di halaman login atau dashboard */}
      {!isDashboardPage && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard/*"
          element={
            <>
              {console.log("Mengakses /dashboard, ProtectedRoute dipanggil")}
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            </>
          }
        />
      </Routes>

      {/* Footer hanya muncul di halaman HomePage */}
      {location.pathname === "/" && <Footer />}
    </>
  );
};

export default App;
