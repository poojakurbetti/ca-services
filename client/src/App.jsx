import React, { useState, useEffect } from "react";
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
      {token ? (
        <div>
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
          <AdminPage />
        </div>
      ) : (
        <div>
          <AdminLogin onLogin={handleLogin} />
          <CustomerPage />
        </div>
      )}
    </div>
  );
}

export default App;
