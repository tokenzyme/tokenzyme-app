import { useSuspenseQuery } from '@apollo/client';
import { useParams } from 'react-router';

import { TokenGql, getTokenChartViewQueryDef } from './TokenChartGql';

interface UseDependenciesHook {
  token: TokenGql;
}

export const useDependencies = (): UseDependenciesHook => {
  const { address } = useParams();

  const { data } = useSuspenseQuery(getTokenChartViewQueryDef, { variables: { address: address ?? '' } });

  return {
    token: data.token,
  };
};
