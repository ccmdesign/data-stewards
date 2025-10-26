# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Nuxt 4 landing page template built with Nuxt UI (v4). It's designed as a modern, content-driven landing page boilerplate with strong emphasis on visual design using SVG decorative elements and a content-first architecture.

**Key Technologies:**
- Nuxt 4 (SSR/SSG framework)
- Nuxt UI v4 (component library)
- Nuxt Content v3 (content management via YAML)
- TypeScript
- pnpm (package manager - required)

## Development Commands

```bash
# Install dependencies (required: pnpm)
pnpm install

# Start development server (http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Preview production build locally
pnpm preview

# Run ESLint
pnpm lint

# Run TypeScript type checking
pnpm typecheck
```

## Architecture

### Content-Driven Design

The entire landing page is content-driven through a **single YAML file** (`content/index.yml`) that defines all page sections:
- Hero section with CTAs
- Feature sections
- Step-by-step guides
- Pricing plans
- Testimonials
- Final CTA

**Content Schema:** `content.config.ts` defines strict Zod schemas for content validation. All content structures (links, features, pricing plans, testimonials) have strongly-typed schemas that must be followed when modifying content.

### Page Structure

- **Root Layout:** `app/app.vue` sets up the main layout with header, footer, and SEO meta tags
- **Home Page:** `app/pages/index.vue` queries the content collection and renders all landing page sections
- **Components:** Reusable components in `app/components/` including:
  - `AppHeader.vue` - Main navigation header
  - `AppFooter.vue` - Footer with links
  - `HeroBackground.vue`, `StarsBg.vue` - Decorative background elements
  - `AppLogo.vue` - Logo component
  - `TemplateMenu.vue` - Template navigation menu

### Visual Design System

The template heavily uses **decorative SVG line elements** (`/images/light/` and `/images/dark/`) that adapt to color mode. These are positioned absolutely and used throughout sections for visual interest.

### ESLint Configuration

Custom stylistic rules in `nuxt.config.ts`:
- `commaDangle: 'never'` - No trailing commas
- `braceStyle: '1tbs'` - One true brace style

## Important Patterns

### Content Queries
Use `queryCollection('content').first()` to fetch the main page content from `index.yml`.

### Color Mode
Color mode is managed via Nuxt UI's `useColorMode()` composable. All color-adaptive elements use `UColorModeImage` component.

### SEO
SEO meta tags are set in two places:
1. Global defaults in `app/app.vue`
2. Page-specific overrides using `useSeoMeta()` in pages

### Markdown in Content
Content supports inline markdown with special syntax like `[text]{.text-primary}` for styled text within YAML content, rendered via the `<MDC>` component.

## Nuxt Configuration

- **Modules:** ESLint, Image optimization, Nuxt UI, Nuxt Content
- **Prerendering:** Configured to prerender `/` route for static generation
- **CSS:** Main stylesheet at `assets/css/main.css`
- **MDC Highlighting:** Enabled with API route support

## Deployment

The template is optimized for static generation. The build process prerenders the home route, making it ready for deployment to static hosting platforms (Vercel, Netlify, etc.).

## Claude Instructions

- The user is already familiar with Claude Skills. Do not explain what they are or how they work.
