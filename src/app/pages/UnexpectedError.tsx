import { ApolloError } from '@apollo/client';
import { IconMeteor } from '@tabler/icons-react';
import { JSX } from 'react';
import { Navigate, useRouteError } from 'react-router';

export function UnexpectedError(): JSX.Element {
  const error = useRouteError();

  if (error instanceof ApolloError && (error.message === 'unauthorized' || error.message === 'session_expired')) {
    return <Navigate to="/tzm/logout" />;
  }

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <IconMeteor size={80} />
      <h1 className="mt-4">An unexpected error occurred</h1>
    </div>
  );
}
