import React, { useState, useEffect } from 'react';
import './Game2.css';

function ProgressBar({ value, maxValue }) {
  const percentage = (value / maxValue) * 100;
  let color = 'green';
  if (percentage < 20) {
    color = 'red';
  } else if (percentage < 80) {
    color = 'yellow';
  }
  const styles = {
    backgroundColor: color,
    width: `${percentage}%`,
    height: '40px',
    marginBottom: '10px',
    position: 'relative',
  };
  const labelStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'black',
    fontSize: '20px',
    textShadow: '1px 1px 1px black',
  };
  return (
    <div style={styles}>
      <div style={labelStyles}>{`${percentage.toFixed(1)}%`}</div>
    </div>
  );
}

function Tamagotchi() {
  const [hunger, setHunger] = useState(0);
  const [happiness, setHappiness] = useState(100);
  const [health, setHealth] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setHunger((prevHunger) => prevHunger + 1);
      setHappiness((prevHappiness) => prevHappiness - 1);
      setHealth((prevHealth) => prevHealth - 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const gameData = {
      hunger,
      happiness,
      health,
    };

    fetch("http://localhost:3000/game2/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gameData),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Datos del juego enviados correctamente.');
        } else {
          console.log('Error al enviar los datos del juego.');
        }
      })
      .catch((error) => {
        console.log('Error en la solicitud POST:', error);
      });
  }, [hunger, happiness, health]);

  const feed = () => {
    setHunger((prevHunger) => Math.max(0, prevHunger - 20));
    setHappiness((prevHappiness) => Math.min(100, prevHappiness + 5));
    setHealth((prevHealth) => Math.min(100, prevHealth + 5));
  };

  const play = () => {
    setHunger((prevHunger) => Math.min(100, prevHunger + 5));
    setHappiness((prevHappiness) => Math.min(100, prevHappiness + 20));
    setHealth((prevHealth) => Math.max(0, prevHealth - 5));
  };

  const sleep = () => {
    setHunger((prevHunger) => Math.max(0, prevHunger - 5));
    setHappiness((prevHappiness) => Math.max(0, prevHappiness - 5));
    setHealth((prevHealth) => Math.min(100, prevHealth + 10));
  };

  return (
    <div className="tamagotchi-container">
      <h1>Tamagotchi</h1>
      <div className="tamagotchi-stats">
        <div className="stat hunger">
          <p>Hunger</p>
          <ProgressBar value={hunger} maxValue={100} />
        </div>
        <div className="stat happiness">
          <p>Happiness</p>
          <ProgressBar value={happiness} maxValue={100} />
        </div>
        <div className="stat health">
          <p>Health</p>
          <ProgressBar value={health} maxValue={100} />
        </div>
      </div>
      <div className="tamagotchi-actions">
        <button className="action feed" onClick={feed}>
          Feed
        </button>
        <button className="action play" onClick={play}>
          Play
        </button>
        <button className="action sleep" onClick={sleep}>
          Sleep
        </button>
      </div>
    </div>
  );
}

export default Tamagotchi;
