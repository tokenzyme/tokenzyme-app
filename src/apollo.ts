import { ApolloCache, ApolloClient, InMemoryCache, createHttpLink, from, gql } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import { getErrorQueryDef } from '@common/graphql/getErrorQueryDef';
import { CORE_URL } from '@utils/env';
import { UNKNOWN_ERROR } from '@utils/messages';

const httpLink = createHttpLink({ uri: `${CORE_URL}/graphql`, credentials: 'include' });
// Apollo Client 3.14 marks `graphQLErrors` deprecated to advertise the 4.0 change, where
// it is folded into a single `error` property. That property does not exist in 3.x, so
// there is nothing to migrate to yet — Apollo's own advice on the deprecation is "no
// action needed". Revisit when the 4.0 major is taken on deliberately.
// eslint-disable-next-line deprecation/deprecation
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
