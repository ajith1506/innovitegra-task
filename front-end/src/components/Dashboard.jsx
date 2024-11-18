import React from "react";
import Sidebar from "./Sidebar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Contact from "./Contact";
import Settings from "./Setting";
import Profile from "./profile";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="main-content">
        <div className="dashboard-header">
          <h1>Welcome to Dashboard</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <Routes>
          <Route path="/contact" element={<Contact />} />
          <Route path="/setting" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
