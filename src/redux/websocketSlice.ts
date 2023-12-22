import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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
  hubConnection?.send(methodName, ...args);
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

      hubConnection?.on('StartShow', (data) => {
        // TODO: dispatch action to other stores with games etc, based on that change do other stuff
        console.log(data);
      });

      return null;
    })
    .catch((error: any) => {
      console.log(error);
    });
};

export default websocketSlice.reducer;
