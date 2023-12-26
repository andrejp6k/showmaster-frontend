import { useEffect, useState } from 'react';
import { services } from '../../services';
import { useSelector } from 'react-redux';
import { selectUser, setUser } from '../../redux/userSlice';
import { Show } from '../../types';
import { useAppDispatch } from '../hooks/appStore';
import { setShow } from '../../redux/showSlice';
import { useNavigate } from 'react-router-dom';

function SelectGame() {
  const currentUser = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await services.games.list();
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching studios:', error);
      }
    };

    fetchGames();
  }, []);

  const handleGameClick = async (gameId: string) => {
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: '100px',
          fontSize: '35px',
        }}
      >
        Play game
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div>
          {games.map((game) => (
            <button
              type="button"
              key={game.id}
              onClick={() => handleGameClick(game.id)}
              style={{
                margin: '5px',
                padding: '10px',
                display: 'block',
                backgroundColor: 'rgb(239, 158, 86)',
                minWidth: '250px',
                marginBottom: '20px',
              }}
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
