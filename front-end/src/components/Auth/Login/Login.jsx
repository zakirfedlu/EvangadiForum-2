import React, { useState, useRef, useEffect } from "react";
import style from "../Auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "../../../API/axiosConfig";
import { PuffLoader } from "react-spinners";

const Login = ({ toggleAuth }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();

    // Check localStorage for token on mount
    useEffect(() => {
        const storedToken = localStorage.getItem("googleToken");
        const storedUser = localStorage.getItem("user");
        if (storedToken && storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Handle email/password login
    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailValue = emailRef.current.value;
        const passValue = passwordRef.current.value;

        if (!emailValue || !passValue) {
            setError("Please provide both email and password");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const { data } = await axios.post("/users/login", {
                email: emailValue,
                password: passValue,
            });
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/home");
        } catch (error) {
            setError(error.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Google login success
    const handleGoogleSuccess = async (credentialResponse) => {
        setIsLoading(true);
        setError("");
        try {
            const token = credentialResponse.credential; // Google ID token
            const userObject = jwtDecode(token); // Decode token to get user info

            // Send Google token to backend for validation
            const { data } = await axios.post("/users/google-login", { token });

            // Store app token and user data in localStorage
            localStorage.setItem("googleToken", token); // Store Google token
            localStorage.setItem("token", data.token); // Store your app's token
            localStorage.setItem("user", JSON.stringify(userObject));

            setUser(userObject);
            console.log("Google Login Success:", userObject);
            navigate("/home");
        } catch (error) {
            console.error("Google Login Error:", error);
            setError("Google login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Google login failure
    const handleGoogleFailure = (error) => {
        console.error("Google Login Failed:", error);
        setError("Google login failed. Please try again.");
    };

    // Handle logout
    const handleLogout = () => {
        googleLogout();
        setUser(null);
        localStorage.removeItem("googleToken");
        localStorage.removeItem("token");
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
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div className={style.input__group}>
                    <input
                        ref={emailRef}
                        type="email"
                        placeholder="Your Email"
                        required
                        disabled={isLoading}
                    />
                </div>
                <div className={style.input__group}>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        ref={passwordRef}
                        required
                        disabled={isLoading}
                    />
                    <span
                        className={style.password__toggle}
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                    </span>
                </div>
                <button
                    type="submit"
                    className={style.join__button}
                    disabled={isLoading}
                >
                    <div className={style.button__loading}>

                        {isLoading ? <PuffLoader color="#000" size={20} /> : "Login"}
                    </div>
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
                            useOneTap
                            disabled={isLoading}
                        />
                    )}
                </div>
            </form>
        </div>
    );
};

export default Login;