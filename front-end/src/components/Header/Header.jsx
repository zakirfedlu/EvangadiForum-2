<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import style from './Header.module.css';
import logo from '../../assets/images/HeaderLogo.png';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        console.log('Token removed:', localStorage.getItem('token'));
        setIsLoggedIn(false);
        navigate('/login');
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
            <div className={`${style.header__nav} ${isMenuOpen ? style.active : ''}`}>
                <ul className={style.header__nav__list}>
                    <li>
                        <Link to="/home" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    </li>
                    <li>
                        <Link to="/howItWorks" onClick={() => setIsMenuOpen(false)}>How it Works</Link>
                    </li>
                    <li>
                        {isLoggedIn ? (
                            <Link to="/login" onClick={handleLogout} className={style.logOut}>
                                <button id='log-out'>
                                    <FiLogOut size={20} className={style.icon} />
                                    Log Out
                                </button>
                            </Link>
                        ) : (
                            <Link to="/login" onClick={() => setIsMenuOpen(false)} className={style.signIn}>
                                <button id='sign-in'>Sign In</button>
                            </Link>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
=======
import React, { useState, useEffect, useContext } from "react";
import { FiLogOut, FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi"; // Icons for menu and logout
import style from "./Header.module.css";
import logo from "../../assets/images/HeaderLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../ThemeContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // context for theme switching
  const { theme, toggleTheme } = useContext(ThemeContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Check if the user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
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
              {/*Implemented different i cons for different theme*/}
              {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
>>>>>>> c928fdb44ae62c75d04d82f0dd8b0a20bb71c560
};

export default Header;
