import { useEffect } from 'react';
import { Socket, io } from 'socket.io-client';

import { CORE_URL, INDEXER_URL } from '@utils/env';

const coreSocket = io(CORE_URL, { transports: ['websocket'] });
const indexerSocket = io(INDEXER_URL, { transports: ['websocket'] });

const useSocketEvent = <T>(socket: Socket, event: string, handler: (data: T) => void): void => {
  useEffect(() => {
    socket.on(event, handler);

    return (): void => {
      socket.off(event, handler);
    };
  }, [socket, event, handler]);
};

export const useCoreSocketEvent = <T>(event: string, handler: (data: T) => void): void => {
  useSocketEvent(coreSocket, event, handler);
};

export const useIndexerSocketEvent = <T>(event: string, handler: (data: T) => void): void => {
  useSocketEvent(indexerSocket, event, handler);
};
