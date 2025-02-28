import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Modal, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import axiosInstance from "./axiosInstance";

const { Sider } = Layout;

const SideNavbar = ({ onMenuSelect }) => {
  const [activeMenu, setActiveMenu] = useState("Contact");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    onMenuSelect(menu);
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/logout");

      document.cookie =
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

      navigate("/login");
    } catch (error) {
      console.error("Logout gagal", error);
    }
  };

  return (
    <Sider width={200} style={{ background: "#fff", minHeight: "100vh" }}>
      <div className="p-4 text-center font-bold text-lg border-b">
        Admin Menu
      </div>
      <Menu
        mode="inline"
        selectedKeys={[activeMenu]}
        onClick={({ key }) => handleMenuClick(key)}
        style={{ height: "100%", borderRight: 0 }}
      >
        {["Contact", "Admin", "Product", "Reviews", "Link"].map((menu) => (
          <Menu.Item key={menu}>{menu}</Menu.Item>
        ))}
      </Menu>

      {/* Tombol Logout */}
      <div className="p-4 flex justify-center">
        <Button
          type="primary"
          danger
          icon={<LogoutOutlined />}
          onClick={() => setShowModal(true)}
          block
        >
          Log Out
        </Button>
      </div>

      {/* Modal Konfirmasi Logout */}
      <Modal
        title="Konfirmasi Logout"
        open={showModal}
        onCancel={() => setShowModal(false)}
        onOk={handleLogout}
        okText="Logout"
        cancelText="Batal"
        okButtonProps={{ danger: true }}
      >
        <p>Apakah Anda yakin ingin logout?</p>
      </Modal>
    </Sider>
  );
};

// Validasi props menggunakan PropTypes
SideNavbar.propTypes = {
  onMenuSelect: PropTypes.func.isRequired,
};

export default SideNavbar;
