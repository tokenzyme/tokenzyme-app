## What does this change?

<!-- Describe the change and why it is needed. Link the issue it addresses.
     Screenshots or a short clip help for anything visual. -->

Closes #

## Type of change

- [ ] Bug fix
- [ ] New feature
- [ ] Documentation
- [ ] Tooling / CI

## Scope

- [ ] Touches a transaction-signing flow — **expect closer review**
- [ ] Touches `/tokens/:address/chart`, which `tokenzyme-mobile` embeds in a WebView
- [ ] Requires a matching change in `tokenzyme-core` or `tokenzyme-indexer`

## Checklist

- [ ] `yarn build` passes
- [ ] `yarn lint` passes
- [ ] `yarn format` has been run
- [ ] Configuration is read from `@utils/env`, not `import.meta.env` directly
- [ ] New environment variables are documented in `.env.template` and added to the CI workflow
- [ ] Generated code under `src/generated/` was regenerated rather than hand-edited, and is committed
- [ ] Token-supplied strings are escaped on render and any token-supplied URL has its scheme validated
- [ ] For signing changes: what the UI displays matches exactly what gets signed, and slippage bounds are preserved
- [ ] This is not a security fix (those go through private disclosure — see SECURITY.md)
