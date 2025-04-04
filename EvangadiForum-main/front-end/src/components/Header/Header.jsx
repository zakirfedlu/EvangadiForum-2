import React, { useState, useEffect, useContext } from "react";
import { FiLogOut, FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import style from "./Header.module.css";
import logo from "../../assets/images/HeaderLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../ThemeContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  // Add this function to handle logo click
  const handleLogoClick = () => {
    if (isLoggedIn) {
      navigate("/home");
    } else {
      navigate("/");
    }
  };

  return (
    <div className={style.header__container}>
      <div className={style.header__logo}>

        <div onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <img src={logo} alt="Evangadi Logo" />
        </div>
      </div>

      <div className={style.hamburger} onClick={toggleMenu}>
        {isMenuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
      </div>

      <div className={`${style.header__nav} ${isMenuOpen ? style.active : ""}`}>
        <ul className={style.header__nav__list}>
          <li>
            <Link to="/home" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/howItWorks" onClick={() => setIsMenuOpen(false)}>
              How it Works
            </Link>
          </li>
          <li>
            {isLoggedIn ? (
              <button onClick={handleLogout} className={style.logOut}>
                <div>
                  <FiLogOut size={20} className={style.icon} /> Log Out
                </div>
              </button>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <button className={style.signIn}>Sign In</button>
              </Link>
            )}
          </li>
          <li>
            <button onClick={toggleTheme} className={style.themeToggle}>
              {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;