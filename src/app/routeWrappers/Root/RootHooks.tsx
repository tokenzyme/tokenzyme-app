import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';

import { GetErrorQuery, getErrorQueryDef } from '@common/graphql/getErrorQueryDef';
import { useAlert } from '@hooks/useAlert';

export const useDependencies = (): void => {
  const { showError } = useAlert();

  const { data: getErrorQuery } = useQuery<GetErrorQuery>(gql(getErrorQueryDef), {
    fetchPolicy: 'cache-only',
  });

  useEffect(() => {
    if (getErrorQuery) {
      showError(new Error(getErrorQuery.error.message));
    }
  }, [getErrorQuery, showError]);
};
