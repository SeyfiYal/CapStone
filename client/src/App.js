import './App.css';
import React from 'react';
// import HomePage from './HomePage'
import { Routes, Route} from "react-router-dom";
import NavBar from './components/NavBar';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Login />

        <Routes >
          <Route path = '/login' element = {<Login/>}/>
        </Routes >

    </div>
  );
}

export default App;
