import { QueryObserverResult, RefetchOptions, useQuery } from '@tanstack/react-query';

import { Account } from './useAccount';

import { convertEtherToNumber } from '@utils/numbers';

interface UseEthBalanceResult {
  ethBalance: number;
  refetchEthBalance: (options?: RefetchOptions) => Promise<QueryObserverResult<number>>;
}

export const useEthBalance = (account: Account | null): UseEthBalanceResult => {
  const { data: ethBalance, refetch: refetchEthBalance } = useQuery({
    queryKey: ['useEthBalance', account?.address],
    queryFn: async () => {
      if (!account) {
        return 0;
      }
      const balance = await account.provider.getBalance(account.address);
      return convertEtherToNumber(balance);
    },
    gcTime: 0,
    initialData: 0,
    refetchInterval: 10000,
    retry: false,
  });
  return { ethBalance, refetchEthBalance };
};
