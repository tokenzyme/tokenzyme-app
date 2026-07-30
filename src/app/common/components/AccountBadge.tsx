import { Badge } from 'primereact/badge';
import { JSX } from 'react';

import { formatAccountAddress } from '@utils/blockchain';
import { BLOCK_EXPLORER_URL } from '@utils/env';

interface AccountBadgeProps {
  address: string;
  isCreator?: boolean;
}

export function AccountBadge({ address, isCreator = false }: AccountBadgeProps): JSX.Element {
  const getBackgroundColor = (): string => `#${formatAccountAddress(address).padEnd(6, '0')}`;

  const getTextColor = (): 'black' | 'white' => {
    const bgColor = getBackgroundColor();
    const hex = bgColor.replace('#', '');
    // Parse R, G, B components
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    // Calculate YIQ (perceived brightness)
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    // If brightness is high, use black text; otherwise white
    return yiq >= 128 ? 'black' : 'white';
  };

  return (
    <a href={`${BLOCK_EXPLORER_URL}/address/${address}`} target="_blank" rel="noreferrer" className="inline-flex gap-1">
      <Badge
        value={
          <span className="flex gap-1">
            <span>{formatAccountAddress(address)}</span>
          </span>
        }
        style={{
          backgroundColor: getBackgroundColor(),
          color: getTextColor(),
        }}
      />
      {isCreator && <Badge value="dev" severity="secondary" />}
    </a>
  );
}
