import { useSelector } from 'react-redux';
import { selectShow } from '../../../redux/showSlice';
import { selectConnectedTeams, selectUser } from '../../../redux/userSlice';
import { sendMessage } from '../../../redux/websocketSlice';
import { ShowGame } from '../../../types';
import styles from './Show.scss';
import { useAppDispatch } from '../../hooks/appStore';
import { setTeamToAnswerId } from '../../../redux/gameSlice';
import Button from '../Button/Button';

function Show() {
  const show = useSelector(selectShow);
  const user = useSelector(selectUser);
  const connectedTeams = useSelector(selectConnectedTeams);
  const dispatch = useAppDispatch();

  function handlePlayClick(gameId: string) {
    if (user) {
      dispatch(setTeamToAnswerId(null));
      sendMessage('loadGame', gameId, user.id);
    }
  }

  return (
    <div className={styles.container}>
      <div>Connected teams: {connectedTeams?.length || 0}</div>
      <table className={styles.tableOfGames}>
        <thead>
          <tr>
            <th>Game</th>
            <th>Score</th>
            <th>Winner</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {show?.games.map((game: ShowGame) => {
            return (
              <tr key={game.gameId}>
                <td>{game.name}</td>
                <td>{game.score}</td>
                <td>{game.winnerTeamName}</td>
                <td>
                  {!game.finished && (
                    <Button onClick={() => handlePlayClick(game.gameId)} sx={{ width: '100px' }}>
                      Play
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Show;
