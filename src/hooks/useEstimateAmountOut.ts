import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';

import { Account } from './useAccount';

import { getLaunchpadContract } from '@utils/contracts';
import { parseContractError } from '@utils/errors';
import { convertEtherToNumber } from '@utils/numbers';

interface UseEstimateAmountOutResult {
  amountOut: number | null;
  isEstimatingAmountOut: boolean;
  estimateAmountOutError: Error | null;
}

export const useEstimateAmountOut = (
  account: Account | null,
  tokenAddress: string | null,
  isBuy: boolean,
  amountIn: number,
): UseEstimateAmountOutResult => {
  const {
    data: amountOut,
    isFetching: isEstimatingAmountOut,
    error: estimateAmountOutError,
  } = useQuery({
    queryKey: ['useEstimateAmountOut', account?.address, tokenAddress, isBuy, amountIn],
    queryFn: async () => {
      try {
        if (!account || !amountIn) {
          return null;
        }
        const launchpadContract = getLaunchpadContract(await account.provider.getSigner());
        const parsedAmount = ethers.parseEther(amountIn.toString());
        let estimation;
        if (tokenAddress) {
          estimation = isBuy
            ? await launchpadContract.estimateTokensToBuy(tokenAddress, parsedAmount)
            : await launchpadContract.estimateEthForSellingTokens(tokenAddress, parsedAmount);
        } else if (isBuy) {
          estimation = await launchpadContract.estimateFirstTokensToBuy(parsedAmount);
        } else {
          throw new Error('invalid_arguments');
        }
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
  return { amountOut, isEstimatingAmountOut, estimateAmountOutError };
};
