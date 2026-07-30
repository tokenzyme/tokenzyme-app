import { useState } from 'react';

import { TokenSortType } from '@graphql/types';

interface UseDependenciesHook {
  sortType: TokenSortType;
  handlers: {
    handleSortTypeClick: (sortType: TokenSortType) => void;
  };
}

export const useDependencies = (): UseDependenciesHook => {
  const [sortType, setSortType] = useState(TokenSortType.NEW);

  const handleSortTypeClick = (type: TokenSortType): void => {
    setSortType(type);
  };

  return {
    sortType,
    handlers: {
      handleSortTypeClick,
    },
  };
};
