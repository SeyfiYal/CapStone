import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styling/Login.css";

function Login({ setIsLoggedIn, setUserId }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    fetch("http://localhost:5555/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Incorrect email or password");
        }
      })
      .then((data) => {
        console.log("Logged in:", data);
        setIsLoggedIn(true);
        setUserId(data.user_id); // Store the user_id in state
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  return (
    <div className="login-form">
      <div className="text">LOGIN</div>
      <form onSubmit={handleLogin}>
        <div className="field">
          <div className="fas fa-envelope"></div>
          <input
            value={username}
            type="text"
            placeholder="Email"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div className="field">
          <div className="fas fa-lock"></div>
          <input
            value={password}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button>LOGIN</button>
        
        <div className="link">
          Not a member?
          <Link to="/create-account"> Signup now</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;


