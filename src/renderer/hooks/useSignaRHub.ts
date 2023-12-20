import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from '@microsoft/signalr';
import { useEffect, useRef, useState } from 'react';
import { SignaRHubOptions } from '../../types/index';

export default function useSignalRHub(
  hubUrl: string,
  options?: SignaRHubOptions,
) {
  const [signalRHub, setSignalRHub] = useState<HubConnection | null>(null);
  const optionsRef = useRef<SignaRHubOptions>({
    ...options,
  });

  useEffect(() => {
    optionsRef.current = { ...options };
  }, [options]);

  useEffect(() => {
    if (!optionsRef.current.enabled) return;

    let isCanceled = false;

    const hubConnectionSetup = new HubConnectionBuilder();

    hubConnectionSetup.withUrl(hubUrl);
    hubConnectionSetup.withAutomaticReconnect();

    if (optionsRef.current.logging)
      hubConnectionSetup.configureLogging(optionsRef.current.logging);

    const hubConnection = hubConnectionSetup.build();

    hubConnection
      .start()
      .then(() => {
        if (isCanceled) return hubConnection.stop();

        if (optionsRef.current.onConnected)
          optionsRef.current.onConnected(hubConnection);

        if (optionsRef.current.onDisconnected)
          hubConnection.onclose(optionsRef.current.onDisconnected);

        if (optionsRef.current.onReconnecting)
          hubConnection.onreconnecting(optionsRef.current.onReconnecting);

        if (optionsRef.current.onReconnected)
          hubConnection.onreconnected(optionsRef.current.onReconnected);

        setSignalRHub(hubConnection);

        return null;
      })
      .catch((error) => {
        if (isCanceled) return;

        if (optionsRef.current.onError) optionsRef.current.onError(error);
      });

    // eslint-disable-next-line consistent-return
    return () => {
      isCanceled = true;

      if (hubConnection.state === HubConnectionState.Connected)
        hubConnection.stop();

      setSignalRHub(null);
    };
  }, [hubUrl, optionsRef.current.enabled]);

  return signalRHub;
}
