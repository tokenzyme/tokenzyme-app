import { gql } from '@graphql';
import { ListTokensQuery } from '@graphql/types';

export const listTokensQueryDef = gql(`
  query ListTokens($sortType: TokenSortType!, $pageSize: Int, $lastTokenAddress: String) {
    tokens(sortType: $sortType, pageSize: $pageSize, lastTokenAddress: $lastTokenAddress) {
      address
      creatorAddress
      name
      symbol
      logoUrl
      totalSupply
      bondingCurveSupply
      reserve
      price
      createdAt
      tradesCount
      commentsCount
    }
  }
`);

export type TokenGql = ListTokensQuery['tokens'][0];
