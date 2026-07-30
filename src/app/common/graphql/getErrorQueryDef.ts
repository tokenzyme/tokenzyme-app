export interface GetErrorQuery {
  __typename?: 'Query';
  error: { __typename?: 'Error'; message: string; random: number };
}

export const getErrorQueryDef = `
  query GetError {
    error {
      message
      random
    }
  }
`;
