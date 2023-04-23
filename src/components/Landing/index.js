import React, { useContext, useEffect } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import authContext from "../AuthContext/AuthContext";
import { useCookies } from "react-cookie";

const Landing = () => {
  const ctx = useContext(authContext);
  const [cookie] = useCookies(['user']);

  useEffect(()  => {
    if (cookie['user']) {
        ctx.signInHandler(cookie['user']);
    }
  }, []);

  return (
    <div className="landing-container">
      <div className="title-section">
        <div className="slogan-container">
          <h1 className="landing-title">Nutrious.io</h1>
          <h2 className="slogan">The best way to track your calories.</h2>
        </div>
      </div>
      <div className="function-section">
        <div className="login-section">
          {ctx.loggedIn ?
          <Link to="/profile" className="login-btn">
            <span>Profile</span>
          </Link> : null
          }
        </div>
        <div className="links-section">
          {ctx.loggedIn ?
          <>
            <Link to="/calorieCalculator" className="main-menu-btn">
              <span>Calorie Calculator</span>
            </Link>
            <Link to="/recipePage" className="main-menu-btn">
              <span>Recipe Recommendations</span>
            </Link>
            <Link to="/" className="main-menu-btn">
              <span>Meal History</span>
            </Link>
          </>:
          <Link to="/login" className="main-menu-btn">
            <span>Login</span>
          </Link>
          }
        </div>
        <div className="footer">
          <p className="copyright">© Nutrious.io 2023 <br /> All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
