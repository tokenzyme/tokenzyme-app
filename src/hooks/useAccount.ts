import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import { BrowserProvider, Eip1193Provider } from 'ethers';
import { useMemo } from 'react';

export interface Account {
  address: string;
  provider: BrowserProvider;
}

export const useAccount = (): Account | null => {
  const { address } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider<Eip1193Provider | undefined>('eip155');
  const provider = useMemo(() => (walletProvider ? new BrowserProvider(walletProvider) : null), [walletProvider]);

  if (address && provider) {
    return {
      address,
      provider,
    };
  }
  return null;
};
