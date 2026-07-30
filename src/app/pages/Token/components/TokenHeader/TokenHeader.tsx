import { IconRocket } from '@tabler/icons-react';
import { Tag } from 'primereact/tag';
import { JSX } from 'react';

import { TokenGql } from '../../TokenGql';

import { useDependencies } from './TokenHeaderHooks';

import { AccountBadge } from '@components/AccountBadge';
import { formatDateTimeStringRelative } from '@utils/dates';

interface TokenHeaderProps {
  token: TokenGql;
}

export function TokenHeader({ token }: TokenHeaderProps): JSX.Element {
  const { marketCap, isPromoted } = useDependencies(token);

  return (
    <section className="flex flex-wrap justify-between items-center gap-2">
      <div className="flex items-center gap-2">
        <h1 className="!text-2xl">{token.name}</h1>
        <h2 className="!text-sm text-secondary">{token.symbol}</h2>
      </div>
      <div className="flex items-center gap-2">
        <span className="flex gap-1 text-green-500">
          <span>market cap:</span>
          <span>${marketCap}</span>
        </span>
        {isPromoted && <Tag icon={<IconRocket size={16} />} severity="success" value="promoted" rounded />}
      </div>
      <div className="flex items-center gap-1">
        <span className="text-secondary">Created</span>
        <span>{formatDateTimeStringRelative(token.createdAt)}</span>
        <span className="text-secondary">by</span> <AccountBadge address={token.creatorAddress} />
      </div>
    </section>
  );
}
