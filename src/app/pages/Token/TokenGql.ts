import { gql } from '@graphql';
import { GetTokenQuery } from '@graphql/types';

export const getTokenQueryDef = gql(`
  query GetToken($address: String!) {
    token(address: $address) {
      address
      creatorAddress
      name
      symbol
      description
      logoUrl
      websiteUrl
      totalSupply
      bondingCurveSupply
      ethReserve
      reserve
      price
      finalPrice
      dexPoolAddress
      migratedAt
      createdAt
      tradesCount
      commentsCount
      socialMedia {
        xUrl
        telegramUrl
        discordUrl
        redditUrl
        facebookUrl
        instagramUrl
      }
    }
  }
`);

export type TokenGql = GetTokenQuery['token'];
