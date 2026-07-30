import { useSuspenseQuery } from '@apollo/client';
import { useInterval } from 'primereact/hooks';
import { startTransition, useEffect, useState, useTransition } from 'react';

import { TokenGql, listTokensQueryDef } from './TokensContentGql';

import { TokenSortType } from '@graphql/types';
import { useEthPrice } from '@hooks/useEthPrice';
import { formatNumber, formatPercentage } from '@utils/numbers';

const PAGE_SIZE = 20;

interface UseDependenciesHook {
  tokens: TokenGql[];
  hasMore: boolean;
  isLoadingMore: boolean;
  getMarketCap: (token: TokenGql) => string;
  getProgressPercentage: (token: TokenGql) => string;
  handlers: {
    handleLoadMoreClick: () => void;
  };
}

export const useDependencies = (sortType: TokenSortType): UseDependenciesHook => {
  const ethPrice = useEthPrice();

  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, startLoadMoreTransition] = useTransition();

  const { data, fetchMore } = useSuspenseQuery(listTokensQueryDef, {
    fetchPolicy: 'cache-and-network',
    variables: { sortType, pageSize: PAGE_SIZE },
  });

  const getMarketCap = (token: TokenGql): string =>
    formatNumber(Math.round(token.totalSupply * token.price * ethPrice));

  const getProgressPercentage = (token: TokenGql): string =>
    formatPercentage((1 - token.reserve / token.bondingCurveSupply) * 100);

  const handleLoadMoreClick = (): void => {
    startLoadMoreTransition(async () => {
      const listMoreTokensQuery = await fetchMore({
        variables: {
          sortType,
          pageSize: PAGE_SIZE,
          lastTokenAddress: data.tokens.at(-1)?.address ?? null,
        },
        updateQuery: (previousQueryResult, { fetchMoreResult }) => ({
          ...previousQueryResult,
          tokens: [...previousQueryResult.tokens, ...fetchMoreResult.tokens],
        }),
      });
      setHasMore(listMoreTokensQuery.data.tokens.length === PAGE_SIZE);
    });
  };

  useEffect(() => {
    setHasMore(data.tokens.length % PAGE_SIZE === 0);
  }, [data.tokens]);

  useInterval(
    () => {
      startTransition(async () => {
        await fetchMore({
          variables: {
            sortType,
            pageSize: Math.max(PAGE_SIZE, Math.ceil(data.tokens.length / PAGE_SIZE) * PAGE_SIZE),
          },
          updateQuery: (_, { fetchMoreResult }) => fetchMoreResult,
        });
      });
    },
    10000,
    true,
  );

  return {
    tokens: data.tokens,
    hasMore,
    isLoadingMore,
    getMarketCap,
    getProgressPercentage,
    handlers: {
      handleLoadMoreClick,
    },
  };
};
