import React from 'react';
import { useNavigate,Link } from 'react-router-dom';
import './Login.css';
import prison_logo from '../../img/prison_logo6.png';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/admindashboard');
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
        <h2>Staff Login</h2>
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
        <button className="logbtn" onClick={handleLogin}>Login</button>

        <p>Don't have an account <Link to='/Signup'>Click here</Link></p>
      </div>
    </div>
  );
};

export default Login;
