import React, { useState } from 'react'
import style from '../Auth.module.css'
import { Link } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Login = ({ toggleAuth }) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className={`${style.form__container} ${style.login}`}>
            <form className={style.form}>
                <h1>Log in to your account</h1>
                <p>
                    Don’t have an account?{' '}
                    <Link to="/" onClick={toggleAuth} className={style.create__account}>
                        Create a new account
                    </Link>
                </p>
                <div className={style.input__group}>
                    <input type="email" placeholder="Your Email" required />
                </div>
                <div className={style.input__group}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        required
                    />
                    <span
                        className={style.password__toggle}
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                    </span>
                </div>
                <button type="submit" className={style.submit__button}>
                    <Link to="/home" >
                        SUBMIT
                    </Link>
                </button>
                <p className={style.create__account}><Link to="/" onClick={toggleAuth}>Create an account</Link></p>
            </form>
        </div>
    )
}

export default Login