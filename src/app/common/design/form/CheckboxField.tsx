import { Checkbox, CheckboxProps } from 'primereact/checkbox';
import { classNames } from 'primereact/utils';
import { JSX } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface CheckboxFieldProps extends Omit<
  CheckboxProps,
  'id' | 'ref' | 'name' | 'value' | 'checked' | 'disabled' | 'onChange' | 'onBlur'
> {
  name: string;
  label?: string;
  helper?: string;
  containerClassName?: string;
}

export function CheckboxField({
  name,
  label = undefined,
  helper = undefined,
  containerClassName = undefined,
  ...checkbox
}: CheckboxFieldProps): JSX.Element {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }): JSX.Element => (
        <div className={classNames('flex flex-col gap-1', containerClassName)}>
          <div className="flex items-center gap-2">
            <Checkbox
              inputId={field.name}
              inputRef={field.ref}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              checked={field.value}
              disabled={field.disabled}
              className={classNames(checkbox.className, { 'p-invalid': !!fieldState.error })}
              onChange={(e) => {
                field.onChange(e.checked);
              }}
              onBlur={field.onBlur}
            />
            {label && (
              <label className={classNames({ 'p-error': !!fieldState.error })} htmlFor={field.name}>
                {label}
              </label>
            )}
          </div>
          {helper && <small className="text-sm text-secondary">{helper}</small>}
          {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
        </div>
      )}
    />
  );
}
