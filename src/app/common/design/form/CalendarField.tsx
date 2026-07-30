import { Button } from 'primereact/button';
import { Calendar, CalendarProps } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import { JSX } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface CalendarFieldProps
  extends Omit<
    CalendarProps,
    | 'inputId'
    | 'inputRef'
    | 'name'
    | 'value'
    | 'dateFormat'
    | 'mask'
    | 'maskSlotChar'
    | 'locale'
    | 'onChange'
    | 'onBlur'
  > {
  name: string;
  label?: string;
  actionLabel?: string;
  helper?: string;
  containerClassName?: string;
  onActionClick?: () => void;
}

export function CalendarField({
  name,
  label = undefined,
  actionLabel = undefined,
  helper = undefined,
  containerClassName = undefined,
  onActionClick = undefined,
  ...calendar
}: CalendarFieldProps): JSX.Element {
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
              <div className="flex justify-between">
                <label htmlFor={field.name} className={classNames('font-semibold', { 'p-error': !!fieldState.error })}>
                  {label}
                </label>
                {actionLabel && onActionClick && (
                  <Button
                    type="button"
                    label={actionLabel}
                    size="small"
                    text
                    className="px-1 py-0"
                    onClick={onActionClick}
                  />
                )}
              </div>
            )}
            <Calendar
              {...calendar}
              {...rest}
              inputId={field.name}
              inputRef={ref}
              inputClassName={classNames(calendar.inputClassName, { 'p-invalid': !!fieldState.error })}
              disabled={calendar.disabled || field.disabled}
              mask={calendar.showTime ? '99/99/9999 99:99' : '99/99/9999'}
              showButtonBar={calendar.showButtonBar != null ? calendar.showButtonBar : true}
              showIcon
              showOnFocus={false}
            />
            {helper && <small className="text-sm text-secondary">{helper}</small>}
            {fieldState.error && <small className="p-error text-sm">{fieldState.error.message}</small>}
          </div>
        );
      }}
    />
  );
}
