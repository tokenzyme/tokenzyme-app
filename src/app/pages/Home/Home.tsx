import { JSX } from 'react';

import { Tokens } from './components/Tokens';
import { TradingFeeShare } from './components/TradingFeeShare';

export function Home(): JSX.Element {
  return (
    <div className="flex flex-col gap-4">
      <TradingFeeShare />
      <Tokens />
    </div>
  );
}
