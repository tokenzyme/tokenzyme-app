import { gql } from '@graphql';
import { GetAdminQuery } from '@graphql/types';

export const getAdminQueryDef = gql(`
  query GetAdmin {
    admin {
      id
      name
    }
  }
`);

export type AdminGql = GetAdminQuery['admin'];
