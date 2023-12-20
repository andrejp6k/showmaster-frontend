import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectGameMode.scss';

function SelectGameMode() {
  const navigate = useNavigate();

  const handlePlayGame = () => {
    navigate('/select-game');
  };

  return (
    <div className="container">
      <div className="title">Welcome Host</div>
      <div className="content">
        <button
          type="button"
          onClick={handlePlayGame}
          style={{
            backgroundColor: 'rgb(239, 158, 86)',
            width: '250px',
          }}
        >
          Play game
        </button>
      </div>
    </div>
  );
}

export default SelectGameMode;
