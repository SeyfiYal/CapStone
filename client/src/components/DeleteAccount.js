import React from 'react';
import { useNavigate } from 'react-router-dom';

function DeleteAccount({ user, deleteUser }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteUser(); // call deleteUser function passed as a prop
    navigate('/'); // redirect to home after deleting
  };

  return (
    <div>
      <h1>Delete Account</h1>
      <p>Hi, {user.name},</p>
      <p>We’re sorry to hear you’d like to delete your account.</p>
      <p>If you’re concerned about privacy of your information, we’ve clarified some of the issues that people have asked us about on our Privacy page.</p>
      <p>If you have other concerns or questions, please reach out to us at my@MrRobot.com</p>
      <button onClick={handleDelete}>Delete Account</button>
    </div>
  );
}

export default DeleteAccount;
