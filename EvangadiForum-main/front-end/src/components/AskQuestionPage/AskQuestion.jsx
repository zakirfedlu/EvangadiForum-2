import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AskQueation.module.css";
import Layout from "../../Layout";
import axios from "../../API/axiosConfig";
import { FiLoader } from "react-icons/fi";

const AskQuestion = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found, please log in.");
      return;
    }

    const questionData = {
      title: title,
      description: description,
    };

    setLoading(true);

    try {
      const response = await axios.post("/askQuestion", questionData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Question posted successfully:", response.data);
      navigate("/home"); // Navigate to home after posting
    } catch (error) {
      console.log("Error posting question:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.stepsSection}>
          <h1 className={styles.heading}>Steps to write a good question</h1>
          <ul className={styles.stepsList}>
            <li>Summarize your problem in a one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>Review your question and post it to the site.</li>
          </ul>
        </div>

        <div className={styles.AskQuestion}>
          <h1 className={styles.heading}>Ask a public question</h1>
          <Link to="/home" className={styles.link}>
            Go to Question page
          </Link>
          <div className={styles.formSection}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Title"
                className={styles.input}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                placeholder="Question Description..."
                className={styles.textarea}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={loading}
              >
                {loading ? (
                  <FiLoader className={styles.spinner} />
                ) : (
                  "Post Your Question"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AskQuestion;