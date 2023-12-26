import React from 'react';
import { useSelector } from 'react-redux';
import { selectShow } from '../../../redux/showSlice';
import { ShowGame } from '../../../types';
import styles from './Show.scss';
import { sendMessage } from '../../../redux/websocketSlice';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../../redux/userSlice';
import { setNavigate } from '../../../services/navigation-service';

function Show() {
  const navigate = useNavigate();
  const show = useSelector(selectShow);
  const user = useSelector(selectUser);

  function handlePlayClick(gameId: string) {
    setNavigate(navigate);
    sendMessage('loadGame', gameId, user.id);
  }

  return (
    <table className={styles.tableOfGames}>
      <thead>
      <tr>
        <th>Game</th>
        <th>Type</th>
        <th>Score</th>
        <th>Winner</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      {show.games.map((game: ShowGame) => (
        <tr key={game.gameId}>
          <td>{game.name}</td>
          <td>{game.gameType}</td>
          <td>{game.score}</td>
          <td>{game.winner}</td>
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
  );
};

export default Show;
