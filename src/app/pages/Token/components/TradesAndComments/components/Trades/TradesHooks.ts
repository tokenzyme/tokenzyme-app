import { useApolloClient, useSuspenseQuery } from '@apollo/client';
import { useEffect, useState, useTransition } from 'react';

import { TradeGql, listTradesQueryDef } from './TradesGql';

import { useTradesEvent } from '@hooks/useTradesEvent';

const PAGE_SIZE = 15;

interface UseDependenciesHook {
  trades: TradeGql[];
  hasMore: boolean;
  isLoadingMore: boolean;
  handlers: {
    handleLoadMoreClick: () => void;
  };
}

export const useDependencies = (tokenAddress: string): UseDependenciesHook => {
  const apolloClient = useApolloClient();

  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, startLoadMoreTransition] = useTransition();

  const { data, fetchMore } = useSuspenseQuery(listTradesQueryDef, {
    fetchPolicy: 'cache-and-network',
    variables: { tokenAddress, pageSize: PAGE_SIZE },
  });

  useTradesEvent(tokenAddress, (trade) => {
    apolloClient.cache.updateQuery(
      {
        query: listTradesQueryDef,
        variables: { tokenAddress, pageSize: PAGE_SIZE },
      },
      (cacheData) => ({
        ...cacheData,
        trades: [trade, ...(cacheData?.trades ?? [])],
      }),
    );
  });

  const handleLoadMoreClick = (): void => {
    startLoadMoreTransition(async () => {
      const listMoreTradesQuery = await fetchMore({
        variables: {
          tokenAddress,
          pageSize: PAGE_SIZE,
          lastTradeId: data.trades.at(-1)?.id ?? null,
        },
        updateQuery: (previousQueryResult, { fetchMoreResult }) => ({
          ...previousQueryResult,
          trades: [...previousQueryResult.trades, ...fetchMoreResult.trades],
        }),
      });
      setHasMore(listMoreTradesQuery.data.trades.length === PAGE_SIZE);
    });
  };

  useEffect(() => {
    setHasMore(data.trades.length % PAGE_SIZE === 0);
  }, [data.trades]);

  return {
    trades: data.trades,
    hasMore,
    isLoadingMore,
    handlers: {
      handleLoadMoreClick,
    },
  };
};
