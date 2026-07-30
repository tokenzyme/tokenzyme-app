import { IconMessageCircle, IconTransfer } from '@tabler/icons-react';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { ButtonGroup } from 'primereact/buttongroup';
import { Card } from 'primereact/card';
import { JSX } from 'react';

import { TokenGql } from '../../TokenGql';

import { useDependencies } from './TradesAndCommentsHooks';
import { Comments } from './components/Comments';
import { Trades } from './components/Trades';

import { SuspenseSpinner } from '@design/components/SuspenseSpinner';

interface TradesAndCommentsProps {
  token: TokenGql;
}

export function TradesAndComments({ token }: TradesAndCommentsProps): JSX.Element {
  const {
    viewType,
    handlers: { handleViewTypeClick },
  } = useDependencies(token.address);

  return (
    <section>
      <Card>
        <div className="flex flex-col gap-4">
          <ButtonGroup>
            <Button
              type="button"
              icon={<IconTransfer />}
              label="Trades"
              severity="contrast"
              outlined={viewType !== 'trades'}
              size="small"
              onClick={() => {
                handleViewTypeClick('trades');
              }}
            >
              <Badge value={token.tradesCount} severity="secondary" />
            </Button>
            <Button
              type="button"
              icon={<IconMessageCircle />}
              label="Comments"
              severity="contrast"
              outlined={viewType !== 'comments'}
              size="small"
              onClick={() => {
                handleViewTypeClick('comments');
              }}
            >
              <Badge value={token.commentsCount} severity="secondary" />
            </Button>
          </ButtonGroup>
          {viewType === 'trades' && (
            <SuspenseSpinner>
              <Trades token={token} />
            </SuspenseSpinner>
          )}
          {viewType === 'comments' && (
            <SuspenseSpinner>
              <Comments token={token} />
            </SuspenseSpinner>
          )}
        </div>
      </Card>
    </section>
  );
}
