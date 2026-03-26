import React, { useState } from 'react';
import './Login.css';import { useNavigate } from "react-router-dom";

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState("");
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const validEmail = "hereitis@gmail.com";
    const validPassword = "loginForYou";
  
    if (email === validEmail && password === validPassword) {
      localStorage.setItem("auth", "true");
      setIsAuthenticated(true);
      navigate("/home");
    } else {
      alert("Invalid email or password");
    }
  };
  return (
    <div
     className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>OTT Platform Login</h2>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
          {error && <p className="error-text">{error}</p>}
        </div>
        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
}

export default Login;
