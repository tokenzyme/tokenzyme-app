/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: string; output: string; }
  /** Decimal value as a number */
  Decimal: { input: number; output: number; }
};

export type Account = {
  __typename?: 'Account';
  address: Scalars['String']['output'];
};

export type AddCommentInput = {
  text: Scalars['String']['input'];
  tokenAddress: Scalars['String']['input'];
};

export type Comment = {
  __typename?: 'Comment';
  accountAddress: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  text: Scalars['String']['output'];
};

export type CreateSignatureMessageInput = {
  accountAddress: Scalars['String']['input'];
  type: SignatureMessageType;
};

export type Mutation = {
  __typename?: 'Mutation';
  addComment: Comment;
  createSignatureMessage: SignatureMessage;
  signIn: SignInResult;
};


export type MutationAddCommentArgs = {
  input: AddCommentInput;
};


export type MutationCreateSignatureMessageArgs = {
  input: CreateSignatureMessageInput;
};


export type MutationSignInArgs = {
  input: SignInInput;
};

export type Query = {
  __typename?: 'Query';
  comments: Array<Comment>;
  ethPrice: Scalars['Float']['output'];
  firstPromotedTokensOfMonth: Array<Token>;
  isTokenRegistered: Scalars['Boolean']['output'];
  token: Token;
  tokenLogoUploadUrl: UploadSignedUrl;
  tokens: Array<Token>;
  topHolders: Array<TopHolder>;
  tradeCandles: Array<TradeCandle>;
  trades: Array<Trade>;
};


export type QueryCommentsArgs = {
  lastCommentId?: InputMaybe<Scalars['Int']['input']>;
  pageSize: Scalars['Int']['input'];
  tokenAddress: Scalars['String']['input'];
};


export type QueryIsTokenRegisteredArgs = {
  address: Scalars['String']['input'];
};


export type QueryTokenArgs = {
  address: Scalars['String']['input'];
};


export type QueryTokensArgs = {
  lastTokenAddress?: InputMaybe<Scalars['String']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sortType: TokenSortType;
};


export type QueryTopHoldersArgs = {
  tokenAddress: Scalars['String']['input'];
};


export type QueryTradeCandlesArgs = {
  lastCandleTimestamp?: InputMaybe<Scalars['Float']['input']>;
  pageSize: Scalars['Int']['input'];
  resolution: Scalars['String']['input'];
  tokenAddress: Scalars['String']['input'];
};


export type QueryTradesArgs = {
  lastTradeId?: InputMaybe<Scalars['String']['input']>;
  pageSize: Scalars['Int']['input'];
  tokenAddress: Scalars['String']['input'];
};

export type SignInInput = {
  signature: Scalars['String']['input'];
  signatureMessageId: Scalars['String']['input'];
};

export type SignInResult = {
  __typename?: 'SignInResult';
  account: Account;
  token: Scalars['String']['output'];
};

