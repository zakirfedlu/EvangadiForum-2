import React, { useState, useRef } from "react";
import style from "../Auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "../../../API/axiosConfig";

const Login = ({ toggleAuth }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(""); // Added for error handling
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset error message
        try {
            const response = await axios.post("/users/login", {
                email: emailRef.current.value,
                user_password: passwordRef.current.value,
            });

            const data = await response.data;

            if (response.ok) {
                setUser(data.user);
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/home"); // Redirect to home on success
            } else {
                // Handle error from API (e.g., invalid credentials)
                setError(data.message || "Login failed. Please try again.");
            }
        } catch (err) {
            console.error("Error during login:", err);
            setError("Something went wrong. Please try again later.");
        }
    };

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
                {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
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
                        type={showPassword ? "text" : "password"}
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
