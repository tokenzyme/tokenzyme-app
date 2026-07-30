import { gql } from '@graphql';
import { ListFirstPromotedTokensOfMonthQuery } from '@graphql/types';

export const listFirstPromotedTokensOfMonthQueryDef = gql(`
  query ListFirstPromotedTokensOfMonth {
    firstPromotedTokensOfMonth {
      address
      creatorAddress
      name
      symbol
      logoUrl
    }
  }
`);

export type TokenGql = ListFirstPromotedTokensOfMonthQuery['firstPromotedTokensOfMonth'][0];
