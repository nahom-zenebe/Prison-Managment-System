import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/customhook'; 
import './Login.css';
import { toast, ToastContainer } from 'react-toastify';
import prison_logo from '../../img/prison_logo6.png';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); 
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {

      await login(credentials);
      navigate('/admindashboard'); 
      toast.success('Signup successful!')
    } catch (err) {
      setError('Invalid username or password'); 
      toast.error('Login failed. Please try again')
    }
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
        <h2> Login Page</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="login-inputs"
            value={credentials.username}
            onChange={handleChange}
            required
          /><br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="login-inputs"
            value={credentials.password}
            onChange={handleChange}
            required
          /><br />
          {error && <p className="error-message">{error}</p>}
          <button className="logbtn" type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/Signup" className="signup-link">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
