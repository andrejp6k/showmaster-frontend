import GamesService from './games-service';
import StudiosService from './studios-service';
import UsersService from './users-service';

export interface Services {
  studios: StudiosService;
  users: UsersService;
  games: GamesService;
}

export const services: Services = {
  studios: new StudiosService(),
  users: new UsersService(),
  games: new GamesService(),
};
