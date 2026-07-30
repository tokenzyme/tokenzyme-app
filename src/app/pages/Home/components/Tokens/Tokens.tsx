import { IconEye, IconRocket, IconTrendingUp } from '@tabler/icons-react';
import { Button } from 'primereact/button';
import { ButtonGroup } from 'primereact/buttongroup';
import { JSX } from 'react';

import { useDependencies } from './TokensHooks';
import { TokensContent } from './components/TokensContent';

import { SuspenseSpinner } from '@design/components/SuspenseSpinner';
import { TokenSortType } from '@graphql/types';

export function Tokens(): JSX.Element {
  const {
    sortType,
    handlers: { handleSortTypeClick },
  } = useDependencies();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2>Tokens</h2>
        <ButtonGroup>
          <Button
            type="button"
            icon={<IconEye />}
            label="New"
            severity="contrast"
            outlined={sortType !== TokenSortType.NEW}
            size="small"
            onClick={() => {
              handleSortTypeClick(TokenSortType.NEW);
            }}
          />
          <Button
            type="button"
            icon={<IconTrendingUp />}
            label="Progress"
            severity="contrast"
            outlined={sortType !== TokenSortType.PROGRESS}
            size="small"
            onClick={() => {
              handleSortTypeClick(TokenSortType.PROGRESS);
            }}
          />
          <Button
            type="button"
            icon={<IconRocket />}
            label="Promoted"
            severity="contrast"
            outlined={sortType !== TokenSortType.PROMOTED}
            size="small"
            onClick={() => {
              handleSortTypeClick(TokenSortType.PROMOTED);
            }}
          />
        </ButtonGroup>
      </div>
      <SuspenseSpinner>
        <TokensContent sortType={sortType} />
      </SuspenseSpinner>
    </div>
  );
}
