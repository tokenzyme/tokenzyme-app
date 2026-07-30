import { IconError404 } from '@tabler/icons-react';
import { JSX } from 'react';

export function NotFound(): JSX.Element {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <IconError404 size={80} />
      <h1 className="mt-4">Page Not Found</h1>
    </div>
  );
}
