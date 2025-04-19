import React from "react";
import { Link } from "react-router-dom";
import cartIcon from "../assets/cart-shopping-svgrepo-com.svg";
import userIcon from "../assets/user-svgrepo-com.svg";
import logo from "../assets/InternationalFabrics.png";
import "./Header.css";

const Header = () => {
  return (
    <header className="homepage-header">
      {/* Left side: Logo as a separate link */}
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="International Fabrics Logo" className="logo-img" />
        </Link>
        <Link to="/" className="logo-text-link">
          <h1 className="site-name">International Fabrics</h1>
        </Link>
      </div>

      {/* Right side: Icons */}
      <div className="icons">
        <Link to="/cart">
          <img src={cartIcon} alt="Cart" className="icon" />
        </Link>
        <Link to="/register">
          <img src={userIcon} alt="User" className="icon" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
