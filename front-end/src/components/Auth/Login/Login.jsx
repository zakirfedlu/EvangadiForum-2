import React, { useState } from 'react';
import style from '../Auth.module.css';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate for redirection
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Login = ({ toggleAuth }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState(''); // For email/password login
    const [password, setPassword] = useState(''); // For email/password login
    const navigate = useNavigate(); // For redirecting after login

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Handle email/password form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/home');
    };

    // Handle Google login success
    const handleGoogleSuccess = (credentialResponse) => {
        try {
            const userObject = jwtDecode(credentialResponse.credential);
            setUser(userObject);
            console.log('Google Login Success:', userObject);
            localStorage.setItem('user', JSON.stringify(userObject));
            navigate('/home');
        } catch (error) {
            console.error('Error decoding Google token:', error);
        }
    };

    const handleGoogleFailure = (error) => {
        console.error('Google Login Failed:', error);
    };

    const handleLogout = () => {
        googleLogout();
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <div className={`${style.form__container} ${style.login}`}>
            <form className={style.form} onSubmit={handleSubmit}>
                <h1>Log in to your account</h1>
                <p>
                    Don’t have an account?{' '}
                    <Link to="/" onClick={toggleAuth} className={style.create__account}>
                        Create a new account
                    </Link>
                </p>
                <div className={style.input__group}>
                    <input
                        type="email"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={style.input__group}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                    SUBMIT
                </button>
                <p className={style.create__account}>
                    <Link to="/" onClick={toggleAuth}>
                        Create an account
                    </Link>
                </p>
                {/* Google Login Button */}
                <div style={{ marginTop: '20px' }}>
                    {user ? (
                        <div>
                            <p>Welcome, {user.name}!</p>
                            <p>Email: {user.email}</p>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleFailure}
                            useOneTap // Optional: Enables one-tap login
                        />
                    )}
                </div>
            </form>
        </div>
    );
};

export default Login;