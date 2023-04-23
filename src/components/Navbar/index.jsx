import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/niologo.png";
import "./styles.scss";
import { FaUserAlt } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-links">
        <Link to="/" className="nav-link">
          <img src={Logo} className="nio-logo" />
        </Link>
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/calorieCalculator" className="nav-link">
          Calorie Calculator
        </Link>
        <Link to="/recipePage" className="nav-link">
          Recipe Recommendations
        </Link>
        <Link to="/" className="nav-link">
          Meal History
        </Link>
      </div>
      <Link to="/profile" className="nav-link profile-link">
        <FaUserAlt />
        <span>Profile</span>
      </Link>
    </div>
  );
};

export default Navbar;
