import { useNavigate } from 'react-router-dom';
import styles from './WelcomeHost.scss';
import { RouteDefinitions } from '../../App';
import Button from '../Button/Button';
import { Slider } from '@mui/material';
import MultiSLiderView from '../MultiSliderView/MultiSliderView';

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
        <MultiSLiderView
          min={1800}
          max={2000}
          teamValues={[
            { teamId: '659ad675b270832e08e36deb', value: 1820 },
            { teamId: '659ad6a7b270832e08e36dec', value: 1950 },
          ]}
          correctValue={1900}
        />
      </div>
    </div>
  );
}

export default WelcomeHost;
