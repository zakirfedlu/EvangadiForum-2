import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // For hamburger and close icons
import style from "./Header.module.css";
import logo from "../../assets/images/HeaderLogo.png";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  //!!! Check if the user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // User is logged in
    } else {
      setIsLoggedIn(false); // User is not logged in
    }
  }, []);

  // Handle log out
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    console.log("Token removed:", localStorage.getItem("token")); 
    setIsLoggedIn(false); 
    navigate("/login"); 
  };

  return (
    <div className={style.header__container}>
      <div className={style.header__logo}>
        <Link to="/">
          <img src={logo} alt="Evangadi Logo" />
        </Link>
      </div>

      <div className={style.hamburger} onClick={toggleMenu}>
        {isMenuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
      </div>

      <div className={`${style.header__nav} ${isMenuOpen ? style.active : ""}`}>
        <ul className={style.header__nav__list}>
          <li>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              How it Works
            </Link>
          </li>
          <li>
            {isLoggedIn ? (
              <button onClick={handleLogout}>Log Out</button>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <button>Sign In</button>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
