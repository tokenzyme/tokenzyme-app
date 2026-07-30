import { useIndexerSocketEvent } from './useSocketEvent';

import { TradeType } from '@graphql/types';

export interface Trade {
  id: string;
  tokenAddress: string;
  accountAddress: string;
  type: TradeType;
  tokenAmount: number;
  ethAmount: number;
  fee: number;
  avgPrice: number;
  createdAt: string;
}

export const useTradesEvent = (tokenAddress: string, handler: (data: Trade) => void): void => {
  useIndexerSocketEvent(`tokens:${tokenAddress}:trades`, handler);
};
