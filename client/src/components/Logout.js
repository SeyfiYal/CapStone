import React from "react";
import { useNavigate } from "react-router-dom";
import '../styling/Logout.css';

function Logout({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();

    fetch("http://localhost:5555/logout", {
      method: "POST",
      credentials: "include", // Include credentials for session management
    })
    .then((response) => {
      if (response.ok) {
        setIsLoggedIn(false);
        localStorage.removeItem('userId');
        console.log("Logged out successfully"); 
        navigate("/");
      } else {
        throw new Error("Error logging out");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  return (
    <button className="logout-btn" onClick={handleLogout}>Log out</button>
  );
}

export default Logout;
