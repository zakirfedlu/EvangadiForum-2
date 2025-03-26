import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { RxAvatar } from 'react-icons/rx';
import Layout from '../../Layout';
import { ScaleLoader } from 'react-spinners';
import axios from '../../API/axiosConfig';
import styles from './QuestionDetail.module.css';
import { authContext } from '../Util/ProtectedRoutes';

const QuestionDetail = () => {
  const [question, setQuestion] = useState({ title: '', description: '', answers: [] });
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState('');
  const [name, setName] = useState('');
  const { id } = useParams();
  const answerRef = useRef();




  const answerHandler = () => {
    setAnswer(answerRef.current.value);
  }
  console.log(answer)
  const token = localStorage.getItem('token');
  const { users } = useContext(authContext);
  console.log(users)




  const userName = users?.username || localStorage.getItem('userName') || 'Guest';

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/answer/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestion((prevState) => ({
        ...prevState,
        ...response.data,
        answers: response.data.answers || [],
      }));
    } catch (error) {
      console.error('Error fetching question:', error);
    }
    setLoading(false);
  };
  console.warn(question)

  useEffect(() => {
    fetchData();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/answer/${id}`,
        { name: userName, },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data)
      setQuestion((prevState) => ({
        ...prevState,
        answers: [response.data, ...prevState.answers],
      }));
      setAnswer('');
    } catch (error) {
      console.error('Error posting answer:', error);
    }
  };



  return (
    <Layout>

      <div className={styles.detail__container}>
        <div className={styles.questionSection}>
          <h1 className={styles.sectionTitle}>Question</h1>
          <p className={styles.questionText}>{question.questionTitle}</p>
          <p className={styles.subText}>{question.description || 'How does it work?'}</p>
          <hr className={styles.divider} />
        </div>
        {
          loading ? (
            <div className={styles.loading}>
              <ScaleLoader />
            </div>
          ) : (
            <>
              <div className={styles.answersSection}>
                <h2 className={styles.sectionTitle}>Answers From The Community</h2>
                <hr className={styles.divider} />
                {question.answers.length > 0 ? (
                  question.answers.map((ans, idx) => (
                    <div className={styles.answerItem} key={idx}>
                      <div className={styles.userInfo}>
                        <RxAvatar className={styles.avatar} />
                        <p className={styles.username}>{userName || 'Guest'}</p>
                      </div>
                      <div className={styles.answerContent}>
                        <p className={styles.answerText}>{ans.content}</p>
                        <p>{name}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No answers yet.</p>
                )}
              </div>

              <div className={styles.formSection}>
                <h2 className={styles.sectionTitle}>Answer The Question</h2>
                <form onSubmit={handleSubmit} >
                  <div className={styles.textareaWrapper}>
                    <textarea
                      ref={answerRef}
                      placeholder="Your Answer..."
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      className={styles.textarea}
                      required
                    />
                  </div>
                  <button type="submit" className={styles.submitButton} onClick={() => setName(answer)}>
                    Post Your Answer
                  </button>
                </form>
              </div>
            </>
          )
        }
      </div>

    </Layout>
  );
};

export default QuestionDetail;
