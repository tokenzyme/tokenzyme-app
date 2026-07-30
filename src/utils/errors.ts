import snakeCase from 'lodash.snakecase';

import { UNKNOWN_ERROR } from './messages';

import { Launchpad__factory } from '@typechain';

export const parseContractError = (err: unknown): Error => {
  if (err instanceof Error && 'data' in err && typeof err.data === 'string') {
    const decoded = Launchpad__factory.createInterface().parseError(err.data);
    if (decoded) {
      return new Error(snakeCase(decoded.name));
    }
  }
  return new Error(UNKNOWN_ERROR);
};
