import React from 'react';
import logo from '../assets/logo.png';

function Header() {
    return (
        <div className="center">
            <h1>Game of Drones!</h1>
            <img className="logo" src={logo} alt="rock paper scissors game"/>
        </div>
    );
}

export default Header;