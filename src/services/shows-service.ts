/* eslint-disable class-methods-use-this */
import { CreateShowRequest, UpdateShowGameRequest, AddScorePointRequest } from '../types';
import client from './client';

export default class ShowsService {
  public create(data: CreateShowRequest) {
    return client.post('shows', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public addScorePoint(showId: string, gameId: string, data: AddScorePointRequest) {
    return client.post(`shows/${showId}/games/${gameId}/scorePoints`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public updateShowGame(data: UpdateShowGameRequest) {
    return client.put('shows/showGame', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
