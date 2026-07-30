import { gql } from '@graphql';
import { ListTopHoldersQuery } from '@graphql/types';

export const listTopHoldersQueryDef = gql(`
  query ListTopHolders($tokenAddress: String!) {
    topHolders(tokenAddress: $tokenAddress) {
      accountAddress
      balance
      percentage
    }
  }
`);

export type TopHolderGql = ListTopHoldersQuery['topHolders'][0];
