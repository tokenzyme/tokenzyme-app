import { useSuspenseQuery } from '@apollo/client';

import { TopHolderGql, listTopHoldersQueryDef } from './TopHoldersGql';

import { useTradesEvent } from '@hooks/useTradesEvent';

interface UseDependenciesHook {
  topHolders: TopHolderGql[];
}

export const useDependencies = (tokenAddress: string): UseDependenciesHook => {
  const { data, refetch } = useSuspenseQuery(listTopHoldersQueryDef, { variables: { tokenAddress } });

  useTradesEvent(tokenAddress, () => {
    void refetch();
  });

  return {
    topHolders: data.topHolders,
  };
};
