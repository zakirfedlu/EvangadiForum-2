import React from 'react';
import styles from './HomePage.module.css';
import { Link } from 'react-router-dom';
import Layout from '../../Layout';


const Home = () => {
    return (
        <Layout>
            <div className={styles.container}>
                {/* Steps Section */}
                <div className={styles.stepsSection}>
                    <h1 className={styles.heading}>Steps to write a good question</h1>
                    <ul className={styles.stepsList}>
                        <li>Summarize your problem in a one-line title.</li>
                        <li>Describe your problem in more detail.</li>
                        <li>Describe what you tried and what you expected to happen.</li>
                        <li>Review your question and post it to the site.</li>
                    </ul>
                </div>

                {/* Form Section */}
                <div className={styles.AskQuestion}>
                    <h1 className={styles.heading}>Ask a public question</h1>
                    <Link to="/" className={styles.link}>Go to Question page</Link>
                    <div className={styles.formSection}>
                        <form className={styles.form}>
                            <input
                                type="text"
                                placeholder="Title"
                                className={styles.input}
                            />
                            <textarea
                                placeholder="Question Description..."
                                className={styles.textarea}
                            ></textarea>
                            <button type="submit" className={styles.submitButton}>
                                Post Your Question
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Home;