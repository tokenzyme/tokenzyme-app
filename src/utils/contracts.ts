import { JsonRpcSigner, ethers } from 'ethers';

import { LAUNCHPAD_ADDRESS, RPC_URL } from './env';

import { ERC20, ERC20__factory, ILaunchpad, ILaunchpad__factory } from '@typechain';

const defaultProvider = new ethers.JsonRpcProvider(RPC_URL);

export const getLaunchpadContract = (signer?: JsonRpcSigner): ILaunchpad =>
  ILaunchpad__factory.connect(LAUNCHPAD_ADDRESS, signer ?? defaultProvider);

export const getErc20Contract = (tokenAddress: string, signer?: JsonRpcSigner): ERC20 =>
  ERC20__factory.connect(tokenAddress, signer ?? defaultProvider);
