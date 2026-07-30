import { useSuspenseQuery } from '@apollo/client';

import { TokenGql, listFirstPromotedTokensOfMonthQueryDef } from './TradingFeeShareGql';

interface PromotedToken {
  token?: TokenGql;
  position: string;
  tradeFeeShare: number;
}

interface UseDependenciesHook {
  promotedTokens: PromotedToken[];
}

export const useDependencies = (): UseDependenciesHook => {
  const { data } = useSuspenseQuery(listFirstPromotedTokensOfMonthQueryDef);

  const getPosition = (index: number): string => {
    if (index === 0) {
      return '1st';
    }
    if (index === 1) {
      return '2nd';
    }
    if (index === 2) {
      return '3rd';
    }
    return '';
  };

  const getTradeFeeShare = (index: number): number => {
    if (index === 0) {
      return 30;
    }
    if (index === 1) {
      return 20;
    }
    if (index === 2) {
      return 10;
    }
    return 0;
  };

  return {
    promotedTokens: Array.from({ length: 3 }, (_, index) => ({
      token: data.firstPromotedTokensOfMonth[index] ?? undefined,
      position: getPosition(index),
      tradeFeeShare: getTradeFeeShare(index),
    })),
  };
};
