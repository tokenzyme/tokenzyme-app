import { useApolloClient, useMutation, useSuspenseQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState, useTransition } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';

import { FormValues, initialValues, validationSchema } from './CommentsForms';
import { CommentGql, addCommentMutationDef, listCommentsQueryDef } from './CommentsGql';

import { Account, useAccount } from '@hooks/useAccount';
import { useCommentsEvent } from '@hooks/useCommentsEvent';

const PAGE_SIZE = 15;

interface UseDependenciesHook {
  form: UseFormReturn<FormValues>;
  account: Account | null;
  comments: CommentGql[];
  hasMore: boolean;
  isLoadingMore: boolean;
  handlers: {
    handleLoadMoreClick: () => void;
    handleSubmit: (values: FormValues) => void;
  };
}

export const useDependencies = (tokenAddress: string): UseDependenciesHook => {
  const apolloClient = useApolloClient();
  const account = useAccount();

  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, startLoadMoreTransition] = useTransition();

  const { data, fetchMore } = useSuspenseQuery(listCommentsQueryDef, {
    fetchPolicy: 'cache-and-network',
    variables: { tokenAddress, pageSize: PAGE_SIZE },
  });

  // const [createSignatureMessageMutation] = useMutation(createSignatureMessageMutationDef);

  const [addCommentMutation] = useMutation(addCommentMutationDef);

  useCommentsEvent(tokenAddress, (comment) => {
    apolloClient.cache.updateQuery(
      {
        query: listCommentsQueryDef,
        variables: { tokenAddress, pageSize: PAGE_SIZE },
      },
      (cacheData) => ({
        ...cacheData,
        comments: [comment, ...(cacheData?.comments ?? [])],
      }),
    );
  });

  const form = useForm({
    values: initialValues,
    resolver: zodResolver(validationSchema),
    mode: 'all',
  });

  const handleLoadMoreClick = (): void => {
    startLoadMoreTransition(async () => {
      const listMoreCommentsQuery = await fetchMore({
        variables: {
          tokenAddress,
          pageSize: PAGE_SIZE,
          lastCommentId: data.comments.at(-1)?.id ?? null,
        },
        updateQuery: (previousQueryResult, { fetchMoreResult }) => ({
          ...previousQueryResult,
          comments: [...previousQueryResult.comments, ...fetchMoreResult.comments],
        }),
      });
      setHasMore(listMoreCommentsQuery.data.comments.length === PAGE_SIZE);
    });
  };

  const handleSubmit = async (values: FormValues): Promise<void> => {
    if (!account) {
      return;
    }

    // const result = await createSignatureMessageMutation({
    //   variables: {
    //     input: {
    //       accountAddress: account.address,
    //       type: SignatureMessageType.SIGN_IN,
    //     },
    //   },
    // });

    // const signatureMessage = result.data?.createSignatureMessage;
    // if (!signatureMessage) {
    //   return;
    // }

    // const signer = await account.provider.getSigner();
    // const signature = await signer.signMessage(signatureMessage.message);

    await addCommentMutation({
      variables: {
        input: {
          tokenAddress,
          text: values.text,
        },
      },
    });

    form.setValue('text', '');
  };

  useEffect(() => {
    setHasMore(data.comments.length % PAGE_SIZE === 0);
  }, [data.comments]);

  return {
    form,
    account,
    comments: data.comments,
    hasMore,
    isLoadingMore,
    handlers: {
      handleLoadMoreClick,
      handleSubmit,
    },
  };
};
