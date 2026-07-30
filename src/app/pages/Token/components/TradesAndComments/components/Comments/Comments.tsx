import { IconSend2 } from '@tabler/icons-react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { JSX } from 'react';
import { FormProvider } from 'react-hook-form';

import { TokenGql } from '../../../../TokenGql';

import { useDependencies } from './CommentsHooks';

import { AccountBadge } from '@components/AccountBadge';
import { ConnectWalletButton } from '@components/ConnectWalletButton';
import { TextField } from '@design/form/TextField';
import { formatDateTimeStringRelative } from '@utils/dates';

interface CommentsProps {
  token: TokenGql;
}

export function Comments({ token }: CommentsProps): JSX.Element {
  const {
    form,
    account,
    comments,
    hasMore,
    isLoadingMore,
    handlers: { handleLoadMoreClick, handleSubmit },
  } = useDependencies(token.address);

  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="flex items-center gap-2">
            <TextField
              name="text"
              placeholder="Write a comment..."
              showErrorMessage={false}
              containerClassName="grow"
            />
            {account ? (
              <Button icon={<IconSend2 />} size="small" disabled={!form.formState.isValid} />
            ) : (
              <ConnectWalletButton isSmall />
            )}
          </div>
        </form>
      </FormProvider>
      {!comments.length ? (
        <div className="text-center text-secondary">No comments here yet</div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {comments.map((comment) => (
              <Card key={comment.id} className="border !border-slate-600">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between gap-2">
                    <AccountBadge
                      address={comment.accountAddress}
                      isCreator={comment.accountAddress === token.creatorAddress}
                    />
                    <span className="text-xs text-secondary">{formatDateTimeStringRelative(comment.createdAt)}</span>
                  </div>
                  <p className="text-sm">{comment.text}</p>
                </div>
              </Card>
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
      )}
    </>
  );
}
