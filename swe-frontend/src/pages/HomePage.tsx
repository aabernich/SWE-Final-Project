import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

import cartIcon from '../assets/cart-shopping-svgrepo-com.svg';
import userIcon from '../assets/user-svgrepo-com.svg';
import logo from '../assets/InternationalFabrics.png';

const HomePage = () => {
  return (
    <div className="homepage-container">
      {/* Header */}
      <header className="homepage-header">
        {/* Left side: Logo and Name */}
        <div className="logo">
          <img src={logo} alt="International Fabrics Logo" className="logo-img" />
          <h1 className="site-name">International Fabrics</h1>
        </div>

        {/* Right side: Icons (Cart and Profile) */}
        <div className="icons">
          <Link to="/cart">
            <img src={cartIcon} alt="Shopping Cart" className="icon" />
          </Link>
          <Link to="/register">
            <img src={userIcon} alt="User Profile" className="icon" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content">
        <h2>Browse Our Collection of Fabrics</h2>
        {/* Add more sections here as needed */}
      </div>
    </div>
  );
};

export default HomePage;
