import React, { useState } from 'react';
import '../styling/SideBar.css';
import SettingsSidebar from './SettingsSidebar';
import { Link } from 'react-router-dom'; 

function Sidebar() {
  const [isSidebarOpen, setIsSidebarsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  function toggleSettings() {
    setIsSettingsOpen(!isSettingsOpen);
  }

  return (
    <div className="sidebar-container">
      <div id="mySidenav" className="sidenav">
        <a href="javascript:void(0)" className="closebtn">&times;</a>
        <Link to="/about" className="sidebar-link">About</Link>

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






// import React, { useState } from 'react';
// import '../styling/SideBar.css';
// import SettingsSidebar from './SettingsSidebar';
// import '../styling/tailwind.css';

// function Sidebar({ isDarkMode, toggleDarkMode }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isSettingsOpen, setIsSettingsOpen] = useState(false);


//   function toggleSettings() {
//     setIsSettingsOpen(!isSettingsOpen);
//   }

//   function toggleDarkMode() {
//     setIsDarkMode(!isDarkMode);
//     // Add code to update the `isDarkMode` state in the Dashboard component
//   }
  


//   return (
//     <div className={`sidebar-container ${isDarkMode ? 'dark' : ''}`}>
//       <div
//         id="mySidenav"
//         className={`sidenav ${isDarkMode ? 'bg-gray-900' : ''}`}
//       >
//         <a href="javascript:void(0)" className="closebtn">
//           &times;
//         </a>
//         <a href="#">About</a>
//         <a href="#">Services</a>
//         <a href="#">Clients</a>
//         <a href="#">Contact</a>
//         <a href="#" onClick={toggleSettings}>
//           Settings
//         </a>
//         <button
//           className="dark:bg-gray-900 w-full py-2 px-4 rounded-md mt-4 text-white font-semibold"
//           onClick={toggleDarkMode}
//         >
//           {isDarkMode ? 'Light Mode' : 'Dark Mode'}
//         </button>
//       </div>
//       <SettingsSidebar isOpen={isSettingsOpen} onSettingsUpdate={() => {}} />
//     </div>
//   );
// }

// export default Sidebar;