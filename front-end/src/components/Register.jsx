import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const values = {
      username,
      email,
      password,
    };

    fetch("http://localhost:3000/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          navigateTo("/login"); // If registration is successful, redirect to login
        } else {
          alert(data.message); // Show error message if registration fails
        }
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("An error occurred. Please try again later.");
      });
  };

  return (
    <div className="container">
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <hr />
          <span>
            <Link to="/login">Already registered? Login</Link>
            <button className="register" type="submit">
              Register
            </button>
          </span>
        </form>
        <p>Powered By Ajith</p>
      </div>
    </div>
  );
};

export default Register;
