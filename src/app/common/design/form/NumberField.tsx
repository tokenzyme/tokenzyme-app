import { InputNumber, InputNumberProps } from 'primereact/inputnumber';
import { classNames } from 'primereact/utils';
import { JSX, ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface NumberFieldProps extends Omit<
  InputNumberProps,
  'inputId' | 'inputRef' | 'name' | 'value' | 'disabled' | 'onChange' | 'onBlur'
> {
  name: string;
  label?: string;
  helper?: string;
  rightAddOn?: ReactNode;
  showErrorMessage?: boolean;
  containerClassName?: string;
}

export function NumberField({
  name,
  label = undefined,
  helper = undefined,
  rightAddOn = undefined,
  showErrorMessage = true,
  containerClassName = undefined,
  ...input
}: NumberFieldProps): JSX.Element {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }): JSX.Element => {
        const { ref, onChange, ...rest } = field;
        return (
          <div className={classNames('flex flex-col gap-1', containerClassName)}>
            {label && (
              <label htmlFor={field.name} className={classNames('font-semibold', { 'p-error': fieldState.error })}>
                {label}
              </label>
            )}
            <div className="p-inputgroup flex-1">
              <InputNumber
                {...input}
                {...rest}
                inputId={field.name}
                inputRef={ref}
                inputClassName={classNames(input.inputClassName, { 'p-invalid': fieldState.error })}
                onChange={(e) => {
                  onChange(e.value);
                }}
              />
              {rightAddOn && <span className="p-inputgroup-addon p-0">{rightAddOn}</span>}
            </div>
            {helper && <small className="text-sm text-secondary">{helper}</small>}
            {fieldState.error && showErrorMessage && <small className="p-error">{fieldState.error.message}</small>}
          </div>
        );
      }}
    />
  );
}
