import { atom, useAtom, useAtomValue } from 'jotai';
import { useCallback } from 'react';

interface UseDialogControlHook {
  isDialogOpened: (name: string) => boolean;
  showDialog: <T>(name: string, args?: T) => void;
  hideDialog: () => void;
}

interface Dialog<T> {
  name: string;
  args: T;
}

const dialogAtom = atom<Dialog<unknown> | null>(null);

export const useDialogControl = (): UseDialogControlHook => {
  const [dialog, setDialog] = useAtom(dialogAtom);

  const isDialogOpened = useCallback((name: string): boolean => dialog?.name === name, [dialog]);

  const showDialog = useCallback(
    <T>(name: string, args?: T): void => {
      setDialog({ name, args });
    },
    [setDialog],
  );

  const hideDialog = useCallback((): void => {
    setDialog(null);
  }, [setDialog]);

  return { isDialogOpened, showDialog, hideDialog };
};

export const useDialogArgs = <T>(): T | null => {
  const dialog = useAtomValue(dialogAtom);

  return dialog?.args as T | null;
};
