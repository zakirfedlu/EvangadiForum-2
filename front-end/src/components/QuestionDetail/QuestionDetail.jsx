import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { RxAvatar } from 'react-icons/rx';
import Layout from '../../Layout';
import { CircleLoader } from 'react-spinners';
import axios from '../../API/axiosConfig';
import styles from './QuestionDetail.module.css';
import { authContext } from '../Util/ProtectedRoutes';

const QuestionDetail = () => {
  const [question, setQuestion] = useState({ title: '', description: '', answers: [] });
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState('');
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const { users } = useContext(authContext);

  const userName = users?.user?.userName || localStorage.getItem('userName') || 'Guest';

  // Function to fetch question details including answers
  const fetchData = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await axios.get(`/answer/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestion((prevState) => ({
        ...prevState,
        ...response.data,
      }));
    } catch (error) {
      console.error('Error fetching question:', error);
    }
    setLoading(false);
  };
  console.warn(question)
  // Fetch the question and answers on mount
  useEffect(() => {
    fetchData();
  }, [id, token]); // Fetch data again if `id` or `token` changes

  // Handle answer submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `/answer/${id}`,
        { answer, name: userName },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Add the new answer to the beginning of the answers list
      setQuestion((prevState) => ({
        ...prevState,
        answers: [response.data, ...prevState.answers],
      }));
      setAnswer('');
    } catch (error) {
      console.error('Error posting answer:', error);
    }
  };



  if (loading) {
    return (
      <Layout>
        <div className={styles.loading} style={{ marginto: "50vh", }}>
          <CircleLoader size={25} color="#3498db" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.detail__container}>
        <div className={styles.questionSection}>
          <h1 className={styles.sectionTitle}>Question</h1>
          <p className={styles.questionText}>{question.questionTitle || "What's react-router-dom?"}</p>
          <p className={styles.subText}>{question.description || 'How does it work?'}</p>
          <hr className={styles.divider} />
        </div>

        <div className={styles.answersSection}>
          <h2 className={styles.sectionTitle}>Answers From The Community</h2>
          <hr className={styles.divider} />
          {question.answers.length > 0 ? (
            question.answers.map((ans, idx) => (
              <div className={styles.answerItem} key={idx}>
                <div className={styles.userInfo}>
                  <RxAvatar className={styles.avatar} />
                  <p className={styles.username}>{ans.username || 'Guest'}</p>
                </div>
                <div className={styles.answerContent}>
                  <p className={styles.answerText}>{ans.content}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No answers yet.</p>
          )}
        </div>

        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Answer The Question</h2>
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
      </div>
    </Layout>
  );
};

export default QuestionDetail;
