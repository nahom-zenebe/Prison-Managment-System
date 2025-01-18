import React, { useState } from "react";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import "./SideNavbar.css";
import prisonDepartmentLogo from "../img/prison_logo6.png";

function HealthcareSideNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State to track the currently selected menu key
  const [selectedKey, setSelectedKey] = useState(location.pathname);

  const handleMenuClick = (key) => {
    navigate(key);
    setSelectedKey(key); // Update the selected key when an item is clicked
  };

  return (
    <div className="sidebar">
      <div className="dashboard-header">
        <img
          className="prison-logo"
          src={prisonDepartmentLogo}
          alt="Prison Department Logo"
        />
        <div className="topic">Prison Management</div>
      </div>
      <hr className="divider" />
      
      <Menu
        mode="vertical"
        onClick={({ key }) => handleMenuClick(key)}
        selectedKeys={[selectedKey]} // Keep track of the selected key
        style={{ backgroundColor: "#212459" }}
      >
        <Menu.Item
          className="mainMenu"
          key="/healthcareDashboard"
          style={{
            color: selectedKey === "/healthcareDashboard" ? "#000000" : "#ffffff", // Change text color dynamically
          }}
        >
          Healthcare Dashboard
        </Menu.Item>
        <Menu.Item
          className="mainMenu"
          key="/currentAppointments"
          style={{
            color: selectedKey === "/currentAppointments" ? "#000000" : "#ffffff", // Change text color dynamically
          }}
        >
          Current Appointments
        </Menu.Item>
        <Menu.Item
          className="mainMenu"
          key="/approvedAppointments"
          style={{
            color: selectedKey === "/approvedAppointments" ? "#000000" : "#ffffff", // Change text color dynamically
          }}
        >
          Approved Appointments
        </Menu.Item>
        <Menu.Item
          className="mainMenu"
          key="/healthRecords"
          style={{
            color: selectedKey === "/healthRecords" ? "#000000" : "#ffffff", // Change text color dynamically
          }}
        >
          Health Records
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default HealthcareSideNavbar;
