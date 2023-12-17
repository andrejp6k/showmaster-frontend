import React from 'react';
import { useNavigate } from 'react-router-dom';

function SelectGameMode() {
  const navigate = useNavigate();

  const handlePlayGame = () => {
    navigate('/select-game');
  };

  return (
    <div>
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
  );
}

export default SelectGameMode;
