import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styling/Login.css"; // Import your CSS file for styling

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    fetch("http://localhost:5555/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username, // Assuming username field contains the email
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          // Show an error message
          console.log(data.error);
        } else {
          // Navigate to dashboard after successful login
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
            placeholder="Email or Phone"
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
          <a href="#">Signup now</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
