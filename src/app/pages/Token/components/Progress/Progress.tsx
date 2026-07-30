import { IconExternalLink } from '@tabler/icons-react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { ProgressBar } from 'primereact/progressbar';
import { JSX } from 'react';

import { TokenGql } from '../../TokenGql';

import { useDependencies } from './ProgressHooks';

import { formatDateString } from '@utils/dates';

interface ProgressProps {
  token: TokenGql;
}

export function Progress({ token }: ProgressProps): JSX.Element | null {
  const { progressInfo } = useDependencies(token);

  return (
    <section>
      <Card
        title={
          <h2 className="!text-lg flex justify-between items-center">
            <span>Promotion Progress</span>
            <span>{progressInfo.percentage}%</span>
          </h2>
        }
      >
        <div className="flex flex-col gap-2">
          <ProgressBar value={progressInfo.percentage} showValue={false} className="h-5" />
          {!progressInfo.dexPoolAddress ? (
            <>
              <div className="text-secondary text-sm">
                This token will be promoted to <b>Shadow Exchange</b> once all available tokens have been sold. At that
                point, the market cap will reach <b>${progressInfo.migrationMarketCap}</b>.
              </div>
              <div>
                <div className="text-sm">Tokens available for sale: {progressInfo.tokenReserve}</div>
                <div className="text-sm">Amount of S collected: {progressInfo.ethReserve}</div>
              </div>
            </>
          ) : (
            <>
              <div>
                This token was promoted to <b>Shadow Exchange</b> on{' '}
                {formatDateString(token.migratedAt ?? new Date().toISOString(), 'MMM dd')}.
              </div>
              <a
                href={`https://www.shadow.so/trade?inputCurrency=0x0000000000000000000000000000000000000000&outputCurrency=${token.address}`}
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  type="button"
                  icon={<IconExternalLink />}
                  label="Trade on Shadow"
                  size="small"
                  className="w-full"
                />
              </a>
              <a href={`https://dexscreener.com/sonic/${progressInfo.dexPoolAddress}`} target="_blank" rel="noreferrer">
                <Button
                  type="button"
                  icon={<IconExternalLink />}
                  label="View on Dexscreener"
                  severity="contrast"
                  size="small"
                  className="w-full"
                />
              </a>
            </>
          )}
        </div>
      </Card>
    </section>
  );
}
