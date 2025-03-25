import React, { useState } from 'react';
import style from '../Auth.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useRef } from 'react';
import axios from '../../../API/axiosConfig';

const CreateAccount = ({ toggleAuth }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(''); // Added for error handling
    const navigate = useNavigate();


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const emailRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const userNameRef = useRef();
    const passwordRef = useRef();


    const handleCreateAccount = async (e) => {
        e.preventDefault();
        setError('');

        if (!emailRef.current.value ||
            !firstNameRef.current.value ||
            !lastNameRef.current.value ||
            !userNameRef.current.value ||
            !passwordRef.current.value
        ) {
            setError('Please fill in all fields');
            return;
        }

        const userData = {
            email: emailRef.current.value,
            firstname: firstNameRef.current.value,
            lastname: lastNameRef.current.value,
            username: userNameRef.current.value,
            user_password: passwordRef.current.value,
        };

        try {
            const response = await axios.post('/users/register', userData);
            console.log('Account created successfully:', response.data);
            navigate('/'); // Redirect to login page on success
        } catch (error) {
            console.error('Error creating account:', error.message);
            if (error.response?.data?.message) {
                setError(error.response.data.message); // Display API error message
            } else {
                setError('Something went wrong. Please try again later.');
            }
        }
    };

    return (
        <div className={`${style.form__container} ${style.create}`}>
            <form className={style.form} onSubmit={handleCreateAccount}     >
                <h1>Join the network</h1>
                <p>
                    Already have an account?{' '}
                    <Link to="/" onClick={toggleAuth} className={style.create__account}>
                        Sign in
                    </Link>
                </p>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
                <div className={style.input__group}>
                    <input
                        ref={emailRef}
                        type="email"
                        placeholder="Email"
                        required />
                </div>
                <div className={style.name__group}>
                    <div className={style.input__group}>
                        <input
                            ref={firstNameRef}
                            type="text"
                            placeholder="First Name"
                            required />
                    </div>
                    <div className={style.input__group}>
                        <input
                            ref={lastNameRef}
                            type="text"
                            placeholder="Last Name"
                            required />
                    </div>
                </div>
                <div className={style.input__group}>
                    <input
                        ref={userNameRef}
                        type="text"
                        placeholder="User Name"
                        required />
                </div>
                <div className={style.input__group}>
                    <div className={style.password__wrapper}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            required
                            ref={passwordRef}
                        />
                        <span
                            className={style.password__toggle}
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </span>
                    </div>
                </div>
                <button type="submit" className={style.join__button}>
                    Agree and Join
                </button>
                <p className={style.terms}>
                    I agree to the{' '}
                    <Link to="/" className={style.create__account}>
                        privacy policy
                    </Link>{' '}
                    and{' '}
                    <Link to="/" className={style.create__account}>
                        terms of service
                    </Link>.
                </p>
                <p>
                    Already have an account?{' '}
                    <Link to="/" onClick={toggleAuth} className={style.create__account}>
                        Sign in
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default CreateAccount;