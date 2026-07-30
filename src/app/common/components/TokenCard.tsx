import {
  IconBrandDiscord,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandReddit,
  IconBrandTelegram,
  IconBrandX,
  IconCopy,
  IconLink,
  IconWorld,
} from '@tabler/icons-react';
import { Avatar } from 'primereact/avatar';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Tooltip } from 'primereact/tooltip';
import { JSX } from 'react';

import { useAlert } from '@hooks/useAlert';
import { formatAddress } from '@utils/blockchain';
import { BLOCK_EXPLORER_URL } from '@utils/env';

export interface Token {
  address?: string | null;
  name: string;
  symbol: string;
  description: string;
  logoUrl: string;
  websiteUrl?: string | null;
  socialMedia?: {
    xUrl?: string | null;
    telegramUrl?: string | null;
    discordUrl?: string | null;
    redditUrl?: string | null;
    facebookUrl?: string | null;
    instagramUrl?: string | null;
  } | null;
}

interface TokenCardProps {
  token: Token;
}

export function TokenCard({ token }: TokenCardProps): JSX.Element {
  const { showInfo } = useAlert();

  const handleCopyAddressClick = async (): Promise<void> => {
    if (token.address) {
      await navigator.clipboard.writeText(token.address);
      showInfo('Contract address copied to clipboard');
    }
  };

  return (
    <section id={`token-${token.address}`}>
      <Card>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <Avatar image={token.logoUrl} className="w-24 h-24 shrink-0" pt={{ image: { className: 'rounded-md' } }} />
            <div className="flex flex-col gap-2">
              <h2>{token.name}</h2>
              <span className="text-sm text-secondary font-bold">{token.symbol.toUpperCase()}</span>
              {(token.websiteUrl ||
                token.socialMedia?.xUrl ||
                token.socialMedia?.telegramUrl ||
                token.socialMedia?.discordUrl ||
                token.socialMedia?.redditUrl ||
                token.socialMedia?.facebookUrl ||
                token.socialMedia?.instagramUrl) && (
                <div className="flex flex-wrap items-center gap-2">
                  {token.websiteUrl && (
                    <a
                      href={token.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="tooltip"
                      data-pr-tooltip="Website"
                      data-pr-position="top"
                    >
                      <IconWorld size={18} />
                    </a>
                  )}
                  {token.socialMedia?.xUrl && (
                    <a
                      href={token.socialMedia.xUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="tooltip"
                      data-pr-tooltip="X"
                      data-pr-position="top"
                    >
                      <IconBrandX size={18} />
                    </a>
                  )}
                  {token.socialMedia?.telegramUrl && (
                    <a
                      href={token.socialMedia.telegramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="tooltip"
                      data-pr-tooltip="Telegram"
                      data-pr-position="top"
                    >
                      <IconBrandTelegram size={18} />
                    </a>
                  )}
                  {token.socialMedia?.discordUrl && (
                    <a
                      href={token.socialMedia.discordUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="tooltip"
                      data-pr-tooltip="Discord"
                      data-pr-position="top"
                    >
                      <IconBrandDiscord size={18} />
                    </a>
                  )}
                  {token.socialMedia?.redditUrl && (
                    <a
                      href={token.socialMedia.redditUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="tooltip"
                      data-pr-tooltip="Reddit"
                      data-pr-position="top"
                    >
                      <IconBrandReddit size={18} />
                    </a>
                  )}
                  {token.socialMedia?.facebookUrl && (
                    <a
                      href={token.socialMedia.facebookUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="tooltip"
                      data-pr-tooltip="Facebook"
                      data-pr-position="top"
                    >
                      <IconBrandFacebook size={18} />
                    </a>
                  )}
                  {token.socialMedia?.instagramUrl && (
                    <a
                      href={token.socialMedia.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="tooltip"
                      data-pr-tooltip="Instagram"
                      data-pr-position="top"
                    >
                      <IconBrandInstagram size={18} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
          <div>{token.description}</div>
          {token.address && (
            <>
              <Divider className="my-0" />
              <div className="flex justify-between items-center gap-1">
                <span>Contract address: {formatAddress(token.address)}</span>
                <div className="flex items-center gap-1">
                  <IconCopy size={18} className="cursor-pointer" onClick={handleCopyAddressClick} />
                  <a href={`${BLOCK_EXPLORER_URL}/token/${token.address}`} target="_blank" rel="noreferrer">
                    <IconLink size={18} />
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </Card>
      <Tooltip target={`#token-${token.address} .tooltip`} />
    </section>
  );
}
