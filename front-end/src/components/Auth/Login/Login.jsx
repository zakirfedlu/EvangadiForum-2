
import React, { useState } from "react";
import style from "../Auth.module.css";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate for redirection
import { FiEye, FiEyeOff } from "react-icons/fi";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axiosConfig from "../../../API/axiosConfig";

const Login = ({ toggleAuth }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(""); // For email/password login
  const [password, setPassword] = useState(""); // For email/password login
  const navigate = useNavigate(); // For redirecting after login

import React, { useState } from 'react';
import style from '../Auth.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
// import axios from '../../../API/axiosConfig';
import axios from 'axios';
import { useRef } from 'react';

const Login = ({ toggleAuth }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Added for error handling
    const navigate = useNavigate();


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  // Handle email/password form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const emailValue = email.current.value;
    // const passValue = password.current.value;

    const emailRef = useRef();
    const passwordRef = useRef();

    // Handle email/password form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message
        console.log(emailRef.current.value)
        console.log(passwordRef.current.value)
        const userData = {
            email: emailRef.current.value,
            user_password: passwordRef.current.value
        };


        try {
            const response = await axios.post('http://localhost:3001/api/users/login', userData);

            const data = await response.data;

            if (response.ok) {
                setUser(data.user);
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/home'); // Redirect to home on success
            } else {
                // Handle error from API (e.g., invalid credentials)
                setError(data.message || 'Login failed. Please try again.');
            }
        } catch (err) {
            console.error('Error during login:', err);
            setError('Something went wrong. Please try again later.');
        }
    };


    // Check if both email and password are provided
    if (!email || !password) {
      // alert("Please provide both email and password");
      return;
    }

    try {
      const { data } = await axiosConfig.post("/users/login", {
        email: email,
        password: password,
      });

      // alert(data?.message);
      localStorage.setItem("token", data.token);
      navigate("/home");
      //   console.log(response.data);
    } catch (error) {
      // alert("Please Create Account");
      console.warn(error.message);
    }
  };


  // Handle Google login success
  const handleGoogleSuccess = (credentialResponse) => {
    try {
      const userObject = jwtDecode(credentialResponse.credential);
      setUser(userObject);
      console.log("Google Login Success:", userObject);
      localStorage.setItem("user", JSON.stringify(userObject));
      navigate("/home");
    } catch (error) {
      console.error("Error decoding Google token:", error);
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google Login Failed:", error);
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <div className={`${style.form__container} ${style.login}`}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h1>Log in to your account</h1>
        <p>
          Don’t have an account?{" "}
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
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
                <div className={style.input__group}>
                    <input
                        ref={emailRef}
                        type="email"
                        placeholder="Your Email"
                        required
                    />
                </div>
                <div className={style.input__group}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        ref={passwordRef}
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
                            useOneTap
                        />
                    )}
                </div>
            </form>

        </div>
        <div className={style.input__group}>
          <input
            type={showPassword ? "text" : "password"}
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
        <div style={{ marginTop: "20px" }}>
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
