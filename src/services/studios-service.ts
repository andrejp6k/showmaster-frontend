/* eslint-disable class-methods-use-this */
import client from './client';

export default class StudiosService {
  public list() {
    return client.get('studios');
  }
}
