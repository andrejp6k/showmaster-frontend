import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { setGame } from './gameSlice';
import { useNavigate } from 'react-router-dom';

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
  // const navigate = useNavigate();

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

      hubConnection?.on('StartShow', (data) => {
        // TODO: dispatch action to other stores with games etc, based on that change do other stuff
        console.log(data);
      });

      hubConnection?.on('PlayGameHost', (data) => {
        dispatch(setGame(data));
        // TODO: useNavigate hook can be used only inside functional components, find other way to navigate
        // navigate('/game-host');
      });

      hubConnection?.on('PlayGameTeam', (data) => {
        dispatch(setGame(data));
        // TODO: useNavigate hook can be used only inside functional components, find other way to navigate
        // navigate('/game-team');
      });

      return null;
    })
    .catch((error: any) => {
      console.log(error);
    });
};

export default websocketSlice.reducer;
