import { Password, PasswordProps } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { JSX } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface PasswordFieldProps
  extends Omit<
    PasswordProps,
    'inputId' | 'inputRef' | 'name' | 'value' | 'disabled' | 'onChange' | 'onBlur' | 'autoComplete'
  > {
  name: string;
  label?: string;
  helper?: string;
  containerClassName?: string;
}

export function PasswordField({
  name,
  label = undefined,
  helper = undefined,
  containerClassName = undefined,
  ...input
}: PasswordFieldProps): JSX.Element {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }): JSX.Element => {
        const { ref, ...rest } = field;
        return (
          <div className={classNames('flex flex-col gap-1', containerClassName)}>
            {label && (
              <label htmlFor={field.name} className={classNames('font-semibold', { 'p-error': !!fieldState.error })}>
                {label}
              </label>
            )}
            <Password
              {...input}
              {...rest}
              inputId={field.name}
              inputRef={ref}
              inputClassName={classNames(input.inputClassName, { 'p-invalid': !!fieldState.error })}
              feedback={input.feedback ?? false}
              toggleMask={input.toggleMask ?? true}
              autoComplete="on"
              pt={{ input: { className: 'w-full' }, iconField: { root: { className: 'w-full' } } }}
            />
            {helper && <small className="text-sm text-secondary">{helper}</small>}
            {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
          </div>
        );
      }}
    />
  );
}
