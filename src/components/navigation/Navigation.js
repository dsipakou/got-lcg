import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.scss';

const Navigation = () => {
  return (
    <div className="main-navigation">
      <Link to="/">Home</Link>
      <Link to="/lobby">Lobby</Link>
    </div>
  )
}

export default Navigation;
