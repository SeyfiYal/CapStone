import './App.css';
import React from 'react';
import { Routes, Route, createRoutesFromChildren} from "react-router-dom";
import NavBar from './components/NavBar';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';



function App() {
  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
      </Routes>

    </div>
  );
}

export default App;



