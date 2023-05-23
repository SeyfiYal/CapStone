import React, { useState } from "react";
import "../styling/CreateAccount.css"; // Import your CSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      // Handle password mismatch error
      return;
    }

    const userData = {
      name: name,
      email: email,
      password: password,
    };

    fetch("http://localhost:5555/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle successful user creation
        console.log("User created:", data);
        // Redirect to login or other relevant page
      })
      .catch((error) => {
        // Handle error in user creation
        console.error("Error:", error);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="create-account-form">
      <div className="container">
        {/* Form fields */}
        <label htmlFor="name">
          <b>Name</b>
        </label>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email">
          <b>Email</b>
        </label>
        <input
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">
          <b>Password</b>
        </label>
        <div className="password-input-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
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

        <label htmlFor="confirm-password">
          <b>Confirm Password</b>
        </label>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {/* Submit button */}
        <button type="submit">Sign Up</button>
      </div>
    </form>
  );
}

export default CreateAccount;
