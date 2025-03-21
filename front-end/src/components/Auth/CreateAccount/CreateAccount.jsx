import React, { useState } from 'react'
import style from '../Auth.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { useRef } from 'react'
import axiosConfig from '../../../API/axiosConfig'


const CreateAccount = ({ toggleAuth }) => {
    const [showPassword, setShowPassword] = useState(false);
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
        // console.log(email.current.value, firstName.current.value, lastName.current.value, userName.current.value, password.current.value);
        try {
            const response = await axiosConfig.post('/users/register', {
                email: email.current.value,
                firstName: firstName.current.value,
                lastName: lastName.current.value,
                userName: userName.current.value,
                password: password.current.value
            });
            console.log(response.data);
            navigate('/login');
        } catch (error) {
            console.error(error);
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
                <button type="submit" className={style.join__button} onClick={handleCreateAccount}>
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
    )
}

export default CreateAccount