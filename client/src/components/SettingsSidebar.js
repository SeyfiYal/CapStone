import React, { useState } from 'react';
import '../styling/SettingsSidebar.css';

function SettingsSidebar({ isOpen, onSettingsUpdate }) {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");

  function closeSettings() {
    // Handle closing the settings sidebar
  }

  function handlePasswordChange() {
    // Handle changing the password
  }

  function handleEmailChange() {
    // Handle changing the email
  }

  function handleDeleteAccount() {
    // Handle deleting the account
  }

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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Current password"
      />
      <button onClick={handleEmailChange}>Save Changes</button>

      <button className="delete-btn" onClick={handleDeleteAccount}>Delete Account</button>
    </div>
  );
}

export default SettingsSidebar;












// import React, { useState } from 'react';
// import '../styling/SettingsSidebar.css';

// function SettingsSidebar({ closeSettings }) {
//   const [password, setPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [repeatPassword, setRepeatPassword] = useState('');
//   const [email, setEmail] = useState('');
  
//   const handlePasswordChange = () => {
//     console.log('Update password');
//     // Here add the PATCH request to update the password
//   };

//   const handleEmailChange = () => {
//     console.log('Update email');
//     // Here add the PATCH request to update the email
//   };

//   const handleDeleteAccount = () => {
//     console.log('Delete account');
//     // Here add the DELETE request to delete the account
//   };

//   return (
//     <div id="mySettingsSidenav" className="settings-sidenav open">
//       <a href="javascript:void(0)" className="closebtn" onClick={closeSettings}>&times;</a>
//       <h3>Change Password</h3>
//       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Current password"/>
//       <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New password"/>
//       <input type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} placeholder="Repeat password"/>
//       <button onClick={handlePasswordChange}>Change Password</button>

//       <h3>Change Email</h3>
//       <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="New Email"/>
//       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Current password"/>
//       <button onClick={handleEmailChange}>Save Changes</button>

//       <button onClick={handleDeleteAccount}>Delete Account</button>
//     </div>
//   );
// }

// export default SettingsSidebar;



