import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // reuse same styling

function Register() {
  // 1. ADDED: Name state to match the MySQL database requirements
  const [name, setName] = useState(""); 
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

    // 2. UPDATED: Ensure name is also filled out
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (!email.includes("@")) {
      setError("Enter a valid email");
      return;
    }

    // 3. REPLACED LOCALSTORAGE WITH FETCH: Now we talk to XAMPP!
    fetch("http://localhost/streaming_api/register.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("Registration successful! You can now log in.");
        navigate("/"); // Send them back to the login page
      } else {
        // If the PHP script says the email exists, show that error
        setError(data.message || "Registration failed");
      }
    })
    .catch(() => {
      setError("Server error - Make sure XAMPP Apache/MySQL are running.");
    });
  };

  return (
    <div className="login-container" style={registerStyle}>
      <form className="login-form" onSubmit={handleRegister}>
        <h2>Register</h2>

        {/* 4. ADDED: Name Input Field in the UI */}
        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

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