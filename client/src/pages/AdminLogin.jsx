import React, { useState } from "react";
import axios from "axios";

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("admin@example.com"); // Predefined
  const [password, setPassword] = useState("admin123");    // Predefined
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:7001/api/auth/login", {
        email,
        password,
      });

      // Save token
      localStorage.setItem("adminToken", res.data.token);
      setMessage("✅ Logged in successfully!");

      if (onLogin) onLogin(res.data.token);
    } catch (err) {
      setMessage("❌ Invalid credentials");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Admin Login</h2>
      <button 
        onClick={handleLogin} 
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Login as Admin
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminLogin;
