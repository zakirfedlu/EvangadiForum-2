import React, { useContext, useEffect, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import Layout from "../../Layout";
import styles from "./HomePage.module.css";
import { ScaleLoader } from "react-spinners";
import ChatBot from "../ChatBot/ChatBot";
import { authContext } from "../Util/ProtectedRoutes";
import axiosConfig from "../../API/axiosConfig";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const questionsPerPage = 4; // Number of questions to display per page

  const { users } = useContext(authContext);

  // console.log(users)
  const userName = users?.username || localStorage.getItem('userName') || 'Guest';

  const token = localStorage.getItem("token");
  // console.log(users.username)

  useEffect(() => {
    const fetchData = async () => {
      try {

        if (!token) {
          console.error("No token found, authentication required.");
          setLoading(false);
          return;
        }
        const response = await axiosConfig.get("/askQuestion", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(response.data?.questions || []);
        setLoading(false);
        console.log(response.data.questions[0].username);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter data based on search input
  const filteredData = (Array.isArray(data) ? data : []).filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate pagination details
  // Calculate the total number of questions based on the filtered data
  const totalQuestions = filteredData.length;

  // Calculate the total number of pages based on the number of questions per page
  const totalPages = Math.ceil(totalQuestions / questionsPerPage);

  // Calculate the start index of the current page
  const startIndex = (currentPage - 1) * questionsPerPage;

  // Calculate the end index of the current page
  const endIndex = startIndex + questionsPerPage;

  // Slice the filtered data to get the current page's questions
  const currentQuestions = filteredData.slice(startIndex, endIndex);

  // Handle Next button click
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Handle Previous button click
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <Layout>
      <ChatBot />
      <div className={styles.container}>
        <div className={styles.header}>
          <button className={styles.askButton}>
            <Link to="/askQuestion" className={styles.link}>
              Ask a Question
            </Link>
          </button>
          <p className={styles.welcome}>
            Welcome:{" "}
            {users && (
              <span
                style={{ color: "#ff6200", fontWeight: "600", fontSize: "18px" }}
              >
                {userName}
              </span>
            )}
          </p>
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
            <>
              {currentQuestions.map((item) => (
                <Link
                  to={`/askQuestion/${item.question_id}`}
                  key={item.question_id}
                  className={styles.questionItem}
                >
                  <div className={styles.userInfo}>
                    <RxAvatar size={70} className={styles.avatar} />
                    <p className={styles.username}>{item.username}</p>
                  </div>
                  <div className={styles.questionContent}>
                    <p className={styles.questionText}>{item.title}</p>
                    <MdKeyboardArrowRight size={30} className={styles.arrow} />
                  </div>
                </Link>
              ))}
              {totalQuestions > questionsPerPage && (
                <div className={styles.pagination}>
                  <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className={styles.paginationButton}
                  >
                    Previous
                  </button>
                  <span className={styles.pageInfo}>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={styles.paginationButton}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;