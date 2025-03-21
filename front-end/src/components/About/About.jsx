import React from 'react'
import style from './About.module.css'

const About = () => {
    return (
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
    )
}

export default About