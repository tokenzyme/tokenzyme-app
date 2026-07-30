import { atom, useAtomValue, useSetAtom } from 'jotai';
import { ToastMessage } from 'primereact/toast';
import { useCallback } from 'react';

import { UNKNOWN_ERROR, getErrorMessage } from '@utils/messages';

interface UseAlertHook {
  showSuccess: (summary: string, detail?: string) => void;
  showInfo: (summary: string, detail?: string) => void;
  showWarning: (summary: string, detail?: string) => void;
  showError: (error: unknown) => void;
  showUnknownError: () => void;
}

const alertMessageAtom = atom<ToastMessage | null>(null);

export const useAlertMessage = (): ToastMessage | null => useAtomValue(alertMessageAtom);

export const useSetAlertMessage = (): ((alert: ToastMessage | null) => void) => useSetAtom(alertMessageAtom);

export const useAlert = (): UseAlertHook => {
  const setAlertMessage = useSetAtom(alertMessageAtom);

  const showAlert = useCallback(
    (severity: ToastMessage['severity'], summary: string, detail?: string): void => {
      setAlertMessage({ severity, summary, detail, life: 5000 });
    },
    [setAlertMessage],
  );

  const showSuccess = useCallback(
    (summary: string, detail?: string): void => {
      showAlert('success', summary, detail);
    },
    [showAlert],
  );

  const showWarning = useCallback(
    (summary: string, detail?: string): void => {
      showAlert('warn', summary, detail);
    },
    [showAlert],
  );

  const showInfo = useCallback(
    (summary: string, detail?: string): void => {
      showAlert('info', summary, detail);
    },
    [showAlert],
  );

  const showError = useCallback(
    (error: unknown): void => {
      if (typeof error === 'string') {
        showAlert('error', 'Error', error);
      } else if (error instanceof Error) {
        showAlert('error', 'Error', getErrorMessage(error.message));
      }
    },
    [showAlert],
  );

  const showUnknownError = useCallback((): void => {
    showError(new Error(UNKNOWN_ERROR));
  }, [showError]);

  return { showSuccess, showInfo, showWarning, showError, showUnknownError };
};
