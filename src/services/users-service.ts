/* eslint-disable class-methods-use-this */
import client from './client';

export default class UsersService {
  public create(data: any) {
    return client.post('users', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
