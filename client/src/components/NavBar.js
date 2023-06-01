import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import '../styling/NavBar.css';
import Logout from './Logout';
import logo from '../styling/chatlogo5.png';
import '../styling/Logo.css';

function NavBar({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();

  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    // document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }

  return (
    <div className="navbar">
      <img className="logo" src={logo} alt="Chat AI Logo" />
      {location.pathname === '/dashboard' && (
        <span className="menu-button" style={{ fontSize: '30px', cursor: 'pointer' }} onClick={openNav}>&#9776; Menu</span>
      )}
      {isLoggedIn ? (
        <>
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
