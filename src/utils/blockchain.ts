import { defineChain } from '@reown/appkit/networks';

export const formatAddress = (address: string): string => {
  if (address.length < 12) {
    return address;
  }
  return `${address.slice(0, 6)}...${address.slice(-6)}`;
};

export const formatAccountAddress = (address: string): string => {
  if (address.length < 8) {
    return address;
  }
  return address.replace(/^0x/, '').slice(0, 6);
};

export const formatTransaction = (txId: string): string => {
  if (txId.length < 8) {
    return txId;
  }
  return txId.replace(/^0x/, '').slice(0, 6);
};

export const sonicTestnet = defineChain({
  id: 14601,
  chainNamespace: 'eip155',
  caipNetworkId: 'eip155:14601',
  name: 'Sonic Testnet',
  testnet: true,
  nativeCurrency: {
    name: 'Sonic',
    symbol: 'S',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://rpc.testnet.soniclabs.com'] },
  },
  blockExplorers: {
    default: {
      name: 'Sonic Testnet Explorer',
      url: 'https://testnet.sonicscan.org',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 0,
    },
  },
});
