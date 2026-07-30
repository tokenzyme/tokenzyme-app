import '@styles/tailwind.css';

import '@fontsource-variable/red-hat-display';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-dark-indigo/theme.css';
import '@styles/global.css';

import { ApolloProvider } from '@apollo/client';
import { Chain, hardhat, sonic, sonicBlazeTestnet } from '@reown/appkit/networks';
import { createAppKit } from '@reown/appkit/react';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai';
import { PrimeReactProvider } from 'primereact/api';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';

import { apolloClient } from './apollo';

import { router } from '@app/router';
import { sonicTestnet } from '@utils/blockchain';
import { NETWORK, REOWN_PROJECT_ID } from '@utils/env';

const queryClient = new QueryClient();

let network: Chain;
if (NETWORK === 'mainnet') {
  network = sonic;
} else if (NETWORK === 'testnet') {
  network = sonicTestnet;
} else if (NETWORK === 'testnet-legacy') {
  network = sonicBlazeTestnet;
} else {
  network = { ...hardhat, id: 1337 };
}

createAppKit({
  projectId: REOWN_PROJECT_ID,
  adapters: [new EthersAdapter()],
  networks: [network],
  defaultNetwork: network,
  features: {
    analytics: true,
    email: false,
    history: false,
    onramp: false,
    pay: false,
    receive: false,
    send: false,
    socials: false,
    swaps: false,
  },
});

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={apolloClient}>
        <PrimeReactProvider
          value={{
            ripple: true,
            pt: {
              card: {
                root: { className: 'border border-slate-800 rounded-xl shadow-sm' },
                title: { className: 'text-lg mb-4 lg:text-xl' },
                content: { className: 'p-0' },
              },
              confirmdialog: {
                message: { className: 'ml-0' },
              },
              dialog: {
                root: { className: 'm-2' },
                content: { className: '!pt-1' },
              },
              divider: { root: { className: 'my-2' } },
              message: { root: { className: 'py-2' } },
              progressspinner: {
                circle: { className: 'stroke-primary stroke-4' },
              },
              toast: {
                root: { className: 'max-w-lg' },
                content: { className: 'border-0' },
                icon: {
                  style: {
                    width: '1.5rem',
                    height: '1.5rem',
                  },
                },
              },
            },
          }}
        >
          <Provider>
            <RouterProvider router={router} />
          </Provider>
        </PrimeReactProvider>
      </ApolloProvider>
    </QueryClientProvider>
  </StrictMode>,
);
