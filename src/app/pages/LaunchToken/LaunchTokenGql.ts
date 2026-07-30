import { gql } from '@graphql';
import { GetTokenLogoUploadUrlQuery } from '@graphql/types';

export const isTokenRegisteredQueryDef = gql(`
  query IsTokenRegistered($address: String!) {
    isTokenRegistered(address: $address)
  }
`);

export const getTokenLogoUploadUrlQueryDef = gql(`
  query GetTokenLogoUploadUrl {
    tokenLogoUploadUrl {
      uploadUrl
      cdnUrl
    }
  }
`);

export type TokenLogoUploadUrl = GetTokenLogoUploadUrlQuery['tokenLogoUploadUrl'];
