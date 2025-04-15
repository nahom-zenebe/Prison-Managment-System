import React, { useState } from "react";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import "./SideNavbar.css";
import prisonDepartmentLogo from "../img/prison_logo6.png";

function SideNavbar({ userName, profilePicture }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeKey, setActiveKey] = useState(location.pathname);

  const handleMenuClick = (key) => {
    navigate(key);
    setActiveKey(key); // Update activeKey when a menu item is clicked
  };

  return (
    <div className="sidebar">
      <div className="dashboard-header">
        <img 
          className="prison-logo"
          src={prisonDepartmentLogo}
          alt="Prison Department Logo"
        />
        <div className="topic">Prison Management System</div>
      </div>
      <hr className="divider" />
      <Menu
        mode="vertical"
        onClick={({ key }) => handleMenuClick(key)}
        selectedKeys={[activeKey]} // Use activeKey to highlight the selected menu item
        style={{ backgroundColor: "#212459" }}
      >
        <Menu.Item
          className="mainMenu"
          key="/dashboard"
          style={{
            backgroundColor:
              activeKey === "/dashboard" ? "#ffffff" : "transparent",
            color: activeKey === "/dashboard" ? "black" : "white",
          }}
        >
          Inmate Dashboard
        </Menu.Item>

        <Menu.SubMenu
          className="mainMenu"
          key="inmates"
          title={<span style={{ color: "white" }}>Inmates</span>}
        >
          <Menu.Item
            className="subMenu"
            key="/current"
            style={{
              backgroundColor:
                activeKey === "/current" ? "#eeeeee" : "transparent",
              color: "black", // Always black text
            }}
          >
            Current Inmates
          </Menu.Item>
          <Menu.Item
            className="subMenu"
            key="/released"
            style={{
              backgroundColor:
                activeKey === "/released" ? "#eeeeee" : "transparent",
              color: "black", // Always black text
            }}
          >
            Released Inmates
          </Menu.Item>
          <Menu.Item
            className="subMenu"
            key="/wanted"
            style={{
              backgroundColor:
                activeKey === "/wanted" ? "#eeeeee" : "transparent",
              color: "black", // Always black text
            }}
          >
            Wanted Inmates
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.Item
          className="mainMenu"
          key="/appointments"
          style={{
            backgroundColor:
              activeKey === "/appointments" ? "#ffffff" : "transparent",
            color: activeKey === "/appointments" ? "black" : "white",
          }}
        >
          Inmate Medical Appointments
        </Menu.Item>

        <Menu.Item
          className="mainMenu"
          key="/schedule"
          style={{
            backgroundColor:
              activeKey === "/schedule" ? "#ffffff" : "transparent",
            color: activeKey === "/schedule" ? "black" : "white",
          }}
        >
          Inmate Schedule
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default SideNavbar;
