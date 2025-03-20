import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Auth from './components/Auth/Auth'
import Home from './components/HomePage/Home'
const Routing = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Auth />} />
                {/* <Route path="/createAccount" element={<CreateAccount />} /> */}
                <Route path="/home" element={<Home />} />
                {/* <Route path="/how-it-works" element={<HowItWorks />} /> */}
            </Routes>
        </Router>
    )
}

export default Routing