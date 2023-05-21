import './App.css';
import React from 'react';
import { Routes, Route} from "react-router-dom";
import NavBar from './components/NavBar';
import Login from './components/Login';


function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;



