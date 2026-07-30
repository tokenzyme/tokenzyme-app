import { gql } from '@graphql';
import { ListCommentsQuery } from '@graphql/types';

export const listCommentsQueryDef = gql(`
  query ListComments($tokenAddress: String!, $pageSize: Int!, $lastCommentId: Int) {
    comments(tokenAddress: $tokenAddress, pageSize: $pageSize, lastCommentId: $lastCommentId) {
      id
      accountAddress
      text
      createdAt
    }
  }
`);

export const createSignatureMessageMutationDef = gql(`
  mutation CreateSignatureMessage($input: CreateSignatureMessageInput!) {
    createSignatureMessage(input: $input) {
      id
      message
    }
  }
`);

export const addCommentMutationDef = gql(`
  mutation AddComment($input: AddCommentInput!) {
    addComment(input: $input) {
      id
    }
  }
`);

export type CommentGql = ListCommentsQuery['comments'][0];
