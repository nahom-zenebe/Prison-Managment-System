import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css';
import prison_logo from '../../img/prison_logo6.png';

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate('/login');
  };

  return (
    <div className="login-container">

      <div className="image-text-container">
        <img src={prison_logo} alt="Prison Logo" className="prison-logo" />
        <div className="welcome-text">
          <h1>Welcome to the Prison Management System</h1>
          <p>Efficiently manage inmate records, staff schedules, and more.</p>
        </div>
      </div>


      <div className="login-form-container">
        <h2>Staff Signup</h2>
        <input
          type="text"
          placeholder="Username"
          className="login-inputs"
        /><br />
        <input
          type="password"
          placeholder="Password"
          className="login-inputs"
        /><br />
        <select className="role-select">
          <option value="" disabled selected>Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Guard">Guard</option>
          <option value="Warden">Warden</option>
          <option value="VisitorManager">Visitor Manager</option>
        </select><br />
        <button className="logbtn" onClick={handleSignup}>Sign up</button>

        <p>Already have an account <Link to='/login'>Click here</Link></p>
      </div>
    </div>
  );
};

export default Signup;
