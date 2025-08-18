import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminPage from "./pages/AdminPage";
import CustomerPage from "./pages/CustomerPage";

function App() {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || null);

  const handleLogin = (token) => {
    localStorage.setItem("adminToken", token);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
  };

  return (
    <div>
      {token && (
        <button
          onClick={handleLogout}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      )}

      <Routes>
        {/* Customer-facing homepage */}
        <Route path="/" element={<CustomerPage />} />

        {/* Admin login page (hidden from normal users) */}
        <Route
          path="/admin-login"
          element={token ? <Navigate to="/admin" /> : <AdminLogin onLogin={handleLogin} />}
        />

        {/* Admin dashboard - protected route */}
        <Route
          path="/admin"
          element={token ? <AdminPage /> : <Navigate to="/admin-login" />}
        />

        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
