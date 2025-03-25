import React, { useState } from 'react';
import style from '../Auth.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useRef } from 'react';
import axiosConfig from '../../../API/axiosConfig';
import Login from '../Login/Login';
const CreateAccount = ({ toggleAuth }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const email = useRef();
  const firstName = useRef();
  const lastName = useRef();
  const userName = useRef();
  const password = useRef();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosConfig.post('/users/register', {
        email: email.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        username: userName.current.value,
        password: password.current.value,
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
          <input ref={email} type="email" placeholder="Email" required />
        </div>

        <div className={style.name__group}>
          <div className={style.input__group}>
            <input ref={firstName} type="text" placeholder="First Name" required />
          </div>
          <div className={style.input__group}>
            <input ref={lastName} type="text" placeholder="Last Name" required />
          </div>
        </div>

        <div className={style.input__group}>
          <input ref={userName} type="text" placeholder="User Name" required />
        </div>

        <div className={style.input__group}>
          <div className={style.password__wrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              required
              ref={password}
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
