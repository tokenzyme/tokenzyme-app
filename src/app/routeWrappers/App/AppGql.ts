import { gql } from '@graphql';

export const getEthPriceQueryDef = gql(`
  query GetEthPrice {
    ethPrice
  }
`);
