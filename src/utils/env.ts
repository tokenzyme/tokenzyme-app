const coreUrl = import.meta.env.VITE_CORE_URL as string | undefined;
const indexerUrl = import.meta.env.VITE_INDEXER_URL as string | undefined;
const reownProjectId = import.meta.env.VITE_REOWN_PROJECT_ID as string | undefined;
const network = import.meta.env.VITE_NETWORK as string | undefined;
const rpcUrl = import.meta.env.VITE_RPC_URL as string | undefined;
const blockExplorerUrl = import.meta.env.VITE_BLOCK_EXPLORER_URL as string | undefined;
const launchpadAddress = import.meta.env.VITE_LAUNCHPAD_ADDRESS as string | undefined;

if (!coreUrl) {
  throw new Error('Missing VITE_CORE_URL environment variable');
}

if (!indexerUrl) {
  throw new Error('Missing VITE_INDEXER_URL environment variable');
}

if (!reownProjectId) {
  throw new Error('Missing VITE_REOWN_PROJECT_ID environment variable');
}

if (!network) {
  throw new Error('Missing VITE_NETWORK environment variable');
}

if (network !== 'mainnet' && network !== 'testnet' && network !== 'testnet-legacy' && network !== 'fork') {
  throw new Error('Invalid VITE_NETWORK environment variable');
}

if (!rpcUrl) {
  throw new Error('Missing VITE_RPC_URL environment variable');
}

if (!blockExplorerUrl) {
  throw new Error('Missing VITE_BLOCK_EXPLORER_URL environment variable');
}

if (!launchpadAddress) {
  throw new Error('Missing VITE_LAUNCHPAD_ADDRESS environment variable');
}

export const CORE_URL = coreUrl;

export const INDEXER_URL = indexerUrl;

export const REOWN_PROJECT_ID = reownProjectId;

export const NETWORK = network;

export const RPC_URL = rpcUrl;

export const BLOCK_EXPLORER_URL = blockExplorerUrl;

export const LAUNCHPAD_ADDRESS = launchpadAddress;
