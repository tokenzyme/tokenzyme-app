import { atom, useAtomValue, useSetAtom } from 'jotai';

const ethPrice = atom<number>(0);

export const useEthPrice = (): number => useAtomValue(ethPrice);

export const useSetEthPrice = (): ((ethPrice: number) => void) => useSetAtom(ethPrice);
