import { ProgressSpinner } from 'primereact/progressspinner';
import { classNames } from 'primereact/utils';
import { JSX, ReactNode, Suspense } from 'react';

interface SuspenseSpinnerProps {
  size?: 'normal' | 'small';
  fullHeight?: boolean;
  children: ReactNode;
}

export function SuspenseSpinner({ size = 'normal', fullHeight = true, children }: SuspenseSpinnerProps): JSX.Element {
  return (
    <Suspense
      fallback={
        <div className={classNames('flex justify-center items-center p-2', { 'h-full': fullHeight })}>
          <ProgressSpinner
            className={classNames('text-primary', {
              'w-8 h-8': size === 'small',
              'w-16 h-16': size === 'normal',
            })}
            animationDuration=".6s"
            aria-label="Carregando"
          />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
