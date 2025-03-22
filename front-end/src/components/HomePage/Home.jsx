import React, { useEffect, useState } from 'react';
import { RxAvatar } from 'react-icons/rx';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Layout from '../../Layout';
import styles from './HomePage.module.css';
import { ScaleLoader } from 'react-spinners';
import ChatBot from '../ChatBot/ChatBot';

const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch('./db.json')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    // Filter the data based on the search term
    const filteredData = data.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

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
                <div className={styles.search}>
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <h2 className={styles.questionsHeading}>Questions</h2>
                <hr />
                <div className={styles.content}>
                    {loading ? (
                        <div className={styles.loading}>
                            <ScaleLoader />
                        </div>
                    ) : (
                        // Render filteredData instead of data
                        filteredData.map((item) => (
                            <Link
                                to={`/askQuestion/${item.id}`}
                                key={item.id}
                                className={styles.questionItem}
                            >
                                <div className={styles.userInfo}>
                                    <RxAvatar size={70} className={styles.avatar} />
                                    <p className={styles.username}>{item.name}</p>
                                </div>
                                <div className={styles.questionContent}>
                                    <p className={styles.questionText}>{item.title}</p>
                                    <MdKeyboardArrowRight
                                        size={30}
                                        className={styles.arrow}
                                    />
                                </div>
                            </Link>
                        ))
                    )}
                    <ChatBot />
                </div>
            </div>
        </Layout>
    );
};

export default Home;