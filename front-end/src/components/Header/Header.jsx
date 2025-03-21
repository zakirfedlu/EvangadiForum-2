import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi'; // For hamburger and close icons
import style from './Header.module.css';
import logo from '../../assets/images/HeaderLogo.png';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className={style.header__container}>
            <div className={style.header__logo}>
                <Link to="/">
                    <img src={logo} alt="Evangadi Logo" />
                </Link>
            </div>

            {/* Hamburger Icon for Mobile */}
            <div className={style.hamburger} onClick={toggleMenu}>
                {isMenuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
            </div>

            {/* Navigation Menu */}
            <div className={`${style.header__nav} ${isMenuOpen ? style.active : ''}`}>
                <ul className={style.header__nav__list}>
                    <li>
                        <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    </li>
                    <li>
                        <Link to="/" onClick={() => setIsMenuOpen(false)}>How it Works</Link>
                    </li>
                    <li>
                        <Link to="/" onClick={() => setIsMenuOpen(false)}>
                            <button>Sign In</button>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;