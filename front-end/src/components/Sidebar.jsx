import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // Add styles if needed

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li>
          <Link to="/dashboard/contact">contact</Link>
        </li>
        <li>
          <Link to="/dashboard/setting">Settings</Link>
        </li>
        <li>
          <Link to="/dashboard/profile">Profile</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
