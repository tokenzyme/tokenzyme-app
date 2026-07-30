import { Dialog as PrimeDialog } from 'primereact/dialog';
import { JSX, ReactNode } from 'react';

import { SuspenseSpinner } from './SuspenseSpinner';

import { useDialogControl } from '@hooks/useDialog';

interface DialogProps {
  name: string;
  header: string;
  size?: 'small' | 'medium';
  children: ReactNode;
  onHide?: () => void;
}

export function Dialog({ name, header, size = 'medium', children, onHide = undefined }: DialogProps): JSX.Element {
  const { isDialogOpened, hideDialog } = useDialogControl();

  return (
    <PrimeDialog
      header={header}
      visible={isDialogOpened(name)}
      draggable={false}
      resizable={false}
      className={`p-dialog-${size === 'medium' ? 'md' : 'sm'}`}
      onHide={() => {
        hideDialog();
        onHide?.();
      }}
    >
      <SuspenseSpinner>{children}</SuspenseSpinner>
    </PrimeDialog>
  );
}
