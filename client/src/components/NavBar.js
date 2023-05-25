import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import '../styling/NavBar.css';
import Logout from './Logout';

function NavBar({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();

  return (
    <div className="navbar">
      {isLoggedIn ? (
        <>
          {/* <Link to="/dashboard">
            <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
          </Link> */}
          <Logout setIsLoggedIn={setIsLoggedIn} />
        </>
      ) : (
        <>
          {location.pathname !== '/' && (
            <Link to="/">
              <FontAwesomeIcon icon={faHome} /> Home
            </Link>
          )}
          {location.pathname !== '/login' && (
            <Link to="/login" className="login-btn">
              <FontAwesomeIcon icon={faUser} /> Login
            </Link>
          )}
        </>
      )}
    </div>
  );
}

export default NavBar;
