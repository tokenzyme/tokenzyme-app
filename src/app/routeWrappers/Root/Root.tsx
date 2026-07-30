import { ConfirmDialog } from 'primereact/confirmdialog';
import { JSX } from 'react';
import { Outlet } from 'react-router';

import { useDependencies } from './RootHooks';

import { SuspenseSpinner } from '@design/components/SuspenseSpinner';
import { Alerts } from '@global/Alerts';

export function Root(): JSX.Element {
  useDependencies();

  return (
    <>
      <Alerts />
      <ConfirmDialog />
      <SuspenseSpinner>
        <Outlet />
      </SuspenseSpinner>
    </>
  );
}
