import { Dropdown, DropdownChangeEvent, DropdownProps } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';
import { JSX } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface DropdownFieldProps extends Omit<
  DropdownProps,
  'inputId' | 'focusInputRef' | 'name' | 'value' | 'onChange' | 'onBlur'
> {
  name: string;
  label?: string;
  helper?: string;
  containerClassName?: string;
  onChange?: (event: DropdownChangeEvent) => void;
}

export function DropdownField({
  name,
  label = undefined,
  helper = undefined,
  containerClassName = undefined,
  onChange: onChangeCustom = undefined,
  ...dropdown
}: DropdownFieldProps): JSX.Element {
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
              <label className={classNames('font-semibold', { 'p-error': !!fieldState.error })} htmlFor={field.name}>
                {label}
              </label>
            )}
            <Dropdown
              {...dropdown}
              {...rest}
              inputId={field.name}
              focusInputRef={ref}
              disabled={dropdown.disabled || field.disabled}
              className={classNames(dropdown.className, { 'p-invalid': !!fieldState.error })}
              onChange={(event) => {
                onChange(event.value ?? null);
                onChangeCustom?.(event);
              }}
            />
            {helper && <small className="text-sm text-secondary">{helper}</small>}
            {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
          </div>
        );
      }}
    />
  );
}
