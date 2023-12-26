import React from 'react';
import { useSelector } from 'react-redux';
import { selectShow } from '../../../redux/showSlice';
import { ShowGame } from '../../../types';
import styles from './Show.scss';
import { sendMessage } from '../../../redux/websocketSlice';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../../redux/userSlice';

function Show() {
  const navigate = useNavigate();
  const show = useSelector(selectShow);
  const user = useSelector(selectUser);

  function handlePlayClick(gameId: string) {
    sendMessage('loadGame', gameId, user.id);
    // TODO: remove navigate from here to websocketSlice.ts on hubConnection?.on('PlayGameHost'...) event
    // create navigation slice for that
    setTimeout(() => navigate('/game-host'), 3000);
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
        <tr>
          <td>{game.name}</td>
          <td>{game.gameType}</td>
          <td>{game.score}</td>
          <td>{game.winner}</td>
          <td>
            <button
              type="button"
              key={game.gameId}
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
