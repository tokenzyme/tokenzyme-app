import { useSuspenseQuery } from '@apollo/client';
import { useAppKit } from '@reown/appkit/react';
import { useEffect } from 'react';

import { getEthPriceQueryDef } from './AppGql';

import { Account, useAccount } from '@hooks/useAccount';
import { useSetEthPrice } from '@hooks/useEthPrice';

interface UseDependenciesHook {
  account: Account | null;
  handlers: {
    handleAccountClick: () => void;
  };
}

export const useDependencies = (): UseDependenciesHook => {
  const { open } = useAppKit();
  const account = useAccount();

  const setEthPrice = useSetEthPrice();

  const { data } = useSuspenseQuery(getEthPriceQueryDef);

  const handleAccountClick = (): void => {
    void open();
  };

  useEffect(() => {
    setEthPrice(data.ethPrice);
  }, [data.ethPrice, setEthPrice]);

  return {
    account,
    handlers: {
      handleAccountClick,
    },
  };
};
