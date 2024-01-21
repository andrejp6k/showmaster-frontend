import { useSelector } from 'react-redux';
import styles from './FinishGame.scss';
import { selectConnectedTeams } from '../../../redux/userSlice';
import { useAppSelector } from '../../hooks/appStore';
import { selectShowGame } from '../../../redux/showSlice';
import { selectGame } from '../../../redux/gameSlice';
import { useNavigate } from 'react-router-dom';

function FinishGame() {
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
      <div className={styles.scoreBoard}>
        {connectedTeams?.map((team) => (
          <div key={team.id.toString()} className={styles.team}>
            <h2>{team.name}</h2>
            <div className={styles.score}>{showGame?.teamScores?.find((x) => x.userId === team.id)?.value || 0}</div>
            {team.id === winnerTeam?.userId && <span>winner</span>}
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
          Finish game
        </button>
      </div>
    </div>
  );
}

export default FinishGame;
