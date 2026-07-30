import { useCoreSocketEvent } from './useSocketEvent';

export interface Comment {
  id: number;
  tokenAddress: string;
  accountAddress: string;
  text: string;
  createdAt: string;
}

export const useCommentsEvent = (tokenAddress: string, handler: (data: Comment) => void): void => {
  useCoreSocketEvent(`tokens:${tokenAddress}:comments`, handler);
};
