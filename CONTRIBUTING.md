# Contributing to Tokenzyme App

Thanks for taking the time to contribute. This document covers how to get set up,
what we expect from a change, and how to get it merged.

By participating you agree to abide by the [Code of Conduct](./CODE_OF_CONDUCT.md).

## Before you start

Read the
[architecture guide](https://github.com/tokenzyme/tokenzyme-core/blob/main/ARCHITECTURE.md)
first if you have not. This client depends on two backend services and consumes
generated code from the contracts repository — none of which is obvious from the
source alone.

Open an issue first for anything beyond a typo or an obvious bug fix.

Good first contributions:

- tests (there are none yet — see below);
- accessibility fixes;
- a Content-Security-Policy and other hardening from
  [SECURITY.md](./SECURITY.md#deployment-notes);
- bundle-size work — the main chunk is currently over 3 MB and code-splitting would
  help;
- documentation.

**Found a vulnerability?** Do not open an issue or a PR. Follow the private
disclosure process in [SECURITY.md](./SECURITY.md).

## Development setup

Requirements: Node.js 24+ and Corepack.

You also need `tokenzyme-core` and `tokenzyme-indexer` running against a chain. The
architecture guide has the
[full sequence](https://github.com/tokenzyme/tokenzyme-core/blob/main/ARCHITECTURE.md#running-the-whole-stack-locally);
pointing everything at Sonic testnet is the quickest useful setup.

```bash
corepack enable
yarn
cp .env.template .env   # then fill it in — every variable is documented inline
yarn start:dev          # http://localhost:3001
```

You do **not** need the contracts repository checked out. The TypeChain bindings in
`src/generated/typechain` are committed.

```bash
yarn lint     # ESLint
yarn format   # Prettier
yarn build    # production build
```

## Making a change

1. Fork the repository and branch off `main`.
2. Make your change. Keep it focused — one concern per pull request.
3. Run `yarn build`, `yarn lint` and `yarn format` before pushing.
4. Open a pull request describing what changed and why. Screenshots help for anything
   visual.

### Coding conventions

- ESLint (Airbnb + strict type-checked) and Prettier are enforced. Run them.
- **No default exports** — `import/no-default-export` is on, with `vite.config.ts`
  and `codegen.ts` as deliberate exceptions.
- Explicit return types are required, including on inline callbacks.
- Use the path aliases (`@components/*`, `@design/*`, `@hooks/*`, `@utils/*`,
  `@graphql`, `@typechain`, …) rather than deep relative paths.
- Follow the existing page shape: `Foo.tsx` renders, `FooHooks.ts` holds logic and
  data fetching, `FooGql.ts` holds GraphQL documents, `FooForms.ts` holds validation
  schemas. Components stay thin.
- Read configuration from `@utils/env`, never `import.meta.env` directly — that is
  where the required-variable checks live.
- Styling is Tailwind, with PrimeReact for complex widgets. Reuse `@design/components`
  before adding a new primitive.

### Working on signing flows

Anything that builds a transaction deserves extra care, because a bug there costs
users real money.

- What the user sees before signing must match exactly what gets signed — recipient,
  amount, token, contract address.
- Never derive a contract address, chain ID or RPC endpoint from page input. Those
  come from `@utils/env` at build time.
- Preserve slippage bounds. `useEstimateAmountOut` and `useEstimateEthToBuyTokens`
  exist so the minimum-out passed on-chain is explicit.
- Token metadata is attacker-controlled. Never render it as HTML, and validate the
  scheme on any token-supplied URL before following it.

### Generated code

`src/generated/` is generated and committed. Never hand-edit it.

- `src/generated/graphql` — `yarn graphql:generate`. **Requires core running**; the
  codegen introspects the live schema. Commit the output with your change.
- `src/generated/typechain` — produced by `yarn contracts:compile` in
  **tokenzyme-contracts**, which copies it here. It cannot be regenerated from this
  repository.

### Two coupling points to keep in mind

**The mobile app embeds our chart route.** `tokenzyme-mobile` has no chart of its
own — it loads `/tokens/:address/chart` in a WebView. Changing the route path, or
breaking that page, breaks charts on mobile. Flag it in your PR if you touch it.

**Chart resolutions must match the API.** `CHART_RESOLUTIONS` in
`ChartHooks.ts` mirrors what `TradeService.listTradeCandles` accepts in core. Adding a
value here without adding it there produces an empty chart.

### On tests

This repository has no test suite. That is a gap, not a policy. A PR that establishes
one — even covering a single hook — is very welcome, and worth opening an issue to
discuss the approach first.

## Dependencies

Dependabot opens **one grouped pull request per ecosystem, once a month**, containing
every minor and patch bump. Review it, check CI, merge.

**Major bumps are ignored by configuration and are the developer's job.** A major is a
migration: bumping the version in the manifest does none of the work, it just turns the
build red. When you want one, do it deliberately — read the upstream migration guide,
change the code it requires, and land it as its own reviewed pull request:

```bash
yarn up <package>@<version>
yarn build && yarn lint
```

Two things that still get through, on purpose or by accident:

- **Security updates ignore this policy**, which is intended. If a vulnerability's only
  fix is in a major, Dependabot proposes it regardless. Nothing merges itself — it
  arrives as a pull request, CI runs on it, and a human decides.
- **Packages below `1.0`.** Semver says any `0.x` bump may break, but Dependabot
  classifies `0.20 -> 0.21` as a minor, so it lands in the grouped PR. Give those
  entries a closer look than the rest.

## Review

A maintainer will review your PR. Expect closer scrutiny on anything touching a
signing flow. Please be patient, and be prepared to justify design decisions.

## License

By contributing, you agree that your contributions are licensed under the
[Apache License 2.0](./LICENSE) that covers this project.
