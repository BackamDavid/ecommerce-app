import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken, setRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://127.0.0.1:5000/api/auth/login", {
      email,
      password,
    });

    const token = response.data.token;
    const role = response.data.role || "user"; // fallback if role is missing

    if (!token) {
      setMessage("❌ Login failed! No token returned.");
      return;
    }

    // Store in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    // Update App state
    setToken(token);
    setRole(role);

    setMessage("✅ Login successful!");
    navigate("/"); // redirect after login

  } catch (error) {
    console.error("Login error:", error.response || error.message);
    const backendMsg = error.response?.data?.error || error.response?.data?.msg;
    setMessage(backendMsg || "❌ Login failed! Check your email or password.");
  }
};

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button 
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#7c3aed",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
            marginTop: "10px",
            transition: "background-color 0.3s"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#6d28d9";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#7c3aed";
          }}
        >
          Login
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
