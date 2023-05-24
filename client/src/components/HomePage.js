
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import '../styling/HomePage.css'; // Import your CSS file for styling

function HomePage() {
  return (
    <div className="front-page">
    <h1>A Caring AI Companion</h1>
    <p>Here to listen and engage in conversation.</p>
    <p>Always by your side, ready to assist.</p>

      <div className="create-account-btn"> 
        <Link to="/create-account">
          <FontAwesomeIcon icon={faUserPlus} /> Create Account
        </Link>
      </div>
      
    </div>
  );
}

export default HomePage;

