import { useState } from 'react';

import { useIndexerSocketEvent } from './useSocketEvent';

export interface TokenUpdate {
  ethReserve: number;
  reserve: number;
  price: number;
  dexPoolAddress?: string | null;
  migratedAt?: Date | null;
}

export const useTokenUpdatesEvent = (tokenAddress: string, initialData: TokenUpdate): TokenUpdate => {
  const [tokenUpdate, setTokenUpdate] = useState<TokenUpdate>(initialData);
  useIndexerSocketEvent(`tokens:${tokenAddress}:updates`, (data: TokenUpdate) => {
    setTokenUpdate(data);
  });
  return tokenUpdate;
};
