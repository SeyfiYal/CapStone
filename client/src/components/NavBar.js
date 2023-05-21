import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import '../styling/NavBar.css';

function NavBar() {
  return (
    <div className="navbar">

      <Link to="/create-account">
        <FontAwesomeIcon icon={faUserPlus} /> Create Account
      </Link>

      <Link to="/login" className="login-btn">
        <FontAwesomeIcon icon={faUser} /> Login
      </Link>

      
    </div>
  );
}

export default NavBar;
