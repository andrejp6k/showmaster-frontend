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
          onClick={() => {
            /* TODO */
          }}
          className="button"
        >
          Create show
        </button>
        <button
          type="button"
          onClick={() => {
            /* TODO */
          }}
          className="button"
        >
          Load show
        </button>
        <button type="button" onClick={handlePlayGame} className="button">
          Play game
        </button>
      </div>
    </div>
  );
}

export default SelectGameMode;
