import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // reuse same styling

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

    const registerStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL + '/posters/Login.png'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%'
  };

  const handleRegister = (e) => {
  e.preventDefault();
  setError("");

  if (!email || !password) {
    setError("All fields are required");
    return;
  }

  if (!email.includes("@")) {
    setError("Enter a valid email");
    return;
  }

  // Get existing users
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Check if user already exists
  const userExists = existingUsers.find(user => user.email === email);

  if (userExists) {
    setError("User already exists");
    return;
  }

  // Add new user
  const newUser = { email, password };
  const updatedUsers = [...existingUsers, newUser];

  localStorage.setItem("users", JSON.stringify(updatedUsers));

  alert("Registration successful!");
  navigate("/");
};

  return (
    <div className="login-container" style={registerStyle}>
      <form className="login-form" onSubmit={handleRegister}>
        <h2>Register</h2>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create password"
          />
        </div>

        {error && <p className="error-text">{error}</p>}

        <button className="login-btn">Register</button>

        <p style={{ textAlign: "center" }}>
          Already have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;