import { HubConnection, ILogger, LogLevel } from '@microsoft/signalr';
import { AlertColor } from '@mui/material';

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
  studioId: string;
}

export interface AddScorePointRequest {
  questionId: string;
  teamUserId: string;
  scoredByAnsweringCorrectly: boolean;
}

export interface SaveTeamAnswerRequest {
  questionId: string;
  teamId: string;
  value: string;
}

export interface UpdateShowGameRequest {
  scoreToWin?: number;
  finished?: boolean;
  skippedQuestionIds?: string[];
}

export interface GameHeader {
  id: string;
  name: string;
}

export interface Show {
  id: string;
  studioId: string;
  title: string;
  teamScores: Score[];
  games: ShowGame[];
}

export interface ShowGame {
  gameId: string;
  name: string;
  score: string;
  winnerTeamName: string;
  finished: boolean;
  scoreToWin: number;
  timeToAnswer: number;
  teamScores: Score[];
}

export interface Score {
  userId: string;
  value: number;
}

export interface Game {
  id: string;
  showId: string;
  name: string;
  questions: Question[];
}

export interface Question {
  id: string;
  type: QuestionType;
  questionTitle: string;
  questionText: string;
  correctAnswer: string;
  answerOptions: string[] | [];
  info?: string | null;
  imageUrl?: string | null;
  finished: boolean;
}

export interface TeamAnswerResult {
  teamId: string;
  value: string;
  correct: boolean;
  teamName: string;
}

export interface CalculateAndShowAnswersRequest {
  showId: string;
  gameId: string;
  questionId: string;
  hostId: string;
  questionType: QuestionType;
}

export interface QuestionStatisticDto {
  questionId: string;
  questionType: QuestionType;
  questionText: string;

  answeredTimes: number;
  skipped: number;

  // Buzzer
  scoredByAnsweringCorrectly: number;
  scoredByWrongOpponentAnswer: number;

  // TwoOptions, GuessYear
  bothTeamsAnsweredCorrectly: number;
  oneTeamAnsweredCorrectly: number;
  noOneAnsweredCorrectly: number;
}

export enum QuestionType {
  TextBuzzer,
  PictureBuzzer,
  GuessYear,
  TwoAnswers,
}

export enum ActionButtonType {
  ShowQuestion,
  ShowAnswers,
  ShowSolution,
}

export interface SnackbarMessage {
  type: AlertColor;
  message: string;
}
