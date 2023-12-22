import { useEffect, useState } from 'react';
import { services } from '../../services';
import { sendMessage } from '../../redux/websocketSlice';

function SelectGame() {
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
    console.log(gameId);

    // TODO: get userId from store
    await services.shows.create({
      title: 'Test Show',
      gameIds: [gameId],
      userId: '658583795260451d1dfb41b0',
    });
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
