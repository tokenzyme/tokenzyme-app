import { ApolloCache } from '@apollo/client';

export const clearRootQueryCache = (
  cache: ApolloCache<unknown>,
  queryName: string,
  args?: Record<string, unknown>,
  collectGarbage = true,
): boolean => {
  const result = cache.evict({ id: 'ROOT_QUERY', fieldName: queryName, args });
  if (collectGarbage) {
    cache.gc();
  }
  return result;
};
