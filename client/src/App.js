import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
// import Main from './Components/Main/Main';
import Main from './Components/Main/Main';
import Auth from './Components/Auth/Auth';

function App() {
  return (
    <div className="App">
    <NavBar/>
    <Main/>
    <Routes>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
