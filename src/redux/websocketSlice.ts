import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  setCurrentActiveQuestionId,
  setGame,
  setIsAnswering,
} from './gameSlice';
import { navigateTo } from '../services/navigation-service';
import { setConnectedTeams } from './userSlice';

let hubConnection: HubConnection | null;

// eslint-disable-next-line import/prefer-default-export
export const websocketSlice = createSlice({
  name: 'websocket',
  initialState: {
    connection: null as HubConnection | null,
  },
  reducers: {
    receiveMessage: (state, action: PayloadAction<string>) => {
      console.log(action);
    },
  },
});

export const { receiveMessage } = websocketSlice.actions;

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
      hubConnection?.on('ReceiveMessage', (data) => {
        dispatch(receiveMessage(data));
      });

      hubConnection?.on('PlayGameHost', (data) => {
        console.log('Received game with all questions', data);
        dispatch(setGame(data));
        navigateTo('/game-host/' + 0);
      });

      hubConnection?.on('PlayGameTeam', (data) => {
        dispatch(setGame(data));
        dispatch(setCurrentActiveQuestionId(null));
        dispatch(setIsAnswering(false));
        navigateTo('/game-team');
      });

      hubConnection?.on('ActiveQuestionForTeam', (data) => {
        dispatch(setCurrentActiveQuestionId(data));
      });

      hubConnection?.on('ConnectedTeamsUpdated', (data) => {
        dispatch(setConnectedTeams(data));
      });

      return null;
    })
    .catch((error: any) => {
      console.log(error);
    });
};

export default websocketSlice.reducer;
