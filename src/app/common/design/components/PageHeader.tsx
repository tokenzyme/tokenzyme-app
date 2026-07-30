import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { JSX, ReactNode } from 'react';

interface PageHeaderProps {
  title: string | ReactNode;
  asHeading2?: boolean;
  primaryLabel?: string;
  updateLabel?: string;
  removeLabel?: string;
  otherActions?: ReactNode;
  onPrimaryClick?: () => void;
  onUpdateClick?: () => void;
  onRemoveClick?: () => void;
}

export function PageHeader({
  title,
  asHeading2 = false,
  primaryLabel = 'Register',
  updateLabel = 'Update',
  removeLabel = 'Remove',
  otherActions = undefined,
  onPrimaryClick = undefined,
  onUpdateClick = undefined,
  onRemoveClick = undefined,
}: PageHeaderProps): JSX.Element {
  return (
    <div className={classNames('flex justify-between items-center gap-2', { 'flex-col lg:flex-row': otherActions })}>
      {!asHeading2 ? <h1>{title}</h1> : <h2>{title}</h2>}
      {(onPrimaryClick || onUpdateClick || onRemoveClick || otherActions) && (
        <div className="flex flex-wrap gap-2">
          {otherActions}
          {onPrimaryClick && (
            <Button
              type="button"
              icon={<IconPlus />}
              label={primaryLabel}
              className="self-start"
              onClick={onPrimaryClick}
            />
          )}
          {onUpdateClick && (
            <Button
              type="button"
              icon={<IconPencil />}
              label={updateLabel}
              className="self-start"
              onClick={onUpdateClick}
            />
          )}
          {onRemoveClick && (
            <Button
              type="button"
              icon={<IconTrash />}
              label={removeLabel}
              severity="danger"
              className="self-start"
              onClick={onRemoveClick}
            />
          )}
        </div>
      )}
    </div>
  );
}
