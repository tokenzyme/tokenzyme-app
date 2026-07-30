import { zodResolver } from '@hookform/resolvers/zod';
import { UseFormReturn, useForm } from 'react-hook-form';

import { FormValues, FormValuesOut, getInitialValues, validationSchema } from './SlippageDialogForms';

import { useDialogArgs, useDialogControl } from '@hooks/useDialog';

export const SLIPPAGE_DIALOG = 'SlippageDialog';

export interface SlippageDialogArgs {
  slippage?: number;
}

interface UseDependenciesHook {
  form: UseFormReturn<FormValues, unknown, FormValuesOut>;
  handlers: {
    handleSubmit: (values: FormValuesOut) => void;
  };
}

export const useDependencies = (onSlippageChanged: (slipppage: number) => void): UseDependenciesHook => {
  const { hideDialog } = useDialogControl();
  const dialogArgs = useDialogArgs<SlippageDialogArgs>();

  const form = useForm({
    values: getInitialValues(dialogArgs?.slippage),
    resolver: zodResolver<FormValues, unknown, FormValuesOut>(validationSchema),
    mode: 'all',
  });

  const handleSubmit = (values: FormValuesOut): void => {
    onSlippageChanged(values.slippage);
    hideDialog();
  };

  return {
    form,
    handlers: { handleSubmit },
  };
};
