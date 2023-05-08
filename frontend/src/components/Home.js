import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (

    <div className="container1">
      <h1>Bienvenido a mis Juegos Online </h1>
      <nav>
        <ul>
          <li>
            <Link to="/game1">Piedra Papel Tijera</Link>
          </li>
          <li>
            <Link to="/game2">Tamagotchi</Link>
          </li>
          <li>
            <Link to="/records">Records</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
