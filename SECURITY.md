# Security Policy

## Reporting a vulnerability

**Do not open a public issue, pull request or discussion for a security
vulnerability.**

Report it through GitHub's [private vulnerability reporting](https://github.com/tokenzyme/tokenzyme-app/security/advisories/new)
— the **Security** tab, then **Report a vulnerability**. That opens a private
advisory only you and the maintainers can see.

Please include a description of the issue, its impact, and steps to reproduce.

### What to expect

| Stage | Target |
| --- | --- |
| Acknowledgement of your report | 72 hours |
| Initial assessment and severity triage | 7 days |
| Status update cadence while we work on a fix | every 7 days |

We will credit you in the advisory unless you ask us not to. There is no formal bug
bounty program at this time.

If the vulnerability is in the smart contracts rather than this client, report it
through [tokenzyme-contracts](https://github.com/tokenzyme/tokenzyme-contracts/blob/main/SECURITY.md)
instead — that is where the funds are.

## Supported versions

Only the `main` branch receives security fixes. There are no long-term support
branches.

## What matters most in a wallet-facing client

This app builds transactions that users sign with their own keys. That makes a
narrow set of bugs unusually serious, and a wide set of bugs comparatively harmless.

**High severity — report these.** Anything that could cause a user to sign something
other than what the interface showed them:

- a transaction built with a different recipient, amount, token or contract address
  than the UI displayed;
- slippage bounds or deadlines not applied, or applied to the wrong value;
- the launchpad address, chain ID or RPC endpoint being influenced by page input
  rather than by build-time configuration;
- injected content reaching a signing flow — token metadata is attacker-controlled
  (see below).

**Not a vulnerability here.** The API serving wrong data is a
[core](https://github.com/tokenzyme/tokenzyme-core/blob/main/SECURITY.md) or
[indexer](https://github.com/tokenzyme/tokenzyme-indexer/blob/main/SECURITY.md)
concern. A trade settling unfavourably on-chain is a
[contracts](https://github.com/tokenzyme/tokenzyme-contracts/blob/main/SECURITY.md)
concern.

## Trust model

**This client holds no keys and no secrets.** Signing happens in the user's wallet
through Reown AppKit. The app never sees a private key or a seed phrase, and there is
no server-side component in this repository.

**Everything in the bundle is public.** `VITE_*` variables are inlined at build time
and shipped to the browser. They are configuration, not credentials. Anyone can read
`VITE_REOWN_PROJECT_ID` out of a deployed bundle — that is expected, and it is why
the Reown project ID is scoped by allowlisted domains rather than kept secret. Never
add a value to `.env` that would be harmful to disclose.

**Token metadata is attacker-controlled.** Names, symbols, descriptions, logo URLs
and social links come from whoever launched the token on-chain, where only lengths
and URL prefixes are validated. Impersonating an existing project is trivial and
nothing upstream prevents it. Treat all of it as untrusted:

- never render it with `dangerouslySetInnerHTML`;
- never pass a token-supplied URL to `window.open` or a link without checking the
  scheme — `javascript:` and `data:` URLs are the obvious hazards;
- do not assume a logo URL points at an image.

**The API is not authoritative about the chain.** Prices, balances and trade history
are read from core. A compromised backend can display false numbers. Anything the
user is about to *sign* should be derived from on-chain state or from values the user
entered — not from an API response.

## Deployment notes

- **Serve over HTTPS.** Wallet connections and the WebSocket upgrades both depend on
  a secure context.
- **Set a Content-Security-Policy.** There is none configured in this repository.
  Given that the app renders attacker-controlled strings, a CSP is a meaningful
  second line of defence.
- **Supply every `VITE_*` build argument.** The `Dockerfile` declares them without
  defaults, so the build fails loudly rather than silently inheriting someone else's
  configuration. Use your own Reown project ID — it is scoped to an account and its
  allowlisted domains.
- **Set `CORS_ORIGIN` on core and the indexer** to this app's origin. Left unset in
  development, they accept any origin.
