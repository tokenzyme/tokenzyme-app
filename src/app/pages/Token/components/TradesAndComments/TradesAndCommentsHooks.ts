import { useApolloClient } from '@apollo/client';
import { useState } from 'react';

import { getTokenQueryDef } from '../../TokenGql';

import { useCommentsEvent } from '@hooks/useCommentsEvent';
import { useTradesEvent } from '@hooks/useTradesEvent';

interface UseDependenciesHook {
  viewType: 'comments' | 'trades';
  handlers: {
    handleViewTypeClick: (viewType: UseDependenciesHook['viewType']) => void;
  };
}

export const useDependencies = (tokenAddress: string): UseDependenciesHook => {
  const apolloClient = useApolloClient();

  const [viewType, setViewType] = useState<UseDependenciesHook['viewType']>('trades');

  useCommentsEvent(tokenAddress, () => {
    apolloClient.cache.updateQuery(
      {
        query: getTokenQueryDef,
        variables: { address: tokenAddress },
      },
      (cacheData) => {
        if (!cacheData) {
          return null;
        }
        return {
          ...cacheData,
          token: {
            ...cacheData.token,
            commentsCount: cacheData.token.commentsCount + 1,
          },
        };
      },
    );
  });

  useTradesEvent(tokenAddress, () => {
    apolloClient.cache.updateQuery(
      {
        query: getTokenQueryDef,
        variables: { address: tokenAddress },
      },
      (cacheData) => {
        if (!cacheData) {
          return null;
        }
        return {
          ...cacheData,
          token: {
            ...cacheData.token,
            tradesCount: cacheData.token.tradesCount + 1,
          },
        };
      },
    );
  });

  const handleViewTypeClick = (type: UseDependenciesHook['viewType']): void => {
    setViewType(type);
  };

  return {
    viewType,
    handlers: { handleViewTypeClick },
  };
};
