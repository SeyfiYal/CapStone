import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import "../styling/CreateAccount.css";
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
    <div className="create-account-form">
      <div className="text">CREATE ACCOUNT</div>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <div className="fas">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <div className="fas">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <div className="fas">
            <FontAwesomeIcon icon={faLock} />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <div className="fas">
            <FontAwesomeIcon icon={faLock} />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button>SIGN UP</button>
      </form>
    </div>
  );
}

export default CreateAccount;
