import React from 'react'
import Layout from '../../Layout'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { RxAvatar } from 'react-icons/rx';
import styles from './QuestionDetail.module.css'
import { ScaleLoader } from 'react-spinners';


const QuestionDetail = () => {
    const [question, setQuestion] = useState({})
    const [loading, setLoading] = useState(true)
    const [answer, setAnswer] = useState('');
    const { id } = useParams()

    useEffect(() => {
        fetch(`/db.json/question/${id}`)
            .then(res => res.json())
            .then(data => setQuestion(data))
            .finally(() => setLoading(false))
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to submit the answer to the backend
        fetch('/db.json/answers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                questionId: id,
                answer: answer,
                name: 'Sami_Developer', // Replace with the logged-in user's name
            }),
        })
            .then((res) => res.json())
            .then((newAnswer) => {
                // Optionally update the UI with the new answer
                setQuestion((prev) => ({
                    ...prev,
                    answers: [...(prev.answers || []), newAnswer],
                }));
                setAnswer(''); // Clear the textarea
            })
            .catch((error) => console.error('Error posting answer:', error));
    }


    return (
        <Layout>
            <div className={styles.detail__container}>
                {
                    loading ? (
                        <div className={styles.loading}>
                            <ScaleLoader />
                        </div>
                    )
                        : (
                            <>
                                <div className={styles.questionSection}>
                                    <h1 className={styles.sectionTitle}>Question</h1>
                                    <p className={styles.questionText}>
                                        {question.title || "what's react-router-dom?"}
                                    </p>
                                    <p className={styles.subText}>how does it work</p>
                                    <hr className={styles.divider} />
                                </div>

                                <div className={styles.answersSection}>
                                    <h2 className={styles.sectionTitle}>Answer From The Community</h2>
                                    <hr className={styles.divider} />
                                    {question.answer ? (
                                        <div className={styles.answerItem}>
                                            <div className={styles.userInfo}>
                                                <RxAvatar className={styles.avatar} />
                                                <p className={styles.username}>{question.name || 'misrak_2'}</p>
                                            </div>
                                            <div className={styles.answerContent}>
                                                <p className={styles.answerText}>{question.answer}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <p>No answers yet.</p>
                                    )}
                                </div>

                                <div className={styles.formSection}>
                                    <h2 className={styles.sectionTitle}>Answer The Top Question</h2>
                                    <Link to="/askQuestion" className={styles.link}>
                                        Go to Question page
                                    </Link>
                                    <form onSubmit={handleSubmit}>
                                        <div className={styles.textareaWrapper}>
                                            <textarea
                                                placeholder="Your Answer..."
                                                value={answer}
                                                onChange={(e) => setAnswer(e.target.value)}
                                                className={styles.textarea}
                                                required
                                            />
                                        </div>
                                        <button type="submit" className={styles.submitButton}>
                                            Post Your Answer
                                        </button>
                                    </form>
                                </div>
                            </>
                        )
                }

            </div>
        </Layout>
    )
}

export default QuestionDetail