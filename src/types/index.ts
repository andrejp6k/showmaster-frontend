import { HubConnection, ILogger, LogLevel } from '@microsoft/signalr';

export interface SignaRHubOptions {
  onConnected?: (hub: HubConnection) => void;
  onDisconnected?: (error?: Error) => void;
  onReconnecting?: (error?: Error) => void;
  onReconnected?: (connectionId?: string) => void;
  onError?: (error?: Error) => void;
  enabled?: boolean;
  logging?: LogLevel | string | ILogger;
}

export enum Role {
  Host,
  Team,
}
export interface User {
  id: string;
  name: string;
  role: Role;
  studioId: string;
  deviceId: string;
}
export interface Studio {
  id: string;
  name: string;
  location: string;
}

export interface CreateShowRequest {
  title: string;
  gameIds: string[];
  userId: string;
}

export interface GameHeader {
  id: string;
  name: string;
}

export interface Show {
  id: string;
  title: string;
  teamScores: Score[];
  games: ShowGame[];
}

export interface ShowGame {
  gameId: string;
  name: string;
  gameType: string;
  score: string;
  winner: string;
  finished: boolean;
  teamScores: Score[];
}

export interface Score {
  userId: string;
  value: number;
}

export interface Game {
  id: string;
  name: string;
  questions: Question[];
}

export interface Question {
  id: string;
  type: QuestionType;
  questionText: string;
  answer: string;
  hint?: string | null;
  finished: boolean;
}

export enum QuestionType {
  Text,
  Picture,
  Year,
}
