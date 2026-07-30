import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';

import { Account } from './useAccount';

import { getLaunchpadContract } from '@utils/contracts';
import { parseContractError } from '@utils/errors';
import { convertEtherToNumber } from '@utils/numbers';

interface UseEstimateEthToBuyTokensResult {
  ethToBuyTokens: number | null;
  isEstimatingEthToBuyTokens: boolean;
}

export const useEstimateEthToBuyTokens = (
  account: Account | null,
  tokenAddress: string,
  tokenAmount: number,
): UseEstimateEthToBuyTokensResult => {
  const { data: ethToBuyTokens, isFetching: isEstimatingEthToBuyTokens } = useQuery({
    queryKey: ['useEstimateEthToBuyTokens', account?.address, tokenAddress, tokenAmount],
    queryFn: async () => {
      try {
        if (!account || !tokenAmount) {
          return null;
        }
        const launchpadContract = getLaunchpadContract(await account.provider.getSigner());
        const parsedAmount = ethers.parseEther(tokenAmount.toString());
        const estimation = await launchpadContract.estimateEthToBuyTokens(tokenAddress, parsedAmount);
        return convertEtherToNumber(estimation);
      } catch (err) {
        throw parseContractError(err);
      }
    },
    gcTime: 0,
    initialData: null,
    refetchInterval: 10000,
    retry: false,
  });
  return { ethToBuyTokens, isEstimatingEthToBuyTokens };
};
