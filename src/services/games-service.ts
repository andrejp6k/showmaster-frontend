/* eslint-disable class-methods-use-this */
import client from './client';

export default class GamesService {
  public list() {
    return client.get('games');
  }
}
