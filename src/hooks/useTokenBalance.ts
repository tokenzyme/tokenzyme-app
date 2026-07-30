import { QueryObserverResult, RefetchOptions, useQuery } from '@tanstack/react-query';

import { Account } from './useAccount';

import { getErc20Contract } from '@utils/contracts';
import { convertEtherToNumber } from '@utils/numbers';

interface UseTokenBalanceResult {
  tokenBalance: number;
  refetchTokenBalance: (options?: RefetchOptions) => Promise<QueryObserverResult<number>>;
}

export const useTokenBalance = (account: Account | null, tokenAddress: string): UseTokenBalanceResult => {
  const { data: tokenBalance, refetch: refetchTokenBalance } = useQuery({
    queryKey: ['fetchTokenBalance', account],
    queryFn: async () => {
      if (!account) {
        return 0;
      }
      const tokenContract = getErc20Contract(tokenAddress, await account.provider.getSigner());
      const balance = await tokenContract.balanceOf(account.address);
      return convertEtherToNumber(balance);
    },
    initialData: 0,
    refetchInterval: 10000,
    gcTime: 0,
  });
  return { tokenBalance, refetchTokenBalance };
};
