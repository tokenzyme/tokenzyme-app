import { useLazyQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSuspenseQuery as useTanStackSuspenseQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { Stepper } from 'primereact/stepper';
import { RefObject, useEffect, useRef, useState } from 'react';
import { UseFormReturn, useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { FormValues, FormValuesOut, getValidationSchema, initialValues } from './LaunchTokenForms';
import { getTokenLogoUploadUrlQueryDef, isTokenRegisteredQueryDef } from './LaunchTokenGql';

import { Token } from '@components/TokenCard';
import { Account, useAccount } from '@hooks/useAccount';
import { useAlert } from '@hooks/useAlert';
import { useEstimateAmountOut } from '@hooks/useEstimateAmountOut';
import { useEthBalance } from '@hooks/useEthBalance';
import { useFileUpload } from '@hooks/useFileUpload';
import { Launchpad__factory } from '@typechain';
import { TokenLaunchedEvent } from '@typechain/contracts/Launchpad';
import { waitFor } from '@utils/async';
import { getLaunchpadContract } from '@utils/contracts';
import { parseContractError } from '@utils/errors';
import { TRYING_TO_BUY_MORE_THAN_AVAILABLE_WARNING, getWarningMessage } from '@utils/messages';
import { convertEtherToNumber } from '@utils/numbers';

interface UseDependenciesHook {
  stepperRef: RefObject<Stepper | null>;
  form: UseFormReturn<FormValues, unknown, FormValuesOut>;
  account: Account | null;
  symbol: string;
  ethBalance: number;
  amountOut: number | null;
  warningMessage: string | null;
  getFormValuesAsToken: () => Token;
  handlers: {
    handleBackClick: () => void;
    handleContinueClick: () => Promise<void>;
    handleSubmit: (values: FormValuesOut) => void;
  };
}

export const useDependencies = (): UseDependenciesHook => {
  const navigate = useNavigate();
  const { showSuccess, showWarning, showError, showUnknownError } = useAlert();
  const account = useAccount();
  const { uploadFile } = useFileUpload();

  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const stepperRef = useRef<Stepper>(null);

  const { data: bondingCurveSupply } = useTanStackSuspenseQuery({
    queryKey: ['bondingCurveSupply'],
    queryFn: async () => {
      const launchpadContract = getLaunchpadContract();
      const supply = await launchpadContract.bondingCurveSupply();
      return convertEtherToNumber(supply);
    },
  });

  const [isTokenRegisteredQuery] = useLazyQuery(isTokenRegisteredQueryDef, { fetchPolicy: 'no-cache' });

  const [getTokenLogoUploadUrlQuery] = useLazyQuery(getTokenLogoUploadUrlQueryDef, { fetchPolicy: 'no-cache' });

  const { ethBalance } = useEthBalance(account);

  const form = useForm({
    values: initialValues,
    resolver: zodResolver<FormValues, unknown, FormValuesOut>(getValidationSchema(ethBalance)),
    mode: 'all',
  });

  const buyAmount = useWatch({ control: form.control, name: 'buyAmount' }) ?? 0;
  const symbol = useWatch({ control: form.control, name: 'symbol' });

  const { amountOut } = useEstimateAmountOut(account, null, true, buyAmount);

  const getFormValuesAsToken = (): Token => {
    const { xUrl, telegramUrl, discordUrl, redditUrl, facebookUrl, instagramUrl, ...rest } = form.getValues();
    return {
      ...rest,
      logoUrl: rest.logoBlob ? URL.createObjectURL(rest.logoBlob) : '',
      socialMedia: {
        xUrl,
        telegramUrl,
        discordUrl,
        redditUrl,
        facebookUrl,
        instagramUrl,
      },
    };
  };

  const handleBackClick = (): void => {
    stepperRef.current?.prevCallback();
  };

  const handleContinueClick = async (): Promise<void> => {
    await form.trigger();
    stepperRef.current?.nextCallback();
  };

  const handleSubmit = async (values: FormValuesOut): Promise<void> => {
    const signer = await account?.provider.getSigner();
    if (!signer) {
      return;
    }

    const logoUploadUrlResult = await getTokenLogoUploadUrlQuery();
    if (!logoUploadUrlResult.data) {
      showUnknownError();
      return;
    }

    await uploadFile(values.logoBlob, logoUploadUrlResult.data.tokenLogoUploadUrl.uploadUrl);

    try {
      const parsedBuyAmount = values.buyAmount ? ethers.parseEther(values.buyAmount.toString()) : 0n;
      const launchpadContract = getLaunchpadContract(signer);
      const tx = await launchpadContract.launchToken(
        values.name,
        values.symbol.toUpperCase(),
        {
          description: values.description,
          logoUrl: logoUploadUrlResult.data.tokenLogoUploadUrl.cdnUrl,
          websiteUrl: values.websiteUrl || '',
          socialMedia: {
            xUrl: values.xUrl || '',
            telegramUrl: values.telegramUrl || '',
            discordUrl: values.discordUrl || '',
            redditUrl: values.redditUrl || '',
            facebookUrl: values.facebookUrl || '',
            instagramUrl: values.instagramUrl || '',
          },
        },
        {
          value: parsedBuyAmount,
        },
      );
      const receipt = await tx.wait();
      if (!receipt) {
        showUnknownError();
        await navigate('/');
        return;
      }

      const launchpadInterface = Launchpad__factory.createInterface();
      const tokenLaunchedEvent = launchpadInterface.getEvent('TokenLaunched');
      const tokenLaunchedLog = receipt.logs.find((curr) => curr.topics[0] === tokenLaunchedEvent.topicHash);
      if (!tokenLaunchedLog) {
        showUnknownError();
        await navigate('/');
        return;
      }

      const outputObject = launchpadInterface
        .decodeEventLog(tokenLaunchedEvent, tokenLaunchedLog.data, tokenLaunchedLog.topics)
        .toObject() as TokenLaunchedEvent.OutputObject;

      const isTokenRegistered = await waitFor(20, 1000, async () => {
        try {
          const result = await isTokenRegisteredQuery({ variables: { address: outputObject.token } });
          return result.data?.isTokenRegistered;
        } catch (err) {
          return undefined;
        }
      });
      if (!isTokenRegistered) {
        showWarning(
          'We are experiencing a delay',
          'Your token was successfully launched, but it has not been registered in the system yet. Do not worry, you will see it soon.',
        );
        await navigate('/');
        return;
      }

      showSuccess('Token launched!');
      await navigate(`/tokens/${outputObject.token}`);
    } catch (err) {
      // Ignores rejected tx
      if (err instanceof Error && 'code' in err && err.code === 'ACTION_REJECTED') {
        return;
      }
      showError(parseContractError(err));
    }
  };

  useEffect(() => {
    form.setValue('receiveAmount', amountOut, { shouldValidate: true });
  }, [form, amountOut]);

  useEffect(() => {
    if ((amountOut ?? 0) > bondingCurveSupply) {
      setWarningMessage(getWarningMessage(TRYING_TO_BUY_MORE_THAN_AVAILABLE_WARNING));
    } else {
      setWarningMessage(null);
    }
  }, [amountOut, bondingCurveSupply]);

  return {
    stepperRef,
    form,
    account,
    symbol,
    ethBalance,
    amountOut,
    warningMessage,
    getFormValuesAsToken,
    handlers: {
      handleBackClick,
      handleContinueClick,
      handleSubmit,
    },
  };
};
