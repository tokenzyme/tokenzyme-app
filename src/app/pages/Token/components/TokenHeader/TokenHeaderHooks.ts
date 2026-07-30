import { useCallback, useEffect, useState } from 'react';

import { TokenGql } from '../../TokenGql';

import { useEthPrice } from '@hooks/useEthPrice';
import { TokenUpdate, useTokenUpdatesEvent } from '@hooks/useTokenUpdatesEvent';
import { formatNumber } from '@utils/numbers';
import { fromDateTimeScalar } from '@utils/scalars';

interface UseDependenciesHook {
  marketCap: string;
  isPromoted: boolean;
}

export const useDependencies = (token: TokenGql): UseDependenciesHook => {
  const ethPrice = useEthPrice();

  const getMarketCap = useCallback(
    (tokenUpdate?: TokenUpdate): string =>
      formatNumber(Math.round((tokenUpdate?.price ?? token.price) * token.totalSupply * ethPrice)),
    [token, ethPrice],
  );

  const [marketCap, setMarketCap] = useState(getMarketCap);
  const tokenUpdate = useTokenUpdatesEvent(token.address, {
    ethReserve: token.ethReserve,
    reserve: token.reserve,
    price: token.price,
    dexPoolAddress: token.dexPoolAddress,
    migratedAt: token.migratedAt ? fromDateTimeScalar(token.migratedAt) : null,
  });

  useEffect(() => {
    setMarketCap(getMarketCap(tokenUpdate));
  }, [tokenUpdate, getMarketCap]);

  return {
    marketCap,
    isPromoted: !!tokenUpdate.dexPoolAddress,
  };
};
