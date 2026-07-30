import { useCallback, useEffect, useState } from 'react';

import { TokenGql } from '../../TokenGql';

import { useEthPrice } from '@hooks/useEthPrice';
import { TokenUpdate, useTokenUpdatesEvent } from '@hooks/useTokenUpdatesEvent';
import { formatNumber, formatPercentage } from '@utils/numbers';
import { fromDateTimeScalar } from '@utils/scalars';

interface ProgressInfo {
  ethReserve: string;
  tokenReserve: string;
  migrationMarketCap: string;
  percentage: string;
  dexPoolAddress?: string | null;
}

interface UseDependenciesHook {
  progressInfo: ProgressInfo;
}

export const useDependencies = (token: TokenGql): UseDependenciesHook => {
  const ethPrice = useEthPrice();

  const getProgressInfo = useCallback(
    (tokenUpdate?: TokenUpdate): ProgressInfo => ({
      tokenReserve: formatNumber(tokenUpdate?.reserve ?? token.reserve),
      ethReserve: formatNumber(tokenUpdate?.ethReserve ?? token.ethReserve),
      migrationMarketCap: formatNumber(Math.round(token.totalSupply * token.finalPrice * ethPrice)),
      percentage: formatPercentage((1 - (tokenUpdate?.reserve ?? token.reserve) / token.bondingCurveSupply) * 100),
      dexPoolAddress: tokenUpdate?.dexPoolAddress ?? token.dexPoolAddress,
    }),
    [token, ethPrice],
  );

  const [progressInfo, setProgressInfo] = useState(getProgressInfo());
  const tokenUpdate = useTokenUpdatesEvent(token.address, {
    ethReserve: token.ethReserve,
    reserve: token.reserve,
    price: token.price,
    dexPoolAddress: token.dexPoolAddress,
    migratedAt: token.migratedAt ? fromDateTimeScalar(token.migratedAt) : null,
  });

  useEffect(() => {
    setProgressInfo(getProgressInfo(tokenUpdate));
  }, [tokenUpdate, getProgressInfo]);

  return { progressInfo };
};
