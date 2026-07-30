import { Button } from 'primereact/button';
import { JSX } from 'react';
import { FormProvider } from 'react-hook-form';

import { SLIPPAGE_DIALOG, useDependencies } from './SlippageDialogHooks';

import { NumberField } from '@design/form/NumberField';
import { withDialog } from '@hoc/withDialog';

interface SlippageDialogProps {
  onSlippageChanged: (slippage: number) => void;
}

function SlippageDialogView({ onSlippageChanged }: SlippageDialogProps): JSX.Element {
  const {
    form,
    handlers: { handleSubmit },
  } = useDependencies(onSlippageChanged);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div>
          <NumberField
            name="slippage"
            min={0}
            helper="Slippage is the maximum difference between the expected and final rate of your trade. If it's too low, your trade might fail. Adjust it if the market is moving fast."
            suffix="%"
          />
        </div>
        <div className="p-dialog-footer">
          <Button label="Change" loading={form.formState.isSubmitting} disabled={!form.formState.isValid} />
        </div>
      </form>
    </FormProvider>
  );
}

export const SlippageDialog = withDialog(SlippageDialogView, {
  name: SLIPPAGE_DIALOG,
  header: 'Slippage',
  size: 'small',
});
