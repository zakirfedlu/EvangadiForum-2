import React from "react";
import styles from "./howItWorks.module.css";
import Layout from "../../Layout";

const HowToWork = () => {
    const introduction =
        "Welcome to the Evangadi Forum! A place to ask questions, share knowledge, and connect with a community of learners and experts.";

    const steps = [
        {
            step: 1,
            title: "Join the Community",
            description:
                "Sign up with your email to become a part of the Evangadi Forum.",
        },
        {
            step: 2,
            title: "Ask Questions",
            description:
                "Post your questions and get answers from learners and experts alike.",
        },
        {
            step: 3,
            title: "Share Knowledge",
            description:
                "Contribute by answering questions and sharing your expertise with others.",
        },
        {
            step: 4,
            title: "Connect & Grow",
            description:
                "Engage with the community, build connections, and expand your learning.",
        },
    ];

    return (
        <Layout>
            <div className={styles.container}>
                <h1 className={styles.heading}>How It Works</h1>
                <p className={styles.introduction}>{introduction}</p>
                <div className={styles.steps}>
                    {steps.map((item) => (
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