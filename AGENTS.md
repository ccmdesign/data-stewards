# Repository Guidelines

You are assisting on the Nuxt UI Boilerplate project. Obey this lookup order every time you need context:

1. Search the project knowledge base under `_docs/` (start with `_docs/llm/` and its subdirectories). Treat these files as the primary, canonical source.
2. Only if `_docs/` has no relevant guidance, fall back to Context7 queries for Nuxt UI or other external references.

Always document which source you used when you respond, so humans can follow the trail.



## Project Structure & Module Organization
Core Nuxt code lives in `app/`, with views under `app/pages`, shared layouts in `app/layouts`, and UI pieces in `app/components`. Reusable logic should be placed in `app/composables` or `app/utils`; TypeScript contracts live in `app/types`. Markdown-driven sections such as news or community updates belong in `content/`, while static assets (favicons, fonts) are stored in `public/`. End-to-end ready fixtures and Vitest specs currently sit in `test/`, mirroring the related utility or module tree.

## Build, Test, and Development Commands
Use `pnpm install` to sync dependencies (lockfiles for npm/pnpm are checked in, but pnpm is canonical). Run `pnpm dev` for a Vite-powered dev server on `localhost:3000`. Ship-ready builds use `pnpm build`, and `pnpm preview` smoke-tests the production bundle. Quality gates include `pnpm lint` (ESLint + Nuxt rules), `pnpm typecheck` (Nuxt type generation), and `pnpm test` (Vitest) before any PR.

## Coding Style & Naming Conventions
Prefer `<script setup lang="ts">` single-file components, two-space indentation, and PascalCase component names that match their filenames. Keep composables prefixed with `use`, utilities in camelCase, and content slugs kebab-cased (e.g., `content/news/2024-vision.md`). ESLint runs with the generated Nuxt config; rely on editor integrations plus `pnpm lint` to autofix when possible.

## Testing Guidelines
Vitest is configured for unit-level coverage; place specs in `test/<area>/<feature>.spec.ts` and mirror the source directory to ease navigation. Name tests with behavior-focused strings (`"returns default offerings when cache misses"`). Run `pnpm test --runInBand` when diagnosing flaky suites, and aim to cover edge cases around content loading and composable return values.

## Commit & Pull Request Guidelines
Recent history favors short, imperative commit subjects (e.g., `content normalization`). Keep body text optional but use it to explain migrations or data changes. Every PR should describe the change, reference any GitHub issue, list manual test steps (`pnpm dev`, `pnpm test`), and attach UI screenshots or links when the update affects visuals. Request review from at least one Nuxt maintainer before merging.
