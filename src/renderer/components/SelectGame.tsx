import { useEffect, useState } from 'react';
import { services } from '../../services';

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

  const handleGameClick = (gameId: string) => {
    console.log(gameId);
    // Send API request with game id and device id to start the show session.
    // Logic for getting deviceId is implemented in AssignStudioToUser. We should put device id to global store.
    // and get it here from store
    // await axios.post('show', {
    //   gameId: gameId,
    //   deviceId: deviceId,
    // });
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
