import { zodResolver } from '@hookform/resolvers/zod';
import { ethers, parseEther } from 'ethers';
import { useEffect, useState } from 'react';
import { UseFormReturn, useForm, useWatch } from 'react-hook-form';

import { TokenGql } from '../../TokenGql';

import { FormValues, FormValuesOut, getValidationSchema, initialValues } from './TradeForms';
import { SLIPPAGE_DIALOG, SlippageDialogArgs } from './components/SlippageDialog';

import { Account, useAccount } from '@hooks/useAccount';
import { useAlert } from '@hooks/useAlert';
import { useDialogControl } from '@hooks/useDialog';
import { useEstimateAmountOut } from '@hooks/useEstimateAmountOut';
import { useEstimateEthToBuyTokens } from '@hooks/useEstimateEthToBuyTokens';
import { useEthBalance } from '@hooks/useEthBalance';
import { useTokenBalance } from '@hooks/useTokenBalance';
import { useTokenUpdatesEvent } from '@hooks/useTokenUpdatesEvent';
import { getErc20Contract, getLaunchpadContract } from '@utils/contracts';
import { LAUNCHPAD_ADDRESS } from '@utils/env';
import { parseContractError } from '@utils/errors';
import { TRYING_TO_BUY_MORE_THAN_AVAILABLE_WARNING, getWarningMessage } from '@utils/messages';
import { fromDateTimeScalar } from '@utils/scalars';

interface UseDependenciesHook {
  form: UseFormReturn<FormValues, unknown, FormValuesOut>;
  account: Account | null;
  isPromoted: boolean;
  ethBalance: number;
  tokenBalance: number;
  isBuy: boolean;
  isSwitched: boolean;
  amountIn: number | null;
  amountOut: number | null;
  warningMessage: string | null;
  handlers: {
    handleTradeTypeClick: (isBuy: boolean) => void;
    handleSetSlippage: () => void;
    handleSlipppageChanged: (slippage: number) => void;
    handleSwitchBuyClick: () => void;
    handleSubmit: (values: FormValuesOut) => Promise<void>;
  };
}

export const useDependencies = (token: TokenGql): UseDependenciesHook => {
  const { showSuccess, showError } = useAlert();
  const { showDialog } = useDialogControl();
  const account = useAccount();

  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  const tokenUpdate = useTokenUpdatesEvent(token.address, {
    ethReserve: token.ethReserve,
    reserve: token.reserve,
    price: token.price,
    dexPoolAddress: token.dexPoolAddress,
    migratedAt: token.migratedAt ? fromDateTimeScalar(token.migratedAt) : null,
  });

  const { ethBalance, refetchEthBalance } = useEthBalance(account);
  const { tokenBalance, refetchTokenBalance } = useTokenBalance(account, token.address);

  const form = useForm({
    values: initialValues,
    resolver: zodResolver<FormValues, unknown, FormValuesOut>(getValidationSchema(ethBalance, tokenBalance)),
    mode: 'all',
  });

  const isBuy = useWatch({ control: form.control, name: 'isBuy' });
  const isSwitched = useWatch({ control: form.control, name: 'isSwitched' });
  const amountIn = useWatch({ control: form.control, name: 'amountIn' });
  const amountOut = useWatch({ control: form.control, name: 'amountOut' });

  const { amountOut: amountOutEstimation } = useEstimateAmountOut(
    account,
    token.address,
    isBuy,
    !isSwitched ? (amountIn ?? 0) : 0,
  );

  const { ethToBuyTokens: amountInEstimation } = useEstimateEthToBuyTokens(
    account,
    token.address,
    isBuy && isSwitched ? (amountOut ?? 0) : 0,
  );

  const applySlippage = (expectedAmount: number, slippage: number): bigint => {
    const parsedExpectedAmount = parseEther(expectedAmount.toString());
    const numerator = BigInt(10000 - Math.floor(slippage * 100));
    const denominator = 10000n;
    return (parsedExpectedAmount * numerator) / denominator;
  };

  const handleTradeTypeClick = (isBuyValue: boolean): void => {
    form.setValue('isBuy', isBuyValue);
    form.setValue('isSwitched', false);
    form.setValue('amountIn', null);
    form.setValue('amountOut', null);
  };

  const handleSetSlippage = (): void => {
    showDialog<SlippageDialogArgs>(SLIPPAGE_DIALOG, { slippage: form.getValues('slippage') });
  };

  const handleSlipppageChanged = (slippage: number): void => {
    form.setValue('slippage', slippage);
  };

  const handleSwitchBuyClick = (): void => {
    form.setValue('isSwitched', !isSwitched);
    form.setValue('amountIn', null);
    form.setValue('amountOut', null);
  };

  const handleSubmit = async (values: FormValuesOut): Promise<void> => {
    try {
      const signer = await account?.provider.getSigner();
      if (!signer) {
        return;
      }

      const parsedAmountIn = ethers.parseEther(values.amountIn.toString());
      const minExpectedAmountOut = applySlippage(values.amountOut, values.slippage);

      const launchpadContract = getLaunchpadContract(signer);

      let tx: ethers.ContractTransactionResponse;
      if (isBuy) {
        tx = await launchpadContract.buyTokens(token.address, minExpectedAmountOut, {
          value: parsedAmountIn,
        });
      } else {
        const tokenContract = getErc20Contract(token.address, signer);
        const allowance = await tokenContract.allowance(await signer.getAddress(), LAUNCHPAD_ADDRESS);
        if (allowance < parsedAmountIn) {
          const approveTx = await tokenContract.approve(LAUNCHPAD_ADDRESS, parsedAmountIn);
          await approveTx.wait();
        }
        tx = await launchpadContract.sellTokens(token.address, parsedAmountIn, minExpectedAmountOut);
      }
      await tx.wait();

      form.setValue('amountIn', null);
      form.setValue('amountOut', null);

      void refetchEthBalance();
      void refetchTokenBalance();

      showSuccess(isBuy ? 'Tokens bought!' : 'Tokens sold!');
    } catch (err) {
      // Ignores rejected tx
      if (err instanceof Error && 'code' in err && err.code === 'ACTION_REJECTED') {
        return;
      }
      showError(parseContractError(err));
    }
  };

  useEffect(() => {
    if (!isBuy || !isSwitched) {
      form.setValue('amountOut', amountOutEstimation, { shouldValidate: true });
    }
  }, [form, isBuy, isSwitched, amountOutEstimation]);

  useEffect(() => {
    if (isBuy && isSwitched) {
      form.setValue('amountIn', amountInEstimation, { shouldValidate: true });
    }
  }, [form, isBuy, isSwitched, amountInEstimation]);

  useEffect(() => {
    if (isBuy && (amountOut ?? 0) > tokenUpdate.reserve) {
      setWarningMessage(getWarningMessage(TRYING_TO_BUY_MORE_THAN_AVAILABLE_WARNING));
    } else {
      setWarningMessage(null);
    }
  }, [isBuy, amountOut, tokenUpdate.reserve]);

  return {
    form,
    account,
    isPromoted: !!tokenUpdate.dexPoolAddress,
    ethBalance,
    tokenBalance,
    isBuy,
    isSwitched,
    amountOut,
    amountIn,
    warningMessage,
    handlers: {
      handleTradeTypeClick,
      handleSetSlippage,
      handleSlipppageChanged,
      handleSwitchBuyClick,
      handleSubmit,
    },
  };
};
