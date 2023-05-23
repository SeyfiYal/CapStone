


import './App.css';
import React, {useState,useEffect} from 'react';
import { Routes, Route, createRoutesFromChildren} from "react-router-dom";
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import Dashboard from './components/Dashboard';



function App() {


  return (
    <div className="App" >
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/dashboard" element={<Dashboard />} /> 

      </Routes>

    </div>
  );
}

export default App;





















// import './App.css';
// import React, {useState,useEffect} from 'react';
// import { Routes, Route, createRoutesFromChildren} from "react-router-dom";
// import HomePage from './components/HomePage';
// import NavBar from './components/NavBar';
// import Login from './components/Login';
// import CreateAccount from './components/CreateAccount';
// import Dashboard from './components/Dashboard';


// function App() {
//   const [currentUser, setCurrentUser] = useState('')
//   const handleLogin = (user) => {
//     setCurrentUser(user)
//   }
//   useEffect(() => {
//     fetch('http://localhost:5555/check_session', { credentials: 'include' })
//       .then((response) => {
//         if (response.ok) {
//           response.json()
//             .then((user) => {
//               setCurrentUser(user)
//             });
//         }
//       });
//   }, []);

//   return (
//     <div className="App" >
//       <NavBar currentUser={currentUser} handleLogin={handleLogin}/>

//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<Login handleLogin={handleLogin} />} />
//         <Route path="/create-account" element={<CreateAccount />} />
//         <Route path="/dashboard" element={<Dashboard />} /> {/* Add this route */}
//       </Routes>

//     </div>
//   );
// }

// export default App;



