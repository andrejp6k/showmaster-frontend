import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SelectGameMode.scss';

function SelectGameMode() {
  const navigate = useNavigate();

  const handlePlayGame = () => {
    navigate('/select-game');
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Welcome Host</div>
      <div className={styles.content}>
        <button
          type="button"
          onClick={() => {
            /* TODO */
          }}
          className={styles.button}
        >
          Create show
        </button>
        <button
          type="button"
          onClick={() => {
            /* TODO */
          }}
          className={styles.button}
        >
          Load show
        </button>
        <button
          type="button"
          onClick={handlePlayGame}
          className={styles.button}
        >
          Play game
        </button>
      </div>
    </div>
  );
}

export default SelectGameMode;
