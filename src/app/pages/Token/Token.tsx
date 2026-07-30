import { Card } from 'primereact/card';
import { JSX } from 'react';

import { useDependencies } from './TokenHooks';
import { Progress } from './components/Progress';
import { TokenHeader } from './components/TokenHeader';
import { TopHolders } from './components/TopHolders';
import { Trade } from './components/Trade';
import { TradesAndComments } from './components/TradesAndComments';

import { Chart } from '@components/Chart';
import { TokenCard } from '@components/TokenCard';

export function Token(): JSX.Element {
  const { token } = useDependencies();

  return (
    <div className="flex flex-col gap-4">
      <TokenHeader token={token} />
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="grow flex flex-col gap-4">
          <section>
            <Card>
              <Chart token={token} />
            </Card>
          </section>
          <TradesAndComments token={token} />
        </div>
        <div className="shrink-0 flex flex-col gap-4 lg:w-96">
          {!token.migratedAt && <Trade token={token} />}
          <TokenCard token={token} />
          <Progress token={token} />
          <TopHolders token={token} />
        </div>
      </div>
      <div className="text-sm text-secondary text-center">
        The charting technology is provided by{' '}
        <a href="https://www.tradingview.com" target="_blank" rel="noreferrer" className="text-blue-500">
          TradingView
        </a>
      </div>
    </div>
  );
}
