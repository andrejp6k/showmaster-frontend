import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { createSlice } from '@reduxjs/toolkit';
import { RouteDefinitions } from '../renderer/App';
import { navigateTo } from '../services/navigation-service';
import { changeCurrentQuestion, pickQuestion, setGame } from './gameSlice';
import { setConnectedTeams } from './userSlice';
import QuestionNavigationService from '../services/question-navigation-service';

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
        dispatch(setGame(data));
        QuestionNavigationService.getInstance().init(data.questions);
        navigateTo(RouteDefinitions.GameHost.enterParams(data.questions[0].id));
      });

      hubConnection?.on('PlayGameTeam', (data) => {
        dispatch(setGame(data));
        dispatch(changeCurrentQuestion(null));
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

      hubConnection?.on('QuitGameForTeams', (data) => {
        navigateTo(RouteDefinitions.WelcomeTeam);
      });

      hubConnection?.on('FinishGameForTeam', (data) => {
        navigateTo(RouteDefinitions.Congratulations);
      });

      return null;
    })
    .catch((error: any) => {
      console.log(error);
    });
};

export default websocketSlice.reducer;
