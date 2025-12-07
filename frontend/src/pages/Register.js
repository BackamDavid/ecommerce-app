import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!name || !email || !password) {
      setMessage("❌ All fields are required!");
      return;
    }

    try {
      const response = await api.post("/auth/register", { name, email, password });
      setMessage("✅ Registered successfully!");
      console.log("Backend response:", response.data);
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
      let errorMsg = "Registration failed!";
      if (err.response && err.response.data) {
        errorMsg = err.response.data.error || errorMsg;
      }
      setMessage("❌ " + errorMsg);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br /><br />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />
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
          Register
        </button>
      </form>
      {message && <p style={{ marginTop: "15px" }}>{message}</p>}
    </div>
  );
}
