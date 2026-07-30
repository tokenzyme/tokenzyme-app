import { useAppKit } from '@reown/appkit/react';
import { Button } from 'primereact/button';
import { JSX } from 'react';

interface ConnectWalletButtonProps {
  isSmall?: boolean;
}
export function ConnectWalletButton({ isSmall = false }: ConnectWalletButtonProps): JSX.Element {
  const { open } = useAppKit();

  return (
    <Button
      type="button"
      label="Connect Wallet"
      size={isSmall ? 'small' : undefined}
      onClick={() => {
        void open();
      }}
    />
  );
}
