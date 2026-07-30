import { gql } from '@graphql';
import { ListTradesQuery } from '@graphql/types';

export const listTradesQueryDef = gql(`
  query ListTrades($tokenAddress: String!, $pageSize: Int!, $lastTradeId: String) {
    trades(tokenAddress: $tokenAddress, pageSize: $pageSize, lastTradeId: $lastTradeId) {
      id
      accountAddress
      type
      tokenAmount
      ethAmount
      createdAt
    }
  }
`);

export type TradeGql = ListTradesQuery['trades'][0];
