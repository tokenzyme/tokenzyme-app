# Tokenzyme App

The web client for **Tokenzyme**, a permissionless token launchpad for EVM chains.
Launch a token, trade it against a bonding curve, watch the price live, and follow it
through to its DEX migration — all from the browser, signing with your own wallet.

Built with React 19, Vite, Apollo Client, ethers and Reown AppKit.

> [!TIP]
> **New to the project?** Start with
> [tokenzyme-core / ARCHITECTURE.md](https://github.com/tokenzyme/tokenzyme-core/blob/main/ARCHITECTURE.md).
> It covers all five Tokenzyme repositories, how data flows between them, and how to
> bring the whole stack up locally. This README covers only the web client.

## Table of contents

- [How it fits together](#how-it-fits-together)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Generated code](#generated-code)
- [Building and deploying](#building-and-deploying)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)

## How it fits together

Reads and writes take different paths, and it is worth being explicit about which is
which.

**Writes go straight to the chain.** Launching a token and buying or selling against
the bonding curve are transactions built here, signed in the user's wallet through
Reown AppKit, and submitted to `VITE_RPC_URL`. The backend is never in that path and
cannot censor, forge or front-run a trade.

**Reads come from the backend.** Token lists, trade history, holders and comments are
queried over GraphQL from [`tokenzyme-core`](https://github.com/tokenzyme/tokenzyme-core),
which serves data materialized by
[`tokenzyme-indexer`](https://github.com/tokenzyme/tokenzyme-indexer).

**Live updates arrive over two WebSockets.** Trades and price changes come from the
indexer on `VITE_INDEXER_URL`; comments come from core on `VITE_CORE_URL`. See
`src/hooks/useSocketEvent.ts`.

This means the app needs **both** backend services running to show anything, but needs
only a wallet and an RPC endpoint to transact.

## Project structure

```
src/
├── app/
│   ├── common/
│   │   ├── components/   shared components (Chart, Trade, …)
│   │   ├── design/       design-system primitives (Dialog, Table, PageHeader, …)
│   │   ├── global/       app-wide UI (Alerts, PageTitle)
│   │   └── graphql/      Apollo cache helpers
│   ├── pages/            one directory per route
│   ├── routeWrappers/    Root (providers, alerts) and App (layout, auth)
│   └── router.tsx        route table
├── generated/            TypeChain bindings and GraphQL types — do not edit
├── hoc/                  withDialog, withSuspenseSpinner
├── hooks/                wallet, balances, contract estimates, socket events
├── styles/               Tailwind entrypoints
└── utils/                env parsing, contract helpers, formatting
```

Pages follow a consistent split: `Foo.tsx` renders, `FooHooks.ts` holds the logic and
data fetching, `FooGql.ts` holds the GraphQL documents, `FooForms.ts` holds validation
schemas. Keep new pages to that shape.

### Routes

| Path | Page |
| --- | --- |
| `/` | Token list |
| `/launch` | Launch a token |
| `/tokens/:address` | Token detail — chart, trades, comments, buy/sell |
| `/tokens/:address/chart` | Bare chart. Rendered inside a WebView by the mobile app — see below. |

> [!IMPORTANT]
> `/tokens/:address/chart` is not decorative. **The Flutter app has no chart of its
> own** — it loads this route in a WebView (`lib/views/token/tabs/info/chart.dart` in
> [`tokenzyme-mobile`](https://github.com/tokenzyme/tokenzyme-mobile)). Changing or
> removing this route breaks charts on mobile.

### Charts

Charts use [Lightweight Charts](https://www.tradingview.com/lightweight-charts/)
(Apache-2.0). `src/app/common/components/Chart/ChartHooks.ts` loads candles from
core's `tradeCandles` query, appends live trades from the indexer WebSocket into the
current bucket, and pages in older history as the user scrolls back.

Two things to know if you touch it:

- The API returns candle `time` in **milliseconds**; Lightweight Charts wants
  **seconds**. The `lastCandleTimestamp` query argument is in seconds.
- `CHART_RESOLUTIONS` must stay in sync with what `TradeService.listTradeCandles`
  accepts in core — it parses these values as minutes, `'1D'` excepted.

## Getting started

Requirements: Node.js 24+ and Corepack.

You also need [`tokenzyme-core`](https://github.com/tokenzyme/tokenzyme-core) and
[`tokenzyme-indexer`](https://github.com/tokenzyme/tokenzyme-indexer) running, and a
chain to point at. The
[architecture guide](https://github.com/tokenzyme/tokenzyme-core/blob/main/ARCHITECTURE.md#running-the-whole-stack-locally)
walks through the full sequence.

```bash
# Enable Corepack to use the Yarn version configured in the project
corepack enable

# Install all dependencies
yarn

# Copy the environment template and fill it in
cp .env.template .env
```

Every variable is documented inline in [`.env.template`](./.env.template) and every
one is required — `src/utils/env.ts` throws at startup if any is missing.

| Variable | Notes |
| --- | --- |
| `VITE_CORE_URL` | GraphQL API and comments WebSocket. |
| `VITE_INDEXER_URL` | Trades and price WebSocket. |
| `VITE_REOWN_PROJECT_ID` | Create your own at [dashboard.reown.com](https://dashboard.reown.com). Free tier is enough. |
| `VITE_NETWORK` | `mainnet`, `testnet`, `testnet-legacy` or `fork`. |
| `VITE_RPC_URL`, `VITE_BLOCK_EXPLORER_URL` | Must match `VITE_NETWORK`. |
| `VITE_LAUNCHPAD_ADDRESS` | The proxy address of **your own** deployment — this project publishes none. See [tokenzyme-contracts](https://github.com/tokenzyme/tokenzyme-contracts#deploying). |

> [!NOTE]
> These are Vite variables: they are read at **build** time and inlined into the
> bundle. Nothing here is secret, because all of it ships to the browser. Never put a
> private key or an API secret in `.env`.

```bash
yarn start:dev       # Vite dev server on http://localhost:3001
yarn lint            # ESLint
yarn format          # Prettier
yarn build           # production build into ../dist
yarn start:preview   # preview the production build
```

> [!NOTE]
> There is no test suite yet. See [CONTRIBUTING.md](./CONTRIBUTING.md#on-tests).

## Generated code

Two directories under `src/generated/` are generated and committed. Never edit them by
hand.

| Directory | Generated by |
| --- | --- |
| `src/generated/graphql` | `yarn graphql:generate` — **requires core running**, since codegen introspects the live schema at `http://localhost:3000/graphql`. |
| `src/generated/typechain` | `yarn contracts:compile` in **tokenzyme-contracts**, which copies the output here. |

> [!IMPORTANT]
> The TypeChain bindings cannot be regenerated from this repository. They are produced
> by `yarn contracts:compile` in
> [`tokenzyme-contracts`](https://github.com/tokenzyme/tokenzyme-contracts), which
> `cp -Rf`s them into `../tokenzyme-app/src/generated/typechain` — so the two
> repositories must be checked out as siblings. If you only need to build the app, the
> committed bindings are enough; you do not need the contracts repository at all.

## Building and deploying

`compose.yaml` builds the image and serves the production bundle on port 3001, joining
the external `tokenzyme` network shared with core and the indexer:

```bash
docker network create tokenzyme
docker compose up -d
```

> [!IMPORTANT]
> The `VITE_*` values are **build** arguments, not runtime environment. Vite inlines
> them into the bundle when the image is built, so changing `.env` requires
> `docker compose build` — restarting the container will not pick it up.

The `Dockerfile` declares those `ARG`s without defaults, on purpose: baking values in
would ship one deployment's configuration to everyone who builds the image. Compose
reads them from `.env` automatically. A plain `docker build` needs a `--build-arg` for
each, and omitting any of them fails the build in `src/utils/env.ts` — which is the
intended behaviour.

`yarn image:build` sources `.env` and forwards the values, so it needs a configured
`.env` to run.

To push an image, set `DOCKER_IMAGE` to your own fully-qualified tag — it defaults to a
bare local `tokenzyme-app:latest`, which is fine locally but is not pushable anywhere.
Log in to your registry first; the scripts do not do it for you.

```bash
export DOCKER_IMAGE=registry.example.com/you/tokenzyme-app:latest
docker login registry.example.com
yarn image:build
yarn image:publish
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). Contributions are welcome — please open an
issue before starting on anything substantial.

## Security

Do **not** open a public issue for a vulnerability. Follow the disclosure process in
[SECURITY.md](./SECURITY.md).

## Related repositories

| Repository | Role |
| --- | --- |
| [tokenzyme-contracts](https://github.com/tokenzyme/tokenzyme-contracts) | The on-chain protocol. |
| [tokenzyme-core](https://github.com/tokenzyme/tokenzyme-core) | GraphQL API. |
| [tokenzyme-indexer](https://github.com/tokenzyme/tokenzyme-indexer) | Indexes contract events; streams live updates. |
| [tokenzyme-app](https://github.com/tokenzyme/tokenzyme-app) | This repository. |
| [tokenzyme-mobile](https://github.com/tokenzyme/tokenzyme-mobile) | Flutter mobile client. Embeds this app's chart route. |

## License

Licensed under the [Apache License 2.0](./LICENSE). See [NOTICE](./NOTICE) for
attribution requirements, including TradingView's for Lightweight Charts.

### Trademarks

The license covers the source code. It does **not** grant rights to the "Tokenzyme"
name, logo, or other brand assets.

### Legal pages

This repository ships **no** Privacy Policy, Terms of Use or account-deletion page.
That is deliberate — those documents describe a specific operator and its data
practices, so they cannot be inherited by a fork.

If you deploy this publicly you are responsible for writing and serving your own. Both
app stores require a reachable Privacy Policy URL for any published app, and Google
Play requires an account-deletion URL from apps that offer accounts. Add the routes to
`src/app/router.tsx`, or host the documents separately.
