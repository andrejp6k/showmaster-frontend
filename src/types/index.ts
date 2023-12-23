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
