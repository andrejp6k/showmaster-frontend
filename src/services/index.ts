import GamesService from './games-service';
import ShowsService from './shows-service';
import StudiosService from './studios-service';
import UsersService from './users-service';

export const services = {
  studios: new StudiosService(),
  users: new UsersService(),
  games: new GamesService(),
  shows: new ShowsService(),
};
