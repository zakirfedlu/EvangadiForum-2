import React, { useState } from 'react'
import style from "./Auth.module.css"
import Layout from '../../Layout'
import Login from './Login/Login'
import CreateAccount from './CreateAccount/CreateAccount'
import About from '../About/About'

const Auth = () => {
    const [Auth, setAuth] = useState(true)

    function toggleAuth() {
        setAuth(prev => !prev)
    }
    return (
        <Layout>
            <div className={style.home__container}>
                <div>
                    {Auth ? (
                        <Login toggleAuth={toggleAuth} />
                    ) : (
                        <CreateAccount toggleAuth={toggleAuth} />
                    )}
                </div>
                <About />
            </div>
        </Layout>
    )
}

export default Auth