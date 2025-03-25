import React, { useState, useRef, useEffect } from "react";
import style from "../Auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "../../../API/axiosConfig";
import { PuffLoader, ScaleLoader } from "react-spinners"; // Import ScaleLoader for the animation

const Login = ({ toggleAuth }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false); // New loading state
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailValue = emailRef.current.value;
        const passValue = passwordRef.current.value;

        if (!emailValue || !passValue) {
            setError("Please provide both email and password");
            return;
        }

        setIsLoading(true); // Start loading animation
        setError(""); // Clear previous errors

        try {
            const { data } = await axios.post("/users/login", {
                email: emailValue,
                password: passValue,
            });
            console.log(data);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/home");
        } catch (error) {
            console.warn(error.message);
            setError(error.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setIsLoading(false); // Stop loading animation regardless of success or failure
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
    useEffect(() => {
        setInterval(() => {
            setIsLoading(false);
        }, 5000);
    }, []);

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
                        disabled={isLoading} // Disable input during loading
                    />
                </div>
                <div className={style.input__group}>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        ref={passwordRef}
                        required
                        disabled={isLoading} // Disable input during loading
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
                    className={style.submit__button}
                    disabled={isLoading} // Disable button during loading
                >
                    {isLoading ? (
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <PuffLoader color="#fff" />
                        </div>
                    ) : (
                        "Login"
                    )}
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
                        />
                    )}
                </div>
            </form>
        </div>
    );
};

export default Login;