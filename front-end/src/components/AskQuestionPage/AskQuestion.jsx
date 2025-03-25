import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AskQueation.module.css";
import Layout from "../../Layout";
import axios from "../../API/axiosConfig";

const AskQuestion = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    // Ensure token exists
    if (!token) {
      console.log("No token found, please log in.");
      return;
    }

    // Prepare the question data to send
    const questionData = {
      title: title,
      description: description,
    };

    setLoading(true); // Set loading to true when submission begins

    try {
      // Send question data to backend with Authorization header
      const response = await axios.post("/askQuestion", questionData, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token in request header
        },
      });

      console.log("Question posted successfully:", response.data);

      // Navigate to home after successful submission
      navigate("/home"); // This will navigate to /home after posting the question
    } catch (error) {
      console.log("Error posting question:", error.message); // Log error if the request fails
    } finally {
      setLoading(false); // Set loading to false after request completes
    }
  };

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
          <Link to="/home" className={styles.link}>
            Go to Question page
          </Link>
          <div className={styles.formSection}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Title"
                className={styles.input}
                value={title} // Controlled input
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Question Description..."
                className={styles.textarea}
                value={description} // Controlled input
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={loading}
              >
                {loading ? "Posting..." : "Post Your Question"}{" "}
                {/* Show loading text */}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AskQuestion;
