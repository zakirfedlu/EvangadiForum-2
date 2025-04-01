import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { RxAvatar } from 'react-icons/rx';
import Layout from '../../Layout';
import { ClipLoader } from 'react-spinners';
import axios from '../../API/axiosConfig';
import styles from './QuestionDetail.module.css';
import { authContext } from '../Util/ProtectedRoutes';


const QuestionDetail = () => {
  const [question, setQuestion] = useState({ title: '', description: '', answers: [] });
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState('');
  const [postingAnswer, setPostingAnswer] = useState(false);
  const [postingMessage, setPostingMessage] = useState('');
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const { users } = useContext(authContext);


  // const {description}=useContext(QuestionContext);
  // console.warn(description)

  const userName = users?.username || localStorage.getItem('username') || 'Guest';

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/answer/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestion(response.data);
    } catch (error) {
      console.error('Error fetching question:', error);
    }
    setLoading(false);
  };
  // console.log(question)
  useEffect(() => {
    fetchData();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (question.answers.some(ans => ans.content === answer.trim())) {
      setPostingMessage("Duplicate answer detected!")
      return;
    }


    setPostingAnswer(true);
    setPostingMessage('Posting your answer...');

    try {
      await axios.post(`/answer/${id}`,
        { answer },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
      setAnswer('');
      await fetchData();
      setPostingMessage('Your answer was posted successfully!');
    } catch (error) {
      console.error('Error posting answer:', error);
      setPostingMessage('Error posting your answer. Please try again.');
    }
    setPostingAnswer(false);
  };

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
          {loading ? (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <ClipLoader size={25} color="#3498db" />
            </div>
          ) : question.answers.length > 0 ? (
            question.answers.map((ans, idx) => (
              <div className={styles.answerItem} key={idx}>
                <div className={styles.userInfo}>
                  <RxAvatar className={styles.avatar} />
                  <p className={styles.username}>{userName || 'Guest'}</p>
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
            <button type="submit" className={styles.submitButton} disabled={postingAnswer}>
              {postingAnswer ? <ClipLoader size={15} color="#fff" /> : 'Post Your Answer'}
            </button>
          </form>
          {postingMessage && <p className={styles.postingMessage}>{postingMessage}</p>}
        </div>
      </div>
    </Layout>
  );
};

export default QuestionDetail;