import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  }, [navigate]);

  return (
    <div className="container">
      <div className="logout-container">
        <h2>You have been logged out successfully!</h2>
        <button onClick={() => navigate("/login")}>Go to Login</button>
      </div>
    </div>
  );
};

export default Logout;
