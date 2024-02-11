import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { createSlice } from '@reduxjs/toolkit';
import { RouteDefinitions } from '../renderer/App';
import { navigateTo } from '../services/navigation-service';
import {
  addAnsweredTeamId,
  changeCurrentQuestion,
  pickQuestion,
  setGame,
  setShowSolution,
  setTeamAnswerResults,
  setTeamScoredId,
  setWinnerTeam
} from './gameSlice';
import { setConnectedTeams, setCurrentGameId, setCurrentShowId } from './userSlice';
import AnswersTracker from '../services/answers-tracker';
import { setTeamScores } from './showSlice';

let hubConnection: HubConnection | null;

// eslint-disable-next-line import/prefer-default-export
export const websocketSlice = createSlice({
  name: 'websocket',
  initialState: {
    connection: null as HubConnection | null,
  },
  reducers: {},
});

export const {} = websocketSlice.actions;

export const sendMessage = (methodName: string, ...args: any[]) => {
  hubConnection?.invoke(methodName, ...args).catch((error) => {
    console.error(error);
  });
};

export const connectToHub = (hubUrl: string) => (dispatch: any) => {
  const hubConnectionSetup = new HubConnectionBuilder();

  hubConnectionSetup.withUrl(hubUrl);
  hubConnectionSetup.withAutomaticReconnect();

  hubConnection = hubConnectionSetup.build();

  hubConnection
    .start()
    .then(() => {
      hubConnection?.on('PlayGameHost', (data) => {
        console.log('Received game with all questions', data);
        dispatch(setCurrentShowId(data.showId));
        dispatch(setCurrentGameId(data.id));
        dispatch(setGame(data));
        AnswersTracker.getInstance().init(data.questions);
        navigateTo(RouteDefinitions.GameHost.enterParams(data.questions[0].id));
      });

      hubConnection?.on('PlayGameTeam', (data) => {
        dispatch(setCurrentShowId(data.showId));
        dispatch(setCurrentGameId(data.id));
        dispatch(setGame(data));
        dispatch(changeCurrentQuestion(null));
        dispatch(setWinnerTeam(null));
        navigateTo(RouteDefinitions.GameTeam);
      });

      hubConnection?.on('ActiveQuestionForTeam', (data) => {
        dispatch(changeCurrentQuestion(data));
      });

      hubConnection?.on('ConnectedTeamsUpdated', (data) => {
        dispatch(setConnectedTeams(data));
      });

      hubConnection?.on('BuzzerClickedByTeam', (data) => {
        dispatch(pickQuestion(data));
      });

      hubConnection?.on('TeamScored', (data) => {
        dispatch(setTeamScoredId(data));
      });

      hubConnection?.on('QuitGameForTeams', (data) => {
        navigateTo(RouteDefinitions.WelcomeTeam);
      });

      hubConnection?.on('FinishGameForTeam', (data) => {
        dispatch(setWinnerTeam(data));
        navigateTo(RouteDefinitions.Congratulations);
      });

      hubConnection?.on('InformHostAboutTeamAnswered', (data) => {
        dispatch(addAnsweredTeamId(data));
      });

      hubConnection?.on('InformHostAboutTeamAnswerResults', (data) => {
        dispatch(setTeamScores({ gameId: data.gameId, teamScores: data.teamScores }));
        dispatch(setTeamAnswerResults(data.teamAnswerResults));
      });

      hubConnection?.on('InformTeamAboutTeamAnswerResults', (data) => {
        dispatch(setTeamAnswerResults(data));
      });

      hubConnection?.on('ShowSolutionForTeams', () => {
        dispatch(setShowSolution());
      });

      return null;
    })
    .catch((error: any) => {
      console.log(error);
    });
};

export default websocketSlice.reducer;
