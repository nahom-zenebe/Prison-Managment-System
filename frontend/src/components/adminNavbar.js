import React, { useState } from "react";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import "./SideNavbar.css";
import { useAuth } from "../hooks/customhook";
import prisonDepartmentLogo from "../img/prison_logo6.png";
import "./StaffMenuBar.css";

function AdminNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [staffColor, setStaffColor] = useState("#000000");
  const {  logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();

    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  const handleMenuClick = (key) => {
    navigate(key);
    if (key.startsWith("/jailor")) {
      setStaffColor("#ffffff");
    } else if (key.startsWith("/doctor")) {
      setStaffColor("#ffffff");
    } else if (key.startsWith("/stock_keeper")) {
      setStaffColor("#ffffff");
    } else if (key.startsWith("/rehabilitation_officer")) {
      setStaffColor("#ffffff");
    } else {
      setStaffColor("#000000");
    }
  };

  return (
    <div>
      <div className="sidebar">
        <div className="dashboard-header">
          <img
            className="prison-logo"
            src={prisonDepartmentLogo}
            alt="Prison Department Logo"
          />
          <div className="topic" style={{ color: "#d9e1fa" }}>
            Prison Management
          </div>
        </div>
        <hr className="divider" />
        <Menu
          mode="vertical"
          onClick={({ key }) => handleMenuClick(key)}
          selectedKeys={[location.pathname]}
          style={{ backgroundColor: "#212459" }}
        >
          <Menu.Item key="/" className="menuItem" style={{ color: "#d9e1fa" }}>
            Home
          </Menu.Item>
          <Menu.Item
            key="/staff"
            className="menuItem"
            style={{ color: "#d9e1fa" }}
          >
            Staff Management
          </Menu.Item>
          <Menu.Item
            key="/dashboard"
            className="menuItem"
            style={{ color: "#d9e1fa" }}
          >
            Inmate Management
          </Menu.Item>

          <Menu.Item
            key="/visitorDashboard"
            className="menuItem"
            style={{ color: "#d9e1fa" }}
          >
            Visitor Management
          </Menu.Item>
          <Menu.Item
            key="/healthcareDashboard"
            className="menuItem"
            style={{ color: "#d9e1fa" }}
          >
            Healthcare Management
          </Menu.Item>
          <Menu.Item
            key="/securityStaffDashboard"
            className="menuItem"
            style={{ color: "#d9e1fa" }}
          >
            Security Management
          </Menu.Item>

          <Menu.Item
            key="/"
            onClick={handleLogout}
            className="menuItem"
            style={{ color: "#d9e1fa" }}
          >
            logout
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
}

export default AdminNavbar;
