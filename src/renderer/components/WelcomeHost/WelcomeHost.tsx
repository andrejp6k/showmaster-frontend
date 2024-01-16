import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './WelcomeHost.scss';
import { RouteDefinitions } from '../../App';

function WelcomeHost() {
  const navigate = useNavigate();

  const handlePlayGame = () => {
    navigate(RouteDefinitions.SelectGame);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Welcome Host</div>
      <div className={styles.content}>
        {/* Remove condition when buttons are needed*/}
        {false && (
          <>
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
          </>
        )}
        <button type="button" onClick={handlePlayGame} className={styles.button}>
          Play game
        </button>
      </div>
    </div>
  );
}

export default WelcomeHost;
