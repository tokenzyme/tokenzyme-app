import { JSX } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router';

import { Home } from './pages/Home';
import { LaunchToken } from './pages/LaunchToken';
import { NotFound } from './pages/NotFound';
import { Token } from './pages/Token';
import { TokenChart } from './pages/TokenChart';
import { UnexpectedError } from './pages/UnexpectedError';
import { App } from './routeWrappers/App';
import { Root } from './routeWrappers/Root';

import { PageTitle } from '@global/PageTitle';

const withPageTitle = (component: JSX.Element, pageTitle?: string): JSX.Element => {
  return (
    <>
      <PageTitle title={pageTitle} />
      {component}
    </>
  );
};

const errorElement = withPageTitle(<UnexpectedError />, 'Error');

const routes = createRoutesFromElements(
  <Route path="/" element={<Root />} errorElement={errorElement}>
    <Route element={<App />}>
      <Route index element={withPageTitle(<Home />, 'Home')} />
      <Route path="launch" element={withPageTitle(<LaunchToken />, 'Launch a Token')} />
      <Route path="tokens/:address" element={withPageTitle(<Token />, 'Token')} />
    </Route>
    <Route path="tokens/:address/chart" element={withPageTitle(<TokenChart />, 'Token Chart')} />
    <Route path="*" element={withPageTitle(<NotFound />, 'Page Not Found')} />
  </Route>,
);

export const router = createBrowserRouter(routes);
