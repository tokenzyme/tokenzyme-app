import { IconBrandReddit, IconBrandTelegram, IconBrandX, IconVocabulary, IconWallet } from '@tabler/icons-react';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { JSX } from 'react';
import { Link, Outlet } from 'react-router';

import { useDependencies } from './AppHooks';

import { ConnectWalletButton } from '@components/ConnectWalletButton';
import { SuspenseSpinner } from '@design/components/SuspenseSpinner';
import { formatAccountAddress } from '@utils/blockchain';

export function App(): JSX.Element {
  const {
    account,
    handlers: { handleAccountClick },
  } = useDependencies();

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col grow w-full">
        <header className="shrink-0 border-b border-slate-800 py-3 px-4 md:px-8">
          <div className="flex flex-wrap justify-between items-center">
            <Link to="/" className="text-xl font-bold">
              Tokenzyme
            </Link>
            <div>
              <a href="https://tokenzyme.gitbook.io/tokenzyme" target="_blank" rel="noreferrer">
                <Button type="button" icon={<IconVocabulary />} label="Docs" severity="secondary" size="small" text />
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/launch">
                <Button type="button" label="Launch a Token" size="small" />
              </Link>
              {!account && <ConnectWalletButton isSmall />}
              {account && (
                <Card
                  pt={{
                    body: { className: 'pl-1 pr-1 lg:pr-2 py-1' },
                    root: { className: 'border-0 lg:border !rounded-full' },
                  }}
                  onClick={handleAccountClick}
                >
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Avatar icon={<IconWallet size={20} />} shape="circle" className="bg-primary text-white" />
                    <span className="hidden lg:block">{formatAccountAddress(account.address)}</span>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </header>
        <main className="grow pt-6 px-4 md:px-8 2xl:px-56 xl:px-36">
          <SuspenseSpinner>
            <Outlet />
          </SuspenseSpinner>
        </main>
        <footer className="flex flex-wrap justify-between items-center gap-2 text-secondary py-3 px-4 md:px-8">
          <span>© Tokenzyme 2025</span>
          <span className="flex items-center">
            <span>Follow us:</span>
            <a href="https://x.com/tokenzyme" target="_blank" rel="noreferrer">
              <Button type="button" icon={<IconBrandX />} severity="secondary" size="small" text rounded />
            </a>
            <a href="https://t.me/tokenzyme" target="_blank" rel="noreferrer">
              <Button type="button" icon={<IconBrandTelegram />} severity="secondary" size="small" text rounded />
            </a>
            <a href="https://reddit.com/r/tokenzyme" target="_blank" rel="noreferrer">
              <Button type="button" icon={<IconBrandReddit />} severity="secondary" size="small" text rounded />
            </a>
          </span>
        </footer>
      </div>
    </div>
  );
}
