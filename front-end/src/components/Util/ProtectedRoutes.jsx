import React, { createContext, useState, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import axiosConfig from "../../API/axiosConfig";

export const authContext = createContext();

function ProtectedRoutes() {
  const [users, SetUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  async function checkUser() {
    if (!token) {
      navigate("/login");
      setLoading(false);
      return;
    }
    try {
      const { data } = await axiosConfig.get("users/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      SetUsers(data);
    } catch (error) {
      console.log(error.message);
      navigate("/login");
    }
    setLoading(false);
  }

  useEffect(() => {
    checkUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>; //! Show loading state while checking user
  }

  return (
    <authContext.Provider value={{ users, SetUsers }}>
      {users ? <Outlet /> : <Navigate to="/login" />}
    </authContext.Provider>
  );
}

export default ProtectedRoutes;
