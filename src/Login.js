import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from "react-router-dom";

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL + '/posters/Login.png'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    if (!email.includes("@")) {
      setError("Enter a valid email");
      return;
    }
  
    // UPDATED: Pointing to the new PHP API on XAMPP
    fetch("http://localhost/streaming_api/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        localStorage.setItem("auth", JSON.stringify({ loggedIn: true }));
        localStorage.setItem("currentUser", JSON.stringify(data.user));

        setIsAuthenticated(true);
        navigate("/home");
      } else {
        setError(data.message || "Login failed");
      }
    })
    .catch(() => {
      setError("Server error - Make sure XAMPP Apache/MySQL are running.");
    });
  }

  return (
    <div style={loginStyle} className="login-container">
      <form className="login-form" key={window.location.pathname} onSubmit={handleSubmit} autoComplete="off">
        <h2>OTT Platform Login</h2>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            id="email"
            className={error ? "input-error" : ""}
            value={email}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          {error && !email && <p className="error-text">Email is required</p>}
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            id="password"
            className={error ? "input-error" : ""}
            value={password}
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          {error && !password && <p className="error-text">Password is required</p>}
        </div>

        {error && email && password && (
          <p className="error-text">{error}</p>
        )}

        <button
          type="submit"
          className="login-btn"
          disabled={!email || !password}
        >
          Login
        </button>

        <p style={{ textAlign: "center" }}>
          Don't have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;