import React, { useContext,useState } from 'react';
import '../styling/SettingsSidebar.css';
import UserContext from './UserContext';
import { useNavigate } from 'react-router-dom';


function SettingsSidebar({ isOpen, onSettingsUpdate,closeSettings }) {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");
  const [currentEmailPassword, setCurrentEmailPassword] = useState("");
  const navigate = useNavigate();


  const { user, setUser } = useContext(UserContext);
  const API_URL = "http://localhost:5555"; 

  function handlePasswordChange() {
    if (newPassword !== repeatPassword) {
      alert('New passwords do not match');
      return;
    }

    fetch(`${API_URL}/user/update`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword: password, newPassword: newPassword })
    })
    .then(res => res.json())
    .then(data => {
      if (data.message) {
        alert(data.message);
        onSettingsUpdate(); // callback to parent component
      } else if (data.error) {
        alert(data.error);
      }
    });
  }


  function handleEmailChange() {
    fetch(`${API_URL}/user/update_email`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, currentPassword: currentEmailPassword })
    })
    .then(res => res.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
            onSettingsUpdate(); // callback to parent component
        } else if (data.error) {
            alert(data.error);
        }
    });
}



function handleDeleteAccount() {
    if (window.confirm('Are you sure you want to delete your account?')) {
      fetch(`${API_URL}/user/delete`, {
        method: 'DELETE',
        credentials: 'include',
      })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          alert(data.message);
          setUser(null); 
        } else if (data.error) {
          alert(data.error);
        }
      });
    }
  }
  
// function handleDeleteAccount() {
//     if (window.confirm('Are you sure you want to delete your account?')) {
//         fetch(`${API_URL}/user/delete`, {
//             method: 'DELETE',
//             credentials: 'include',
//           })
//           .then(res => res.json())
//           .then(data => {
//             if (data.message) {
//               alert(data.message);
//               navigate('/'); // navigate to home or login page after deletion
//             } else if (data.error) {
//               alert(data.error);
//             }
//           });
          
//     }
//   }


  return (
    <div id="mySettingsSidenav" className={`settings-sidenav ${isOpen ? 'open' : ''}`}>
      <a href="javascript:void(0)" className="closebtn" onClick={closeSettings}>&times;</a>
      <h2>Account Settings</h2>
      <h3>Change Password</h3>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Current password"
      />
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="New password"
      />
      <input
        type="password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        placeholder="Repeat password"
      />
      <button onClick={handlePasswordChange}>Change</button>

      <h3>Change Email</h3>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="New Email"
      />
    <input
        type="password"
        value={currentEmailPassword}
        onChange={(e) => setCurrentEmailPassword(e.target.value)}
        placeholder="Current password"
      />
      <button onClick={handleEmailChange}>Save Changes</button>

      <button className="delete-btn" onClick={handleDeleteAccount}>Delete Account</button>
      
    </div>
  );
}

export default SettingsSidebar;