export type SignatureMessage = {
  __typename?: 'SignatureMessage';
  id: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export enum SignatureMessageType {
  SIGN_IN = 'SIGN_IN'
}

export type SocialMedia = {
  __typename?: 'SocialMedia';
  discordUrl?: Maybe<Scalars['String']['output']>;
  facebookUrl?: Maybe<Scalars['String']['output']>;
  instagramUrl?: Maybe<Scalars['String']['output']>;
  redditUrl?: Maybe<Scalars['String']['output']>;
  telegramUrl?: Maybe<Scalars['String']['output']>;
  xUrl?: Maybe<Scalars['String']['output']>;
};

export type Token = {
  __typename?: 'Token';
  address: Scalars['String']['output'];
  bondingCurveSupply: Scalars['Decimal']['output'];
  commentsCount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  creatorAddress: Scalars['String']['output'];
  description: Scalars['String']['output'];
  dexPoolAddress?: Maybe<Scalars['String']['output']>;
  ethReserve: Scalars['Decimal']['output'];
  finalPrice: Scalars['Decimal']['output'];
  logoUrl: Scalars['String']['output'];
  migratedAt?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  price: Scalars['Decimal']['output'];
  reserve: Scalars['Decimal']['output'];
  socialMedia?: Maybe<SocialMedia>;
  symbol: Scalars['String']['output'];
  totalSupply: Scalars['Decimal']['output'];
  tradesCount: Scalars['Int']['output'];
  websiteUrl?: Maybe<Scalars['String']['output']>;
};

export enum TokenSortType {
  NEW = 'NEW',
  PROGRESS = 'PROGRESS',
  PROMOTED = 'PROMOTED'
}

export type TopHolder = {
  __typename?: 'TopHolder';
  accountAddress: Scalars['String']['output'];
  balance: Scalars['Decimal']['output'];
  percentage: Scalars['Float']['output'];
};

export type Trade = {
  __typename?: 'Trade';
  accountAddress: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  ethAmount: Scalars['Decimal']['output'];
  id: Scalars['String']['output'];
  tokenAmount: Scalars['Decimal']['output'];
  type: TradeType;
};

export type TradeCandle = {
  __typename?: 'TradeCandle';
  close: Scalars['Decimal']['output'];
  high: Scalars['Decimal']['output'];
  low: Scalars['Decimal']['output'];
  open: Scalars['Decimal']['output'];
  time: Scalars['Float']['output'];
  volume: Scalars['Decimal']['output'];
};

export enum TradeType {
  BUY = 'BUY',
  SELL = 'SELL'
}

export type UploadSignedUrl = {
  __typename?: 'UploadSignedUrl';
  cdnUrl: Scalars['String']['output'];
  uploadUrl: Scalars['String']['output'];
};

export type ListTradeCandlesQueryVariables = Exact<{
  tokenAddress: Scalars['String']['input'];
  resolution: Scalars['String']['input'];
  pageSize: Scalars['Int']['input'];
  lastCandleTimestamp?: InputMaybe<Scalars['Float']['input']>;
}>;


export type ListTradeCandlesQuery = { __typename?: 'Query', tradeCandles: Array<{ __typename?: 'TradeCandle', time: number, open: number, high: number, low: number, close: number, volume: number }> };

export type ListTokensQueryVariables = Exact<{
  sortType: TokenSortType;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  lastTokenAddress?: InputMaybe<Scalars['String']['input']>;
}>;


export type ListTokensQuery = { __typename?: 'Query', tokens: Array<{ __typename?: 'Token', address: string, creatorAddress: string, name: string, symbol: string, logoUrl: string, totalSupply: number, bondingCurveSupply: number, reserve: number, price: number, createdAt: string, tradesCount: number, commentsCount: number }> };

export type ListFirstPromotedTokensOfMonthQueryVariables = Exact<{ [key: string]: never; }>;


export type ListFirstPromotedTokensOfMonthQuery = { __typename?: 'Query', firstPromotedTokensOfMonth: Array<{ __typename?: 'Token', address: string, creatorAddress: string, name: string, symbol: string, logoUrl: string }> };

export type IsTokenRegisteredQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;


export type IsTokenRegisteredQuery = { __typename?: 'Query', isTokenRegistered: boolean };

export type GetTokenLogoUploadUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTokenLogoUploadUrlQuery = { __typename?: 'Query', tokenLogoUploadUrl: { __typename?: 'UploadSignedUrl', uploadUrl: string, cdnUrl: string } };

export type GetTokenQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;


export type GetTokenQuery = { __typename?: 'Query', token: { __typename?: 'Token', address: string, creatorAddress: string, name: string, symbol: string, description: string, logoUrl: string, websiteUrl?: string | null, totalSupply: number, bondingCurveSupply: number, ethReserve: number, reserve: number, price: number, finalPrice: number, dexPoolAddress?: string | null, migratedAt?: string | null, createdAt: string, tradesCount: number, commentsCount: number, socialMedia?: { __typename?: 'SocialMedia', xUrl?: string | null, telegramUrl?: string | null, discordUrl?: string | null, redditUrl?: string | null, facebookUrl?: string | null, instagramUrl?: string | null } | null } };

export type ListTopHoldersQueryVariables = Exact<{
  tokenAddress: Scalars['String']['input'];
}>;


export type ListTopHoldersQuery = { __typename?: 'Query', topHolders: Array<{ __typename?: 'TopHolder', accountAddress: string, balance: number, percentage: number }> };

export type ListCommentsQueryVariables = Exact<{
  tokenAddress: Scalars['String']['input'];
  pageSize: Scalars['Int']['input'];
  lastCommentId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ListCommentsQuery = { __typename?: 'Query', comments: Array<{ __typename?: 'Comment', id: number, accountAddress: string, text: string, createdAt: string }> };

export type CreateSignatureMessageMutationVariables = Exact<{
  input: CreateSignatureMessageInput;
}>;


export type CreateSignatureMessageMutation = { __typename?: 'Mutation', createSignatureMessage: { __typename?: 'SignatureMessage', id: string, message: string } };

export type AddCommentMutationVariables = Exact<{
  input: AddCommentInput;
}>;


export type AddCommentMutation = { __typename?: 'Mutation', addComment: { __typename?: 'Comment', id: number } };

export type ListTradesQueryVariables = Exact<{
  tokenAddress: Scalars['String']['input'];
  pageSize: Scalars['Int']['input'];
  lastTradeId?: InputMaybe<Scalars['String']['input']>;
}>;


export type ListTradesQuery = { __typename?: 'Query', trades: Array<{ __typename?: 'Trade', id: string, accountAddress: string, type: TradeType, tokenAmount: number, ethAmount: number, createdAt: string }> };

export type GetTokenChartViewQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;


export type GetTokenChartViewQuery = { __typename?: 'Query', token: { __typename?: 'Token', address: string, name: string, symbol: string } };

export type GetEthPriceQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEthPriceQuery = { __typename?: 'Query', ethPrice: number };


export const ListTradeCandlesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListTradeCandles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tokenAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resolution"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastCandleTimestamp"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tradeCandles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tokenAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tokenAddress"}}},{"kind":"Argument","name":{"kind":"Name","value":"resolution"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resolution"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastCandleTimestamp"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastCandleTimestamp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"open"}},{"kind":"Field","name":{"kind":"Name","value":"high"}},{"kind":"Field","name":{"kind":"Name","value":"low"}},{"kind":"Field","name":{"kind":"Name","value":"close"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}}]}}]}}]} as unknown as DocumentNode<ListTradeCandlesQuery, ListTradeCandlesQueryVariables>;
export const ListTokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListTokens"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TokenSortType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastTokenAddress"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sortType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortType"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastTokenAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastTokenAddress"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"creatorAddress"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"totalSupply"}},{"kind":"Field","name":{"kind":"Name","value":"bondingCurveSupply"}},{"kind":"Field","name":{"kind":"Name","value":"reserve"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"tradesCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}}]}}]}}]} as unknown as DocumentNode<ListTokensQuery, ListTokensQueryVariables>;
export const ListFirstPromotedTokensOfMonthDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListFirstPromotedTokensOfMonth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstPromotedTokensOfMonth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"creatorAddress"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}}]}}]}}]} as unknown as DocumentNode<ListFirstPromotedTokensOfMonthQuery, ListFirstPromotedTokensOfMonthQueryVariables>;
export const IsTokenRegisteredDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsTokenRegistered"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isTokenRegistered"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}]}]}}]} as unknown as DocumentNode<IsTokenRegisteredQuery, IsTokenRegisteredQueryVariables>;
export const GetTokenLogoUploadUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTokenLogoUploadUrl"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenLogoUploadUrl"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadUrl"}},{"kind":"Field","name":{"kind":"Name","value":"cdnUrl"}}]}}]}}]} as unknown as DocumentNode<GetTokenLogoUploadUrlQuery, GetTokenLogoUploadUrlQueryVariables>;
export const GetTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"creatorAddress"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"websiteUrl"}},{"kind":"Field","name":{"kind":"Name","value":"totalSupply"}},{"kind":"Field","name":{"kind":"Name","value":"bondingCurveSupply"}},{"kind":"Field","name":{"kind":"Name","value":"ethReserve"}},{"kind":"Field","name":{"kind":"Name","value":"reserve"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"finalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"dexPoolAddress"}},{"kind":"Field","name":{"kind":"Name","value":"migratedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"tradesCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"socialMedia"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"xUrl"}},{"kind":"Field","name":{"kind":"Name","value":"telegramUrl"}},{"kind":"Field","name":{"kind":"Name","value":"discordUrl"}},{"kind":"Field","name":{"kind":"Name","value":"redditUrl"}},{"kind":"Field","name":{"kind":"Name","value":"facebookUrl"}},{"kind":"Field","name":{"kind":"Name","value":"instagramUrl"}}]}}]}}]}}]} as unknown as DocumentNode<GetTokenQuery, GetTokenQueryVariables>;
export const ListTopHoldersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListTopHolders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tokenAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topHolders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tokenAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tokenAddress"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountAddress"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}}]}}]}}]} as unknown as DocumentNode<ListTopHoldersQuery, ListTopHoldersQueryVariables>;
export const ListCommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tokenAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastCommentId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tokenAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tokenAddress"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastCommentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastCommentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"accountAddress"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<ListCommentsQuery, ListCommentsQueryVariables>;
export const CreateSignatureMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSignatureMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSignatureMessageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSignatureMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateSignatureMessageMutation, CreateSignatureMessageMutationVariables>;
export const AddCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddCommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddCommentMutation, AddCommentMutationVariables>;
export const ListTradesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListTrades"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tokenAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastTradeId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trades"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tokenAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tokenAddress"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastTradeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastTradeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"accountAddress"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"tokenAmount"}},{"kind":"Field","name":{"kind":"Name","value":"ethAmount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<ListTradesQuery, ListTradesQueryVariables>;
export const GetTokenChartViewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTokenChartView"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}}]}}]} as unknown as DocumentNode<GetTokenChartViewQuery, GetTokenChartViewQueryVariables>;
export const GetEthPriceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEthPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ethPrice"}}]}}]} as unknown as DocumentNode<GetEthPriceQuery, GetEthPriceQueryVariables>;