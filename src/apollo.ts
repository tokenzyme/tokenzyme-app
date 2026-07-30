import { ApolloCache, ApolloClient, InMemoryCache, createHttpLink, from, gql } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import { getErrorQueryDef } from '@common/graphql/getErrorQueryDef';
import { CORE_URL } from '@utils/env';
import { UNKNOWN_ERROR } from '@utils/messages';

const httpLink = createHttpLink({ uri: `${CORE_URL}/graphql`, credentials: 'include' });
const errorLink = onError(({ graphQLErrors, operation }) => {
  const { cache } = operation.getContext();
  if (cache instanceof ApolloCache) {
    cache.writeQuery({
      query: gql(getErrorQueryDef),
      data: {
        error: {
          __typename: 'Error',
          message: graphQLErrors?.at(0)?.message ?? UNKNOWN_ERROR,
          random: Math.random(),
        },
      },
    });
  }
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, httpLink]),
});
