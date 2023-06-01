import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';
import "../styling/DeleteAccount.css"

function DeleteAccount() {
  const navigate = useNavigate();
  const { userName, setUserName, setIsLoggedIn } = useContext(UserContext);
  const API_URL = "http://localhost:5555";

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      fetch(`${API_URL}/user/delete`, {
        method: 'DELETE',
        credentials: 'include',
      })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          alert(data.message);
          setUserName(null);
          setIsLoggedIn(false);
          navigate('/'); 
        } else if (data.error) {
          alert(data.error);
        }
      });
    }
  };

  return (
    <div className="delete-account-container">
        <h1>Delete Account</h1>
        <p>Hi, {userName ? userName : "User"},</p>
        <p>We’re sorry to hear you’d like to delete your account.</p>
        <p>If you’re concerned about privacy of your information, we’ve clarified some of the issues that people have asked us about on our Privacy page.</p>
        <p>If you have other concerns or questions, please reach out to us at my@MrRobot.com</p>
        <button onClick={handleDelete}>Delete Account</button>
    </div>
);
}

export default DeleteAccount;

