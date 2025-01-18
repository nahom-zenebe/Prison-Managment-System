import React from 'react';
import { Link } from 'react-router-dom';
import './Welcomepage.css';
import prison_logo from '../../img/prison_logo6.png'

const Welcome = () => {
    return (
        <div className="main-container">
            <header className="site-header">
                <div className="container">
                    <h1 className="brand-logo">Prison Management</h1>
                    <nav className="navigation">
                        <Link to="/login" className="nav-item">Login</Link>
                        <Link to="/Signup" className="nav-item">Sign Up</Link>
                    </nav>
                </div>
            </header>
  
            <section className='main-content'>
            <img src={prison_logo} alt="side image" />
                <div className='content-container'>
                    <h1 className='title-header'>Welcome to our <br></br>Advanced Prison Management System</h1>
                    <p className="hero-description">
                        Manage inmate records, staff schedules, and visitor logs efficiently with our secure system.
                    </p>
                    <div className='button-container'>
                        <Link to="/LearnMore" className='btn-learn-more'>Learn more</Link>
                        <button className='btn-get-manual'>Get the manual</button>
                    </div>
                </div>
            </section>
            <footer className="site-footer">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} Prison Management System. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Welcome;
