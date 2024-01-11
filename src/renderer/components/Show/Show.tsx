import { useSelector } from 'react-redux';
import { selectShow } from '../../../redux/showSlice';
import { selectConnectedTeams, selectUser } from '../../../redux/userSlice';
import { sendMessage } from '../../../redux/websocketSlice';
import { ShowGame } from '../../../types';
import styles from './Show.scss';

function Show() {
  const show = useSelector(selectShow);
  const user = useSelector(selectUser);
  const connectedTeams = useSelector(selectConnectedTeams);

  function handlePlayClick(gameId: string) {
    if (user) {
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
          {show?.games.map((game: ShowGame) => (
            <tr key={game.gameId}>
              <td>{game.name}</td>
              <td>{game.score}</td>
              <td>{game.winnerTeamName}</td>
              <td>
                <button
                  type="button"
                  onClick={() => handlePlayClick(game.gameId)}
                >
                  Play
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Show;
