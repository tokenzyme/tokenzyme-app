import { formatEther } from 'ethers';

const amountFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 4,
  roundingMode: 'trunc',
});

export const convertEtherToNumber = (value: bigint): number => Number(formatEther(value));

const trimDecimals = (value: string): string => value.replace(/\.?0+$/, '');

export const formatNumber = (value: number, pretty = false): string => {
  if (!pretty) {
    return amountFormatter.format(value);
  }
  if (value >= 1_000_000) {
    return `${trimDecimals((value / 1_000_000).toFixed(3))} mi`;
  }
  if (value >= 1_000) {
    return `${trimDecimals((value / 1_000).toFixed(3))} k`;
  }
  return trimDecimals(value.toFixed(3));
};

export const formatPercentage = (percentage: number): string => {
  const rounded = Math.round(percentage * 100) / 100;
  return rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toString();
};
