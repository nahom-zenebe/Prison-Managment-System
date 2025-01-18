import React, { useState } from "react";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import "./StaffMenuBar.css";
import prisonlogo from "../img/prison_logo6.png";

const { SubMenu } = Menu;

const StaffMenuBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeKey, setActiveKey] = useState(location.pathname);

  const handleMenuClick = (key) => {
    navigate(key);
    setActiveKey(key); // Update active key when clicked
  };

  return (
    <div className="Staffsidebar">
      <div className="staff-menu-heding">
        <div className="staff-menu-logo">
          <img src={prisonlogo} alt="logo" />
        </div>
        <h2 className="staff-h2">Prison Management</h2>
      </div>
      <hr className="staff-divider" />
      <Menu
        mode="vertical"
        onClick={({ key }) => handleMenuClick(key)}
        selectedKeys={[activeKey]} // Set the active key here
        style={{ backgroundColor: "#212459" }}
      >
        <Menu.Item
          key="/staff"
          className="menuItem"
          style={{
            backgroundColor: activeKey === "/staff" ? "#eeeeee" : "transparent",
            color: activeKey === "/staff" ? "black" : "white",
          }}
        >
          Staff Dashboard
        </Menu.Item>

        <Menu.Item
          key="/JailorList"
          className="menuItem"
          style={{
            backgroundColor:
              activeKey === "/JailorList" ? "#eeeeee" : "transparent",
            color: activeKey === "/JailorList" ? "black" : "white",
          }}
        >
          All Jailors
        </Menu.Item>

        <Menu.Item
          key="/DoctorList"
          className="menuItem"
          style={{
            backgroundColor:
              activeKey === "/DoctorList" ? "#eeeeee" : "transparent",
            color: activeKey === "/DoctorList" ? "black" : "white",
          }}
        >
          All Doctors
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default StaffMenuBar;
