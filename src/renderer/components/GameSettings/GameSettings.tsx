import { Slider } from '@mui/material';
import styles from './GameSettings.scss';
import React, { useState } from 'react';

function GameSettings() {
  const defaultWinningScore = 30;
  const [winningScore, setWinningScore] = useState(defaultWinningScore);

  function handleWinningScoreChange(event: any) {
    setWinningScore(event.target.value);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Game settings</h1>
      <div className={styles.content}>
        <span className={styles.setting}>
          <span className={styles.label}>Winning score</span>
          <span className={styles.values}>
            <span>{winningScore}</span>
            <Slider
              onChange={handleWinningScoreChange}
              aria-label="Winning score"
              defaultValue={defaultWinningScore}
              valueLabelDisplay="off"
              step={10}
              marks
              min={10}
              max={110}
            />
          </span>
        </span>
      </div>
      <div className={styles.footer}>
        <button className={styles.submit}>Save</button>
      </div>
    </div>
  );
}

export default GameSettings;
