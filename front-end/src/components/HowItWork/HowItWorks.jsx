import React, { useEffect, useState } from "react";
import styles from "./howItWorks.module.css";
import Layout from "../../Layout";
import axios from "axios";

const HowToWork = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get("/db.json").then((res) => {
            setData(res.data)
        })
    }, [])

    const introduction =
        "Welcome to the Evangadi Forum! A place to ask questions, share knowledge, and connect with a community of learners and experts.";

    return (
        <Layout>
            <div className={styles.container}>
                <h1 className={styles.heading}>How It Works</h1>
                <p className={styles.introduction}>{introduction}</p>
                <div className={styles.steps}>
                    {data.map((item) => (
                        <div key={item.step} className={styles.stepItem}>
                            <div className={styles.stepNumber}>{item.step}</div>
                            <div className={styles.stepContent}>
                                <h2 className={styles.stepTitle}>{item.title}</h2>
                                <p className={styles.stepDescription}>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default HowToWork;