import { confirmDialog } from 'primereact/confirmdialog';
import { ReactNode } from 'react';

interface ShowRemoveDialogArgs {
  header: string;
  message: ReactNode;
  isDanger?: boolean;
  accept: () => void;
  reject?: () => void;
}

export const showConfirmDialog = ({ header, message, isDanger = true, accept, reject }: ShowRemoveDialogArgs): void => {
  confirmDialog({
    header,
    message,
    accept,
    reject,
    rejectClassName: 'p-button-secondary p-button-text mr-2',
    acceptClassName: isDanger ? 'p-button-danger' : '',
    draggable: false,
    resizable: false,
    pt: { root: { className: 'p-dialog-sm' } },
  });
};
