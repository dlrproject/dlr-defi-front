import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navbar from './layout/Navbar/Navbar';
import RouterView from './router/RouterView';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <RouterView />
      </div>
    </Router>
  );
}

export default App;
