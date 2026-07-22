# GAHMEH Non-Profit — Credit Section

This repository contains the Credit Bar feature for the GAHMEH Non-Profit sector.

## Files

- `src/components/CreditBar.jsx` — Fixed top bar showing real-time credit balance and usage.
- `base44/functions/get-credit-usage/entry.ts` — Backend function that fetches credit data from the Base44 Monitoring API.

## Required Secrets

The backend function requires these environment secrets:

- `WORKSPACE_API_KEY` — API key for the Base44 Monitoring API
- `WORKSPACE_ID` — Workspace ID for analytics lookup

## Integration

1. Place `CreditBar.jsx` in your project's `src/components/` directory.
2. Place `entry.ts` in `base44/functions/get-credit-usage/`.
3. Import and render `<CreditBar />` in your layout, above the navbar.
4. Ensure the `WORKSPACE_API_KEY` and `WORKSPACE_ID` secrets are configured.
