import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; // reuse same styling

function Register() {
  const [loading , setLoading] = useState(false)
  const [username, setUsername] = useState(""); 
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

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true)

    if (!username || !email || !password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (!email.includes("@")) {
      setError("Enter a valid email");
      setLoading(false);
      return;
    }

    try{
      const response = await axios.post(
        "http://localhost:5000/api/auth/register", 
        {
          username,
          email,
          password,
        }
      );

      if(response.data.success){
        navigate("/");
      }else{
        setError(response.data.message);
      }
    } catch(error){
      setError(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }finally{
      setLoading(false);
    }

  };

  return (
    <div className="login-container" style={registerStyle}>
      <form className="login-form" onSubmit={handleRegister}>
        <h2>Register</h2>

        {/* 4. ADDED: Name Input Field in the UI */}
        <div className="input-group">
          <label>username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
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

        <button 
          typr="submit"
          className="login-btn"
          disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

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