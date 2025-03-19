import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi'; // For hamburger and close icons
import style from './Header.module.css';
import logo from '../../assets/images/HeaderLogo.png';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className={style.header__container}>
            <div className={style.header__logo}>
                <img src={logo} alt="Evangadi Logo" />
            </div>

            {/* Hamburger Icon for Mobile */}
            <div className={style.hamburger} onClick={toggleMenu}>
                {isMenuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
            </div>

            {/* Navigation Menu */}
            <div className={`${style.header__nav} ${isMenuOpen ? style.active : ''}`}>
                <ul className={style.header__nav__list}>
                    <li>
                        <a href="#" onClick={() => setIsMenuOpen(false)}>Home</a>
                    </li>
                    <li>
                        <a href="#" onClick={() => setIsMenuOpen(false)}>How it Works</a>
                    </li>
                    <li>
                        <a href="#" onClick={() => setIsMenuOpen(false)}>
                            <button>Sign In</button>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;