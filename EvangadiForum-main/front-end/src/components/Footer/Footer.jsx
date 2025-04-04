import React from 'react'
import { FiFacebook } from "react-icons/fi";
import { FiInstagram } from "react-icons/fi";
import { FiYoutube } from 'react-icons/fi';
import logo from '../../assets/images/footerLogo.png'
import style from './Footer.module.css'

const Footer = () => {
    return (
        // footer container
        <footer className={style.footer__container}>
            {/* first div */}
            <div className={style.footer__logo}>
                <img src={logo} alt="Evangadi logo" />
                <ul>
                    <li><a href="#"><FiFacebook /></a></li>
                    <li><a href="#"><FiInstagram /></a></li>
                    <li><a href="#"><FiYoutube /></a></li>
                </ul>
            </div>

            {/* second div */}
            <div className={style.footer__links}>
                <ul>
                    <li><h2>Useful Links</h2></li>
                    <li><a href="#">How it works</a></li>
                    <li><a href="#">Terms of Service</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                </ul>
            </div>

            {/* third div */}
            <div className={style.footer__contact}>
                <ul>
                    <li><h2>Contact Info</h2></li>
                    <li><a href="#">Evangadi Network</a></li>
                    <li><a href="#">support@evangadi.com</a></li>
                    <li><a href="#" tel="9876543210">+91 9876543210</a></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer