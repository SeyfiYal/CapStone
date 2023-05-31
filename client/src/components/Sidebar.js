import React, { useState } from 'react';
import '../styling/SideBar.css';
import SettingsSidebar from './SettingsSidebar';

function Sidebar() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  function toggleSettings() {
    setIsSettingsOpen(!isSettingsOpen);
  }

  return (
    <div className="sidebar-container">
      <div id="mySidenav" className="sidenav">
        <a href="javascript:void(0)" className="closebtn">&times;</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
        <a href="#" onClick={toggleSettings}>Settings</a>
      </div>
      <SettingsSidebar isOpen={isSettingsOpen} onSettingsUpdate={() => {}} />
    </div>
  );
}

export default Sidebar;



