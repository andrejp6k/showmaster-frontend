import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setShow } from '../../../redux/showSlice';
import { selectUser } from '../../../redux/userSlice';
import { services } from '../../../services';
import { GameHeader, Show } from '../../../types';
import { useAppDispatch } from '../../hooks/appStore';
import styles from './SelectGame.scss';

function SelectGame() {
  const currentUser = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [games, setGames] = useState<GameHeader[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await services.games.list();
        setGames(response.data as GameHeader[]);
      } catch (error) {
        console.error('Error fetching studios:', error);
      }
    };

    fetchGames();
  }, []);

  const handleGameClick = async (gameId: string) => {
    if (!currentUser) {
      throw new Error('User cannot be null!');
    }

    const response = await services.shows.create({
      title: 'Show with single game',
      gameIds: [gameId],
      userId: currentUser.id,
    });

    if (response.data) {
      const show = response.data as Show;
      console.log('Received show', show);
      dispatch(setShow(show));
    }

    navigate('/show');
  };

  return (
    <div>
      <div className={styles.title}>Play game</div>
      <div className={styles.games}>
        <div>
          {games.map((game) => (
            <button
              className={styles.gameButton}
              type="button"
              key={game?.id}
              onClick={() => handleGameClick(game.id)}
            >
              {game.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SelectGame;
