import React from 'react'
import style from './About.module.css'
import { Link } from 'react-router-dom'

const About = () => {
    return (
        <div className={style.description__container}>
            <h4>About</h4>
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
            <Link to="/howItWorks">
                <button className={style.how__it__works}>HOW IT WORKS</button>
            </Link>
        </div>
    )
}

export default About