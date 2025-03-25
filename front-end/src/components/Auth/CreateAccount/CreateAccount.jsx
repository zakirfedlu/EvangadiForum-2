import React, { useState } from 'react';
import style from '../Auth.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useRef } from 'react';
import axiosConfig from '../../../API/axiosConfig';

const CreateAccount = ({ toggleAuth }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const emailRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axiosConfig.post('/users/register', {
        email: emailRef.current.value,
        first_name: firstNameRef.current.value,
        last_name: lastNameRef.current.value,
        username: userNameRef.current.value,
        password: passwordRef.current.value,
      });

      // On success, redirect to the login page
      navigate("/login");
    } catch (error) {
      // If there's an error, show it in the red-colored div
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className={`${style.form__container} ${style.create}`}>
      <form className={style.form} onSubmit={handleCreateAccount}>
        <h1>Join the network</h1>
        <p>
          Already have an account?{' '}
          <Link to="/" onClick={toggleAuth} className={style.create__account}>
            Sign in
          </Link>
        </p>

        {error && (
          <div className={style.errorMessage}>
            <p>{error}</p>
          </div>
        )}

        <div className={style.input__group}>
          <input ref={emailRef} type="email" placeholder="Email" required />
        </div>

        <div className={style.name__group}>
          <div className={style.input__group}>
            <input ref={firstNameRef} type="text" placeholder="First Name" required />
          </div>
          <div className={style.input__group}>
            <input ref={lastNameRef} type="text" placeholder="Last Name" required />
          </div>
        </div>

        <div className={style.input__group}>
          <input ref={userNameRef} type="text" placeholder="User Name" required />
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
