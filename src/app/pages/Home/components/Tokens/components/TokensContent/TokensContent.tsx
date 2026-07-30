import { IconMessageCircle, IconMoodEmpty, IconTransfer } from '@tabler/icons-react';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { ProgressBar } from 'primereact/progressbar';
import { JSX } from 'react';
import { Link } from 'react-router';

import { useDependencies } from './TokensContentHooks';

import { TokenSortType } from '@graphql/types';
import { formatDateTimeStringRelative } from '@utils/dates';

interface TokensProps {
  sortType: TokenSortType;
}

export function TokensContent({ sortType }: TokensProps): JSX.Element {
  const {
    tokens,
    hasMore,
    isLoadingMore,
    getMarketCap,
    getProgressPercentage,
    handlers: { handleLoadMoreClick },
  } = useDependencies(sortType);

  return tokens.length ? (
    <>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {tokens.map((token) => (
          <Link key={token.address} to={`/tokens/${token.address}`}>
            <Card>
              <div className="flex gap-4">
                <Avatar
                  image={token.logoUrl}
                  size="xlarge"
                  className="shrink-0"
                  pt={{ image: { className: 'rounded-md' } }}
                />
                <div className="grow">
                  <h2 className="!text-xl">{token.name}</h2>
                  <div className="flex flex-col gap-1 text-sm text-secondary">
                    <span className="font-bold">{token.symbol}</span>
                    <span>market cap: ${getMarketCap(token)}</span>
                    <ProgressBar value={getProgressPercentage(token)} showValue={false} className="h-1" />
                    <div className="flex flex-wrap justify-between items-center gap-2">
                      <span className="flex gap-2">
                        <span className="flex items-center gap-1">
                          <IconTransfer size={14} />
                          <span>{token.tradesCount}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <IconMessageCircle size={14} />
                          <span>{token.commentsCount}</span>
                        </span>
                      </span>
                      <span className="text-xs">{formatDateTimeStringRelative(token.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
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
  ) : (
    <div className="flex items-center flex-col gap-4 p-12">
      <IconMoodEmpty size={88} className="inline" />
      <span className="text-center text-4xl">No tokens here yet</span>
      <Link to="/launch">
        <Button type="button" label="Launch a Token" />
      </Link>
    </div>
  );
}
