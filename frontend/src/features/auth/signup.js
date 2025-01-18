import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/customhook'; 
import './signup.css';
import { toast, ToastContainer } from 'react-toastify';
import prison_logo from '../../img/prison_logo6.png';

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [credentials, setCredentials] = useState({ username: '', password: '', role: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(credentials);
      toast.success('Signup successful!')
     
      if (credentials.role === 'Admin') {
        navigate('/admindashboard'); 
      } else if (credentials.role === 'VisitorManager') {
        navigate('/visitorDashboard');
      } else {
        navigate('/dashboard'); 
      }
    } catch (err) {
      setError('Signup failed. Please try again.');
       toast.error('Signup failed. Please try again')
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
        <h2> Signup Page</h2>
        <form onSubmit={handleSignup}>
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
          <select
            name="role"
            className="role-select"
            value={credentials.role}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Guard">Guard</option>
            <option value="VisitorManager">Visitor Manager</option>
          </select><br />
          {error && <p className="error-message">{error}</p>}
          <button className="logbtn" type="submit">Sign up</button>
        </form>
        <p>Already have an account? <Link to="/login" className="login-link">Click here</Link></p>
      </div>
    </div>
  );
};

export default Signup;
