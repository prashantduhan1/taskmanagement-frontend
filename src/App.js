import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Import BrowserRouter here

import Login from './Login';
import Home from './Home';
import Register from './Register';

function App() {

  return (
    <div>
      <BrowserRouter> 
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
