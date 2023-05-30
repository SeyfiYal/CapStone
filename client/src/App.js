import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';
import UserContext from './components/UserContext'; // Import the UserContext

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      setIsLoggedIn(true);
    }
  }, []);
  

  // Add other necessary state variables

  return (
    <UserContext.Provider value={{ userId, setUserId }}> {/* Wrap your components with UserContext.Provider */}
      <div className="App">
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Remove the userId prop from Dashboard */}
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;


  // useEffect(() => {
  //   fetch("http://localhost:5555/check_session", {
  //       method: "GET",
  //       credentials: "include", // Include credentials for session management
  //   })
  //   .then(response => {
  //       if (response.ok) {
  //           setIsLoggedIn(true);
  //           return response.json();
  //       } else {
  //           throw new Error("Not logged in");
  //       }
  //   })
  //   .then(data => {
  //       console.log("Already logged in:", data);
  //       // Redirect to dashboard or similar page
  //       navigate("/dashboard");
  //   })
  //   .catch(error => {
  //       console.error("Error:", error);
  //   });
  // }, []);

