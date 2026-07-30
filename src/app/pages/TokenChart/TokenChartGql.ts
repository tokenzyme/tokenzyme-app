import { gql } from '@graphql';
import { GetTokenChartViewQuery } from '@graphql/types';

export const getTokenChartViewQueryDef = gql(`
  query GetTokenChartView($address: String!) {
    token(address: $address) {
      address
      name
      symbol
    }
  }
`);

export type TokenGql = GetTokenChartViewQuery['token'];
