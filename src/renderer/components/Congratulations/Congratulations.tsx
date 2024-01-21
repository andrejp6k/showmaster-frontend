import { useSelector } from 'react-redux';
import { selectWinnerTeam } from '../../../redux/gameSlice';
import { selectUser } from '../../../redux/userSlice';
import styles from './Congratulations.scss';
import { EmojiEvents, SentimentDissatisfied } from '@mui/icons-material';
import { red, yellow } from '@mui/material/colors';

function Congratulations() {
  const currentUser = useSelector(selectUser);
  const winnerTeam = useSelector(selectWinnerTeam);

  const isWinner = currentUser?.id === winnerTeam;

  return (
    <div className={styles.container}>
      {isWinner ? (
        <div className={styles.winner}>
          <h3>Congratulations! You won the game.</h3>
          <div className={styles.iconWrapper}>
            <EmojiEvents sx={{ color: yellow[500], fontSize: 100 }} />
          </div>
        </div>
      ) : (
        <div className={styles.loser}>
          <h3>Unfortunatelly, you loose. Good luck next time!</h3>
          <div className={styles.iconWrapper}>
            <SentimentDissatisfied sx={{ color: red[500], fontSize: 100 }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Congratulations;
