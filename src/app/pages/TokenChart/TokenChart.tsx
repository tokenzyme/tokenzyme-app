import { JSX } from 'react';

import { useDependencies } from './TokenChartHooks';

import { Chart } from '@components/Chart';

export function TokenChart(): JSX.Element | null {
  const { token } = useDependencies();

  return <Chart token={token} />;
}
