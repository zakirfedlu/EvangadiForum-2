import React, { useState } from 'react'
import style from "./Auth.module.css"
import { Link } from 'react-router-dom'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import Layout from '../../Layout'

const Auth = () => {
    const [Auth, setAuth] = useState(true)
    const [showPassword, setShowPassword] = useState(false);


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    function toggleAuth() {
        setAuth(prev => !prev)
    }
    return (
        <Layout>
            <div className={style.home__container}>
                <div>
                    {Auth ? (
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
                                    <Link to="/home">
                                        SUBMIT
                                    </Link>
                                </button>
                                <p className={style.create__account}><Link to="/" onClick={toggleAuth}>Create an account</Link></p>
                            </form>
                        </div>
                    ) : (
                        <div className={`${style.form__container} ${style.create}`}>
                            <form className={style.form}>
                                <h1>Join the network</h1>
                                <p>
                                    Already have an account?{' '}
                                    <Link to="/" onClick={toggleAuth} className={style.create__account}>
                                        Sign in
                                    </Link>
                                </p>
                                <div className={style.input__group}>
                                    <input type="email" placeholder="Email" required />
                                </div>
                                <div className={style.name__group}>
                                    <div className={style.input__group}>
                                        <input type="text" placeholder="First Name" required />
                                    </div>
                                    <div className={style.input__group}>
                                        <input type="text" placeholder="Last Name" required />
                                    </div>
                                </div>
                                <div className={style.input__group}>
                                    <input type="text" placeholder="User Name" required />
                                </div>
                                <div className={style.input__group}>
                                    <div className={style.password__wrapper}>
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
                                </div>
                                <button type="submit" className={style.join__button}>
                                    <Link to="/home">
                                        Agree and Join
                                    </Link>
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
                    )}
                </div>


                {/* Right Column: Description */}
                <div className={style.description__container}>
                    <h5>About</h5>
                    <h2>Evangadi Networks Q&A</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quidem voluptate officiis beatae nobis pariatur omnis facere accusamus laborum hic, adipisci vero reiciendis, recusandae sit ad, eum quisquam! Molestias, commodi!
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quidem voluptate officiis beatae nobis pariatur omnis facere accusamus laborum hic, adipisci vero reiciendis, recusandae sit ad, eum quisquam! Molestias, commodi!
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullam ipsum, provident minus laudantium esse soluta maiores nostrum nisi sunt perferendis dolorum. Praesentium necessitatibus qua consectetur sunt tempora simus eveniet voluptates?
                    </p>
                    <button className={style.how__it__works}>HOW IT WORKS</button>
                </div>
            </div>
        </Layout>
    )
}

export default Auth