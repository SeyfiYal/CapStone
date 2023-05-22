import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styling/Login.css'; // Import your CSS file for styling

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic or API call here

    // Navigate to another page (e.g., dashboard) after successful login
    navigate('/dashboard');
  };

  return (
    <>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="imgcontainer">
          <img src="img_avatar2.png" alt="Avatar" className="avatar" />
        </div>

        <div className="container">
          <label htmlFor="username"><b>Username</b></label>
          <input
            value={username}
            type="text"
            placeholder="Enter Username"
            id="username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password"><b>Password</b></label>
          <input
            value={password}
            type="password"
            placeholder="Enter Password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
          <label>
            <input type="checkbox" checked="checked" name="remember" /> Remember me
          </label>
        </div>

        <div className="container" style={{ backgroundColor: "#f1f1f1" }}>
          {/* <button type="button" className="cancelbtn">Cancel</button> */}
          <span className="psw">Forgot <a href="#">password?</a></span>
        </div>
      </form>
    </>
  );
}

export default Login;
