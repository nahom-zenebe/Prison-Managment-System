import React from "react";
import "./LearnMore.css";

function LearnMore() {
  return (
    <div className="learn-more-container">
        

      <h1 style={{"fontSize":"40px"}} className="title">Prison Management System</h1>
      <p className="description">
        The Prison Management System (PMS) is designed to manage various aspects of prison operations. It includes features for inmate management, healthcare appointments, security operations, staff management, and more. The system helps streamline operations, enhance security, and ensure efficient management of resources.
      </p>

      <div className="feature-section">
        <h2 className="section-title">Key Features</h2>
        <ul className="feature-list">
          <li>Inmate Information Management</li>
          <li>Healthcare and Medical Appointments</li>
          <li>Security and Incident Management</li>
          <li>Staff and Role Management</li>
          <li>Visitor Management</li>
        </ul>
      </div>

      <div className="learn-more-button-container">
       
      </div>
    </div>
  );
}

export default LearnMore;
