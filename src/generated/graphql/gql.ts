/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query ListTradeCandles($tokenAddress: String!, $resolution: String!, $pageSize: Int!, $lastCandleTimestamp: Float) {\n    tradeCandles(\n      tokenAddress: $tokenAddress,\n      resolution: $resolution,\n      pageSize: $pageSize,\n      lastCandleTimestamp: $lastCandleTimestamp\n    ) {\n      time\n      open\n      high\n      low\n      close\n      volume\n    }\n  }\n": typeof types.ListTradeCandlesDocument,
    "\n  query ListTokens($sortType: TokenSortType!, $pageSize: Int, $lastTokenAddress: String) {\n    tokens(sortType: $sortType, pageSize: $pageSize, lastTokenAddress: $lastTokenAddress) {\n      address\n      creatorAddress\n      name\n      symbol\n      logoUrl\n      totalSupply\n      bondingCurveSupply\n      reserve\n      price\n      createdAt\n      tradesCount\n      commentsCount\n    }\n  }\n": typeof types.ListTokensDocument,
    "\n  query ListFirstPromotedTokensOfMonth {\n    firstPromotedTokensOfMonth {\n      address\n      creatorAddress\n      name\n      symbol\n      logoUrl\n    }\n  }\n": typeof types.ListFirstPromotedTokensOfMonthDocument,
    "\n  query IsTokenRegistered($address: String!) {\n    isTokenRegistered(address: $address)\n  }\n": typeof types.IsTokenRegisteredDocument,
    "\n  query GetTokenLogoUploadUrl {\n    tokenLogoUploadUrl {\n      uploadUrl\n      cdnUrl\n    }\n  }\n": typeof types.GetTokenLogoUploadUrlDocument,
    "\n  query GetToken($address: String!) {\n    token(address: $address) {\n      address\n      creatorAddress\n      name\n      symbol\n      description\n      logoUrl\n      websiteUrl\n      totalSupply\n      bondingCurveSupply\n      ethReserve\n      reserve\n      price\n      finalPrice\n      dexPoolAddress\n      migratedAt\n      createdAt\n      tradesCount\n      commentsCount\n      socialMedia {\n        xUrl\n        telegramUrl\n        discordUrl\n        redditUrl\n        facebookUrl\n        instagramUrl\n      }\n    }\n  }\n": typeof types.GetTokenDocument,
    "\n  query ListTopHolders($tokenAddress: String!) {\n    topHolders(tokenAddress: $tokenAddress) {\n      accountAddress\n      balance\n      percentage\n    }\n  }\n": typeof types.ListTopHoldersDocument,
    "\n  query ListComments($tokenAddress: String!, $pageSize: Int!, $lastCommentId: Int) {\n    comments(tokenAddress: $tokenAddress, pageSize: $pageSize, lastCommentId: $lastCommentId) {\n      id\n      accountAddress\n      text\n      createdAt\n    }\n  }\n": typeof types.ListCommentsDocument,
    "\n  mutation CreateSignatureMessage($input: CreateSignatureMessageInput!) {\n    createSignatureMessage(input: $input) {\n      id\n      message\n    }\n  }\n": typeof types.CreateSignatureMessageDocument,
    "\n  mutation AddComment($input: AddCommentInput!) {\n    addComment(input: $input) {\n      id\n    }\n  }\n": typeof types.AddCommentDocument,
    "\n  query ListTrades($tokenAddress: String!, $pageSize: Int!, $lastTradeId: String) {\n    trades(tokenAddress: $tokenAddress, pageSize: $pageSize, lastTradeId: $lastTradeId) {\n      id\n      accountAddress\n      type\n      tokenAmount\n      ethAmount\n      createdAt\n    }\n  }\n": typeof types.ListTradesDocument,
    "\n  query GetTokenChartView($address: String!) {\n    token(address: $address) {\n      address\n      name\n      symbol\n    }\n  }\n": typeof types.GetTokenChartViewDocument,
    "\n  query GetEthPrice {\n    ethPrice\n  }\n": typeof types.GetEthPriceDocument,
};
const documents: Documents = {
    "\n  query ListTradeCandles($tokenAddress: String!, $resolution: String!, $pageSize: Int!, $lastCandleTimestamp: Float) {\n    tradeCandles(\n      tokenAddress: $tokenAddress,\n      resolution: $resolution,\n      pageSize: $pageSize,\n      lastCandleTimestamp: $lastCandleTimestamp\n    ) {\n      time\n      open\n      high\n      low\n      close\n      volume\n    }\n  }\n": types.ListTradeCandlesDocument,
    "\n  query ListTokens($sortType: TokenSortType!, $pageSize: Int, $lastTokenAddress: String) {\n    tokens(sortType: $sortType, pageSize: $pageSize, lastTokenAddress: $lastTokenAddress) {\n      address\n      creatorAddress\n      name\n      symbol\n      logoUrl\n      totalSupply\n      bondingCurveSupply\n      reserve\n      price\n      createdAt\n      tradesCount\n      commentsCount\n    }\n  }\n": types.ListTokensDocument,
    "\n  query ListFirstPromotedTokensOfMonth {\n    firstPromotedTokensOfMonth {\n      address\n      creatorAddress\n      name\n      symbol\n      logoUrl\n    }\n  }\n": types.ListFirstPromotedTokensOfMonthDocument,
    "\n  query IsTokenRegistered($address: String!) {\n    isTokenRegistered(address: $address)\n  }\n": types.IsTokenRegisteredDocument,
    "\n  query GetTokenLogoUploadUrl {\n    tokenLogoUploadUrl {\n      uploadUrl\n      cdnUrl\n    }\n  }\n": types.GetTokenLogoUploadUrlDocument,
    "\n  query GetToken($address: String!) {\n    token(address: $address) {\n      address\n      creatorAddress\n      name\n      symbol\n      description\n      logoUrl\n      websiteUrl\n      totalSupply\n      bondingCurveSupply\n      ethReserve\n      reserve\n      price\n      finalPrice\n      dexPoolAddress\n      migratedAt\n      createdAt\n      tradesCount\n      commentsCount\n      socialMedia {\n        xUrl\n        telegramUrl\n        discordUrl\n        redditUrl\n        facebookUrl\n        instagramUrl\n      }\n    }\n  }\n": types.GetTokenDocument,
    "\n  query ListTopHolders($tokenAddress: String!) {\n    topHolders(tokenAddress: $tokenAddress) {\n      accountAddress\n      balance\n      percentage\n    }\n  }\n": types.ListTopHoldersDocument,
    "\n  query ListComments($tokenAddress: String!, $pageSize: Int!, $lastCommentId: Int) {\n    comments(tokenAddress: $tokenAddress, pageSize: $pageSize, lastCommentId: $lastCommentId) {\n      id\n      accountAddress\n      text\n      createdAt\n    }\n  }\n": types.ListCommentsDocument,
    "\n  mutation CreateSignatureMessage($input: CreateSignatureMessageInput!) {\n    createSignatureMessage(input: $input) {\n      id\n      message\n    }\n  }\n": types.CreateSignatureMessageDocument,
    "\n  mutation AddComment($input: AddCommentInput!) {\n    addComment(input: $input) {\n      id\n    }\n  }\n": types.AddCommentDocument,
    "\n  query ListTrades($tokenAddress: String!, $pageSize: Int!, $lastTradeId: String) {\n    trades(tokenAddress: $tokenAddress, pageSize: $pageSize, lastTradeId: $lastTradeId) {\n      id\n      accountAddress\n      type\n      tokenAmount\n      ethAmount\n      createdAt\n    }\n  }\n": types.ListTradesDocument,
    "\n  query GetTokenChartView($address: String!) {\n    token(address: $address) {\n      address\n      name\n      symbol\n    }\n  }\n": types.GetTokenChartViewDocument,
    "\n  query GetEthPrice {\n    ethPrice\n  }\n": types.GetEthPriceDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ListTradeCandles($tokenAddress: String!, $resolution: String!, $pageSize: Int!, $lastCandleTimestamp: Float) {\n    tradeCandles(\n      tokenAddress: $tokenAddress,\n      resolution: $resolution,\n      pageSize: $pageSize,\n      lastCandleTimestamp: $lastCandleTimestamp\n    ) {\n      time\n      open\n      high\n      low\n      close\n      volume\n    }\n  }\n"): (typeof documents)["\n  query ListTradeCandles($tokenAddress: String!, $resolution: String!, $pageSize: Int!, $lastCandleTimestamp: Float) {\n    tradeCandles(\n      tokenAddress: $tokenAddress,\n      resolution: $resolution,\n      pageSize: $pageSize,\n      lastCandleTimestamp: $lastCandleTimestamp\n    ) {\n      time\n      open\n      high\n      low\n      close\n      volume\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ListTokens($sortType: TokenSortType!, $pageSize: Int, $lastTokenAddress: String) {\n    tokens(sortType: $sortType, pageSize: $pageSize, lastTokenAddress: $lastTokenAddress) {\n      address\n      creatorAddress\n      name\n      symbol\n      logoUrl\n      totalSupply\n      bondingCurveSupply\n      reserve\n      price\n      createdAt\n      tradesCount\n      commentsCount\n    }\n  }\n"): (typeof documents)["\n  query ListTokens($sortType: TokenSortType!, $pageSize: Int, $lastTokenAddress: String) {\n    tokens(sortType: $sortType, pageSize: $pageSize, lastTokenAddress: $lastTokenAddress) {\n      address\n      creatorAddress\n      name\n      symbol\n      logoUrl\n      totalSupply\n      bondingCurveSupply\n      reserve\n      price\n      createdAt\n      tradesCount\n      commentsCount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ListFirstPromotedTokensOfMonth {\n    firstPromotedTokensOfMonth {\n      address\n      creatorAddress\n      name\n      symbol\n      logoUrl\n    }\n  }\n"): (typeof documents)["\n  query ListFirstPromotedTokensOfMonth {\n    firstPromotedTokensOfMonth {\n      address\n      creatorAddress\n      name\n      symbol\n      logoUrl\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query IsTokenRegistered($address: String!) {\n    isTokenRegistered(address: $address)\n  }\n"): (typeof documents)["\n  query IsTokenRegistered($address: String!) {\n    isTokenRegistered(address: $address)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetTokenLogoUploadUrl {\n    tokenLogoUploadUrl {\n      uploadUrl\n      cdnUrl\n    }\n  }\n"): (typeof documents)["\n  query GetTokenLogoUploadUrl {\n    tokenLogoUploadUrl {\n      uploadUrl\n      cdnUrl\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetToken($address: String!) {\n    token(address: $address) {\n      address\n      creatorAddress\n      name\n      symbol\n      description\n      logoUrl\n      websiteUrl\n      totalSupply\n      bondingCurveSupply\n      ethReserve\n      reserve\n      price\n      finalPrice\n      dexPoolAddress\n      migratedAt\n      createdAt\n      tradesCount\n      commentsCount\n      socialMedia {\n        xUrl\n        telegramUrl\n        discordUrl\n        redditUrl\n        facebookUrl\n        instagramUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetToken($address: String!) {\n    token(address: $address) {\n      address\n      creatorAddress\n      name\n      symbol\n      description\n      logoUrl\n      websiteUrl\n      totalSupply\n      bondingCurveSupply\n      ethReserve\n      reserve\n      price\n      finalPrice\n      dexPoolAddress\n      migratedAt\n      createdAt\n      tradesCount\n      commentsCount\n      socialMedia {\n        xUrl\n        telegramUrl\n        discordUrl\n        redditUrl\n        facebookUrl\n        instagramUrl\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ListTopHolders($tokenAddress: String!) {\n    topHolders(tokenAddress: $tokenAddress) {\n      accountAddress\n      balance\n      percentage\n    }\n  }\n"): (typeof documents)["\n  query ListTopHolders($tokenAddress: String!) {\n    topHolders(tokenAddress: $tokenAddress) {\n      accountAddress\n      balance\n      percentage\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ListComments($tokenAddress: String!, $pageSize: Int!, $lastCommentId: Int) {\n    comments(tokenAddress: $tokenAddress, pageSize: $pageSize, lastCommentId: $lastCommentId) {\n      id\n      accountAddress\n      text\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query ListComments($tokenAddress: String!, $pageSize: Int!, $lastCommentId: Int) {\n    comments(tokenAddress: $tokenAddress, pageSize: $pageSize, lastCommentId: $lastCommentId) {\n      id\n      accountAddress\n      text\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateSignatureMessage($input: CreateSignatureMessageInput!) {\n    createSignatureMessage(input: $input) {\n      id\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation CreateSignatureMessage($input: CreateSignatureMessageInput!) {\n    createSignatureMessage(input: $input) {\n      id\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddComment($input: AddCommentInput!) {\n    addComment(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation AddComment($input: AddCommentInput!) {\n    addComment(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ListTrades($tokenAddress: String!, $pageSize: Int!, $lastTradeId: String) {\n    trades(tokenAddress: $tokenAddress, pageSize: $pageSize, lastTradeId: $lastTradeId) {\n      id\n      accountAddress\n      type\n      tokenAmount\n      ethAmount\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query ListTrades($tokenAddress: String!, $pageSize: Int!, $lastTradeId: String) {\n    trades(tokenAddress: $tokenAddress, pageSize: $pageSize, lastTradeId: $lastTradeId) {\n      id\n      accountAddress\n      type\n      tokenAmount\n      ethAmount\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetTokenChartView($address: String!) {\n    token(address: $address) {\n      address\n      name\n      symbol\n    }\n  }\n"): (typeof documents)["\n  query GetTokenChartView($address: String!) {\n    token(address: $address) {\n      address\n      name\n      symbol\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetEthPrice {\n    ethPrice\n  }\n"): (typeof documents)["\n  query GetEthPrice {\n    ethPrice\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;