import React, { useEffect, useState } from 'react';
import { RxAvatar } from 'react-icons/rx';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Layout from '../../Layout'; // Assuming Layout is a wrapper component
import styles from './HomePage.module.css';
import { ScaleLoader } from 'react-spinners';

const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('./db.json')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <Layout>

            <div className={styles.container}>
                <div className={styles.header}>
                    <button className={styles.askButton}>
                        <Link to="/askQuestion" className={styles.link}>
                            Ask a Question
                        </Link>
                    </button>
                    <p className={styles.welcome}>Welcome: Sami_Developer</p>
                </div>
                <h2 className={styles.questionsHeading}>Questions</h2><hr />
                <div className={styles.content}>
                    {
                        loading ? (
                            <div className={styles.loading}>
                                <ScaleLoader />
                            </div>
                        ) : (
                            data.map((item) => (
                                <div key={item.id} className={styles.questionItem}>
                                    <div className={styles.userInfo}>
                                        <RxAvatar size={70} className={styles.avatar} />
                                        <p className={styles.username}>{item.name}</p>
                                    </div>
                                    <div className={styles.questionContent}>
                                        <p className={styles.questionText}>{item.title}</p>
                                        <MdKeyboardArrowRight size={30} className={styles.arrow} />
                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
        </Layout>
    );
};

export default Home;