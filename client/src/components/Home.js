// src/components/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="top-bar">
        <button className="nav-button" onClick={() => navigate('/login')}>Login</button>
        <button className="nav-button" onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
      <h1 className="home-title">Welcome to Hasthaveedhi</h1>
    </div>
  );
};

export default Home;
