import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
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
    <>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="imgcontainer">
          <img src="img_avatar2.png" alt="Avatar" className="avatar" />
        </div>

        <div className="container">
          <label htmlFor="username">
            <b>Username</b>
          </label>
          <input
            value={username}
            type="text"
            placeholder="Enter Username"
            id="username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">
            <b>Password</b>
          </label>
          <div className="password-input-container">
            <input
              value={password}
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className={`password-toggle ${showPassword ? "show" : ""}`}
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="eye-icon"
              />
            </span>
          </div>

          <button type="submit">Login</button>
          {/* <label>
            <input type="checkbox" 
            checked="checked" 
            name="remember" 
            /> 
            Remember me
          </label> */}
        </div>

        <div className="container" style={{ backgroundColor: "#f1f1f1" }}>
          {/* <button type="button" className="cancelbtn">Cancel</button> */}
          <span className="psw">
            Forgot <a href="#">password?</a>
          </span>
        </div>
      </form>
    </>
  );
}

export default Login;
