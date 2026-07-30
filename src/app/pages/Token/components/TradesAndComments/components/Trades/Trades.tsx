import { IconLink } from '@tabler/icons-react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { classNames } from 'primereact/utils';
import { JSX } from 'react';

import { TokenGql } from '../../../../TokenGql';

import { TradeGql } from './TradesGql';
import { useDependencies } from './TradesHooks';

import { AccountBadge } from '@components/AccountBadge';
import { Table } from '@design/components/Table';
import { TradeType } from '@graphql/types';
import { formatTransaction } from '@utils/blockchain';
import { formatDateTimeString } from '@utils/dates';
import { BLOCK_EXPLORER_URL } from '@utils/env';
import { formatNumber } from '@utils/numbers';

interface TradesProps {
  token: TokenGql;
}

export function Trades({ token }: TradesProps): JSX.Element {
  const {
    trades,
    hasMore,
    isLoadingMore,
    handlers: { handleLoadMoreClick },
  } = useDependencies(token.address);

  const accountBody = (trade: TradeGql): JSX.Element => (
    <AccountBadge address={trade.accountAddress} isCreator={trade.accountAddress === token.creatorAddress} />
  );

  const typeBody = (trade: TradeGql): JSX.Element => (
    <div
      className={classNames({
        'text-green-500': trade.type === TradeType.BUY,
        'text-red-500': trade.type === TradeType.SELL,
      })}
    >
      {trade.type.toLowerCase()}
    </div>
  );

  const tokenAmountBody = (trade: TradeGql): string => formatNumber(trade.tokenAmount, true);

  const ethAmountBody = (trade: TradeGql): string => formatNumber(trade.ethAmount);

  const dateBody = (trade: TradeGql): string => formatDateTimeString(trade.createdAt, 'MMM dd HH:mm:ss');

  const transactionBody = (trade: TradeGql): JSX.Element => (
    <a
      href={`${BLOCK_EXPLORER_URL}/tx/${trade.id}`}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1"
    >
      <span>{formatTransaction(trade.id)}</span>
      <IconLink size={16} />
    </a>
  );

  return (
    <div className="flex flex-col gap-4">
      {!trades.length ? (
        <div className="text-center text-secondary">No trades here yet</div>
      ) : (
        <>
          <Table id="trades" value={trades} emptyMessage="No trades here yet" stripedRows>
            <Column header="Account" body={accountBody} />
            <Column header="Type" body={typeBody} />
            <Column header={token.symbol} body={tokenAmountBody} className="text-right" alignHeader="right" />
            <Column header="S" body={ethAmountBody} className="text-right" alignHeader="right" />
            <Column header="Date" body={dateBody} align="right" alignHeader="right" />
            <Column header="Transaction" body={transactionBody} align="right" alignHeader="right" />
          </Table>
          {hasMore && (
            <div className="text-center">
              <Button
                type="button"
                label="Load more"
                size="small"
                outlined
                loading={isLoadingMore}
                onClick={handleLoadMoreClick}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
