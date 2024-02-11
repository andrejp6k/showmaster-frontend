import { useNavigate } from 'react-router-dom';
import styles from './WelcomeHost.scss';
import { RouteDefinitions } from '../../App';
import Button from '../Button/Button';

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
        <Button onClick={handlePlayGame} sx={{ width: '250px' }}>
          Play game
        </Button>
        <Button onClick={() => navigate('/multi-slider-demo')} sx={{ width: '250px' }}>
          MultiSliderView Demo
        </Button>
      </div>
    </div>
  );
}

export default WelcomeHost;
