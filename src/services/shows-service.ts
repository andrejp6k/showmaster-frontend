/* eslint-disable class-methods-use-this */
import { CreateShowRequest, UpsertScorePointRequest } from '../types';
import client from './client';

export default class ShowsService {
  public create(data: CreateShowRequest) {
    return client.post('shows', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public upsertScorePoint(data: UpsertScorePointRequest) {
    return client.post('shows/scorePoint', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
