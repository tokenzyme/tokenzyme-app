import { JSX } from 'react';

import { CHART_RESOLUTIONS, Token, useDependencies } from './ChartHooks';

interface ChartProps {
  token: Token;
}

export function Chart({ token }: ChartProps): JSX.Element | null {
  const { chartContainerRef, resolution, setResolution } = useDependencies(token);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-1">
        {CHART_RESOLUTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={(): void => {
              setResolution(option.value);
            }}
            className={
              option.value === resolution
                ? 'rounded px-2 py-1 text-xs bg-primary text-white'
                : 'rounded px-2 py-1 text-xs text-secondary hover:bg-white/10'
            }
          >
            {option.label}
          </button>
        ))}
      </div>
      <div ref={chartContainerRef} className="rounded-md overflow-clip h-[30rem]" />
    </div>
  );
}
