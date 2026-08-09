import React, { useState } from 'react';
import axios from "axios"
import './Login.css';
import { useNavigate } from "react-router-dom";

function Login({ setIsAuthenticated }) {
  const [loading , setLoading] = useState(false)
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    if (!email.includes("@")) {
      setError("Enter a valid email");
      return;
    }
    try{
      const response = await axios.post(
        "http://localhost:5000/api/auth/login", 
        {
          email,
          password,
        }
      );

      const data = response.data;
        
      if (data.success) { 
        localStorage.setItem("token", data.token);
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        
        window.dispatchEvent(new Event("storage"));

        setIsAuthenticated(true);
        navigate("/home");
      } else {
          setError(data.message || "Login failed");
        } 

      } catch (err) {
        setError(err.response?.message || 
          "Server Error"
        );
      }finally{
        setLoading(false);
      }
  };

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
          disabled={loading}
        >
          {loading ? "Logging in.." : "Login"}
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