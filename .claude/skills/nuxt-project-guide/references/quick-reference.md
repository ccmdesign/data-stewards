# Quick Reference: Common Update Patterns

This document provides quick lookups for common updates to the Nuxt UI landing page project.

## Content Updates

### Update Hero Section
- **Edit**: `content/index.yml` → `hero:` section
- **Schema**: `content.config.ts` → `hero: z.object({...})`
- **Component**: `app/pages/index.vue` → `<UPageHero>`
- **No restart needed**: Content hot-reloads automatically

### Update Section Content
- **Edit**: `content/index.yml` → `section:`, `features:`, `steps:`, `pricing:`, `testimonials:`, or `cta:`
- **Schema**: `content.config.ts` → corresponding schema definition
- **Component**: `app/pages/index.vue` → corresponding `<UPageSection>` or component
- **No restart needed**: Content hot-reloads automatically

### Update SEO Metadata
- **Edit**: `content/index.yml` → `seo:` section at top
- **Override location**: `app/pages/index.vue` → `useSeoMeta()` call
- **Global defaults**: `app/app.vue` → `useSeoMeta()` call
- **No restart needed**: Content hot-reloads automatically

## Visual Design Updates

### Change Primary Color
- **Edit**: `app/app.config.ts` → `colors.primary`
- **Restart required**: Yes - `app.config.ts` changes require dev server restart
- **Available colors**: Any Tailwind color name or custom color

### Update Dark/Light Mode Images
- **Add images**: `public/images/light/` and `public/images/dark/`
- **Reference**: Use `<UColorModeImage light="..." dark="..." />`
- **No restart needed**: Images hot-reload automatically

### Update Global Styles
- **Edit**: `app/assets/css/main.css`
- **No restart needed**: CSS hot-reloads automatically

## Schema & Structure Updates

### Add New Content Section
1. **Define schema**: `content.config.ts` → Add to main schema object
2. **Add content**: `content/index.yml` → Add section data
3. **Render component**: `app/pages/index.vue` → Add rendering logic
4. **Restart required**: Yes - Schema changes require dev server restart

### Update Content Validation Rules
- **Edit**: `content.config.ts` → Modify Zod schemas
- **Restart required**: Yes - Schema changes require dev server restart
- **Test**: Validation errors appear in terminal on save

### Add New Link/Button Schema Fields
- **Edit**: `content.config.ts` → `createLinkSchema()` function
- **Update content**: `content/index.yml` → Add new field to links
- **Restart required**: Yes - Schema changes require dev server restart

## Component Updates

### Update Header Navigation
- **Edit**: `app/components/AppHeader.vue`
- **Navigation items**: Defined in `items` computed property
- **Scroll spy**: Uses `useScrollspy()` composable
- **No restart needed**: Components hot-reload automatically

### Update Footer Links
- **Edit**: `app/components/AppFooter.vue`
- **Links structure**: Defined in `columns` array
- **Newsletter**: Form is UI-only (no backend integration)
- **No restart needed**: Components hot-reload automatically

### Update Logo
- **Edit**: `app/components/AppLogo.vue`
- **Usage**: Referenced in `AppHeader.vue`
- **No restart needed**: Components hot-reload automatically

## Configuration Updates

### Update Nuxt Modules
- **Edit**: `nuxt.config.ts` → `modules` array
- **Install**: Run `pnpm install <module-name>`
- **Restart required**: Yes - Always restart after config changes

### Update Build/Prerender Config
- **Edit**: `nuxt.config.ts` → `nitro.prerender.routes`
- **Restart required**: Yes - Build config requires restart
- **Test**: Run `pnpm build` to verify

### Update ESLint Rules
- **Edit**: `nuxt.config.ts` → `eslint.config.stylistic`
- **Run linter**: `pnpm lint`
- **Restart required**: Yes - Config changes require restart

## File Locations Cheat Sheet

| What | Where |
|------|-------|
| All page content | `content/index.yml` |
| Content schemas | `content.config.ts` |
| Homepage rendering | `app/pages/index.vue` |
| Root layout | `app/app.vue` |
| UI color config | `app/app.config.ts` |
| Nuxt config | `nuxt.config.ts` |
| Header component | `app/components/AppHeader.vue` |
| Footer component | `app/components/AppFooter.vue` |
| Global styles | `app/assets/css/main.css` |
| Dark mode images | `public/images/dark/` |
| Light mode images | `public/images/light/` |

## Data Flow Patterns

### Content → Display Flow
```
content/index.yml
  ↓ (validated by)
content.config.ts (Zod schema)
  ↓ (queried by)
app/pages/index.vue (queryCollection)
  ↓ (passed to)
Nuxt UI Components (UPageHero, etc.)
  ↓ (rendered as)
HTML in browser
```

### When to Restart Dev Server
- **YES**: Changes to `nuxt.config.ts`, `app.config.ts`, `content.config.ts`, `package.json`
- **NO**: Changes to `.vue` files, `.yml` content files, `.css` files, images

## Common Gotchas

1. **Schema changes require restart** - Always restart dev server after modifying `content.config.ts`
2. **Content must match schema** - YAML content is validated against Zod schemas; validation errors appear in terminal
3. **MDC syntax for styled text** - Use `[text]{.class-name}` in YAML for inline styling
4. **Color mode images need both variants** - Always provide both light and dark versions
5. **Navigation IDs must match** - Header navigation anchors (`#features`) must match section IDs in page
6. **Trailing commas removed by ESLint** - Project configured with `commaDangle: 'never'`
7. **One true brace style** - Project configured with `braceStyle: '1tbs'`

## Quick Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Run ESLint
pnpm typecheck    # Run TypeScript checks
```
