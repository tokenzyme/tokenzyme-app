import { InputTextarea, InputTextareaProps } from 'primereact/inputtextarea';
import { classNames } from 'primereact/utils';
import { JSX } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface TextAreaFieldProps extends Omit<
  InputTextareaProps,
  'id' | 'ref' | 'name' | 'value' | 'disabled' | 'onChange' | 'onBlur'
> {
  name: string;
  label?: string;
  helper?: string;
  showErrorMessage?: boolean;
  containerClassName?: string;
}

export function TextAreaField({
  name,
  label = undefined,
  helper = undefined,
  showErrorMessage = true,
  containerClassName = undefined,
  ...input
}: TextAreaFieldProps): JSX.Element {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }): JSX.Element => (
        <div className={classNames('flex flex-col gap-1', containerClassName)}>
          {label && (
            <label htmlFor={field.name} className={classNames('font-semibold', { 'p-error': !!fieldState.error })}>
              {label}
            </label>
          )}
          <InputTextarea
            {...input}
            {...field}
            id={field.name}
            rows={input.rows ?? 3}
            className={classNames(input.className, { 'p-invalid': !!fieldState.error })}
          />
          {helper && <small className="text-sm text-secondary">{helper}</small>}
          {fieldState.error && showErrorMessage && <small className="p-error">{fieldState.error.message}</small>}
        </div>
      )}
    />
  );
}
