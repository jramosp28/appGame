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
      setHunger(hunger + 1);
      setHappiness(happiness - 1);
      setHealth(health - 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [hunger, happiness, health]);

  const feed = () => {
    setHunger(Math.max(0, hunger - 20));
    setHappiness(Math.min(100, happiness + 5));
    setHealth(Math.min(100, health + 5));
  };

  const play = () => {
    setHunger(Math.min(100, hunger + 5));
    setHappiness(Math.min(100, happiness + 20));
    setHealth(Math.max(0, health - 5));
  };

  const sleep = () => {
    setHunger(Math.max(0, hunger - 5));
    setHappiness(Math.max(0, happiness - 5));
    setHealth(Math.min(100, health + 10));
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
