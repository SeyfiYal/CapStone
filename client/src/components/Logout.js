import React from "react";
import { useNavigate } from "react-router-dom";

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
    <button onClick={handleLogout}>Logout</button>
  );
}

export default Logout;
