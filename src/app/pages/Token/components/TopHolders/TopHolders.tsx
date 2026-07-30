import { Card } from 'primereact/card';
import { JSX } from 'react';

import { TokenGql } from '../../TokenGql';

import { useDependencies } from './TopHoldersHooks';

import { AccountBadge } from '@components/AccountBadge';
import { SuspenseSpinner } from '@design/components/SuspenseSpinner';
import { formatNumber, formatPercentage } from '@utils/numbers';

interface TopHoldersProps {
  token: TokenGql;
}

function TopHoldersContent({ token }: TopHoldersProps): JSX.Element {
  const { topHolders } = useDependencies(token.address);

  if (!topHolders.length) {
    return <div className="text-center text-secondary">No holders here yet</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {topHolders.map((topHolder, index) => (
        <div key={topHolder.accountAddress} className="flex justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-secondary font-bold w-8">#{index + 1}</span>
            <AccountBadge
              address={topHolder.accountAddress}
              isCreator={topHolder.accountAddress === token.creatorAddress}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-secondary">{formatNumber(topHolder.balance, true)}</span>
            <span className="text-right w-14">{formatPercentage(topHolder.percentage)}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function TopHolders({ token }: TopHoldersProps): JSX.Element {
  return (
    <section>
      <Card title={<h2 className="!text-lg">Top Holders</h2>}>
        <SuspenseSpinner size="small">
          <TopHoldersContent token={token} />
        </SuspenseSpinner>
      </Card>
    </section>
  );
}
