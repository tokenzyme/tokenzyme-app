import { ComponentType, JSX } from 'react';

import { Dialog } from '@design/components/Dialog';

interface WithDialogArgs {
  name: string;
  header: string;
  size?: 'small' | 'medium';
}

export function withDialog<P extends object>(Component: ComponentType<P>, args: WithDialogArgs) {
  // eslint-disable-next-line func-names
  return function (props: P): JSX.Element {
    return (
      <Dialog name={args.name} header={args.header} size={args.size}>
        <Component {...props} />
      </Dialog>
    );
  };
}
