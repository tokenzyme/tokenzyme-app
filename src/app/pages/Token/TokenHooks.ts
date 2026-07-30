import { useSuspenseQuery } from '@apollo/client';
import { useParams } from 'react-router';

import { TokenGql, getTokenQueryDef } from './TokenGql';

interface UseDependenciesHook {
  token: TokenGql;
}

export const useDependencies = (): UseDependenciesHook => {
  const { address } = useParams();

  const { data } = useSuspenseQuery(getTokenQueryDef, { variables: { address: address ?? '' } });

  return {
    token: data.token,
  };
};
