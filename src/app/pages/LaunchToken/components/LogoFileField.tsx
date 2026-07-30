import { IconPhoto } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { ChangeEvent, JSX, useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormValues } from '../LaunchTokenForms';

import { useAlert } from '@hooks/useAlert';
import { CORE_URL } from '@utils/env';

// 500 KB
const MAX_FILE_SIZE = 500 * 1024;
const VALID_FILE_TYPES = ['image/jpeg', 'image/png'];

export function LogoFileField(): JSX.Element {
  const { showError } = useAlert();
  const form = useFormContext<FormValues>();

  const [logoUrl, setLogoUrl] = useState<string | undefined>();

  const inputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: processLogoMutation } = useMutation({
    mutationFn: async (file: File): Promise<Blob> => {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch(`${CORE_URL}/images/processTokenLogo`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Failed to process image');
      }

      return res.blob();
    },
  });

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    if (!VALID_FILE_TYPES.includes(file.type)) {
      showError('Only JPG or PNG files are supported');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      showError('The image size must not exceed 500 KB');
      return;
    }

    if (logoUrl) {
      URL.revokeObjectURL(logoUrl);
    }

    const blob = await processLogoMutation(file);

    setLogoUrl(URL.createObjectURL(blob));
    form.setValue('logoBlob', blob);
    await form.trigger('logoBlob');
  };

  const handleButtonClick = (): void => {
    inputRef.current?.click();
  };

  useEffect(() => {
    const logoBlob = form.getValues('logoBlob');
    if (logoBlob) {
      setLogoUrl(URL.createObjectURL(logoBlob));
    }
  }, [form]);

  return (
    <div className="w-fit relative">
      <Avatar
        image={logoUrl}
        className={classNames('w-32 h-32', {
          'border border-red-300': Object.keys(form.formState.touchedFields).length && !logoUrl,
        })}
        pt={{ image: { className: 'rounded-md' } }}
      />
      <Button
        type="button"
        icon={<IconPhoto />}
        size="small"
        rounded
        className="absolute bottom-0 right-0"
        onClick={handleButtonClick}
      />
      <input ref={inputRef} type="file" accept=".jpg,.jpeg,.png" className="hidden" onChange={handleFileChange} />
    </div>
  );
}
