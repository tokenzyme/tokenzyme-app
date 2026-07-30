import { gql } from '@graphql';
import { ListTradeCandlesQuery } from '@graphql/types';

export const listTradeCandlesQueryDef = gql(`
  query ListTradeCandles($tokenAddress: String!, $resolution: String!, $pageSize: Int!, $lastCandleTimestamp: Float) {
    tradeCandles(
      tokenAddress: $tokenAddress,
      resolution: $resolution,
      pageSize: $pageSize,
      lastCandleTimestamp: $lastCandleTimestamp
    ) {
      time
      open
      high
      low
      close
      volume
    }
  }
`);

export type TradeCandleGql = ListTradeCandlesQuery['tradeCandles'][0];
