import { useSelector } from 'react-redux';
import styles from './GameFinished.scss';
import { selectConnectedTeams } from '../../../redux/userSlice';
import { useAppSelector } from '../../hooks/appStore';
import { selectShowGame } from '../../../redux/showSlice';
import { selectGame } from '../../../redux/gameSlice';
import { useNavigate } from 'react-router-dom';
import { EmojiEvents } from '@mui/icons-material';
import { yellow } from '@mui/material/colors';

function GameFinished() {
  const navigate = useNavigate();
  const connectedTeams = useSelector(selectConnectedTeams);
  const game = useSelector(selectGame);
  const showGame = useAppSelector((state) => selectShowGame(state, game?.id));
  const winnerScore = showGame?.teamScores.reduce((max, current) => {
    return Math.max(max, current.value);
  }, -Infinity);

  const winnerTeam = showGame?.teamScores.find((x) => x.value === winnerScore);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Game finished!</h3>
      </div>
      <div className={styles.scoreBoard}>
        {connectedTeams?.map((team) => (
          <div key={team.id.toString()} className={styles.team}>
            <h2>{team.name}</h2>
            <div className={styles.score}>{showGame?.teamScores?.find((x) => x.userId === team.id)?.value || 0}</div>
            {team.id === winnerTeam?.userId && (
              <>
                <EmojiEvents sx={{ color: yellow[500], fontSize: 40 }} />
                <span>Winner</span>
              </>
            )}
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <button
          className={styles.finishBtn}
          onClick={() => {
            navigate(-1);
          }}
        >
          Back to show overview
        </button>
      </div>
    </div>
  );
}

export default GameFinished;