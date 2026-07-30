import { ComponentType, JSX } from 'react';

import { SuspenseSpinner } from '@design/components/SuspenseSpinner';

export function withSuspenseSpinner<P extends object>(Component: ComponentType<P>) {
  // eslint-disable-next-line func-names
  return function (props: P): JSX.Element {
    return (
      <SuspenseSpinner>
        <Component {...props} />
      </SuspenseSpinner>
    );
  };
}
