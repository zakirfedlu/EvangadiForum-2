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

  const { users } = useContext(authContext);
  const userName = users?.user?.userName || "Guest";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); 

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
        console.log(response.data); // Log response
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); 
      }
    };

    fetchData();
  }, []); // Only run on component mount


  const filteredData = (Array.isArray(data) ? data : []).filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  console.log(filteredData);
  
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
            <span
              style={{ color: "#ff6200", fontWeight: "600", fontSize: "18px" }}
            >
              {userName}
            </span>
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
            filteredData.map((item) => (
              <Link
              to={`/askQuestion/${item.question_id}`} // Use question_id instead of id
              key={item.question_id} // Ensure a unique key
              className={styles.questionItem}
              >
                {console.log(item)}
                <div className={styles.userInfo}>
                  <RxAvatar size={70} className={styles.avatar} />
                  <p className={styles.username}>{item.username}</p>
                </div>
                <div className={styles.questionContent}>
                  <p className={styles.questionText}>{item.title}</p>
                  <MdKeyboardArrowRight size={30} className={styles.arrow} />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
