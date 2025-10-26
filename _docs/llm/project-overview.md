# Project Overview: Nuxt UI Landing Page Boilerplate

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [How Nuxt Builds Pages](#how-nuxt-builds-pages)
3. [Layout System](#layout-system)
4. [Nuxt Content Integration](#nuxt-content-integration)
5. [Component Architecture](#component-architecture)
6. [Visual Design System](#visual-design-system)
7. [Configuration & Build](#configuration--build)
8. [Data Flow](#data-flow)

---

## Architecture Overview

This is a **single-page landing page** built with Nuxt 4 and Nuxt UI v4. The entire application is content-driven, with all page content defined in a single YAML file (`content/index.yml`) that gets validated and rendered through a sophisticated component system.

### Tech Stack
- **Nuxt 4** - Meta-framework (SSR/SSG)
- **Nuxt UI v4** - Component library built on top of Radix Vue
- **Nuxt Content v3** - File-based CMS with YAML/Markdown support
- **TypeScript** - Type safety throughout
- **pnpm** - Package manager (required)

### Key Dependencies
```json
{
  "@nuxt/content": "^3.7.1",     // Content management
  "@nuxt/ui": "^4.0.1",           // UI component library
  "@nuxt/image": "^1.11.0",       // Image optimization
  "@iconify-json/lucide": "^1.2.70",          // Icon sets
  "@iconify-json/simple-icons": "^1.2.54"
}
```

---

## How Nuxt Builds Pages

### File-Based Routing
Nuxt uses a file-based routing system where files in the `app/pages/` directory automatically become routes:

```
app/pages/
  └── index.vue  → Routes to "/"
```

In this project, we only have `index.vue`, making it a true single-page application.

### Build Process
1. **Development** (`pnpm dev`):
   - Nuxt starts dev server at http://localhost:3000
   - Hot Module Replacement (HMR) enabled
   - Content files watched for changes

2. **Production Build** (`pnpm build`):
   - Static Site Generation (SSG) mode
   - Prerenders `/` route (configured in `nuxt.config.ts`)
   - Outputs to `.output/` directory
   - All assets optimized and bundled

3. **Preview** (`pnpm preview`):
   - Serves the production build locally
   - Tests SSG output before deployment

### Rendering Strategy
This project uses **Static Site Generation (SSG)**:
- Pages are pre-rendered at build time
- Content is fetched during build, not runtime
- Results in static HTML files served via CDN
- Perfect for landing pages with infrequent content changes

---

## Layout System

### Root Layout (`app/app.vue`)

The root layout wraps the entire application and defines:

```vue
<template>
  <UApp :toaster="{ expand: false }">
    <AppHeader />
    <UMain>
      <NuxtPage />  <!-- Pages render here -->
    </UMain>
    <AppFooter />
  </UApp>
</template>
```

**Key Responsibilities:**
1. **Global Meta Tags** - Sets viewport, theme-color, favicon, language
2. **SEO Defaults** - OG images, Twitter cards
3. **Color Mode** - Manages dark/light theme
4. **Layout Structure** - Header → Content → Footer

### How Layouts Work in Nuxt

```
┌─────────────────────────────┐
│      app.vue (Root)         │
│  ┌───────────────────────┐  │
│  │   AppHeader           │  │
│  ├───────────────────────┤  │
│  │   UMain               │  │
│  │  ┌─────────────────┐  │  │
│  │  │  <NuxtPage />   │  │  │  ← index.vue renders here
│  │  └─────────────────┘  │  │
│  ├───────────────────────┤  │
│  │   AppFooter           │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

- `<NuxtPage />` is a Nuxt component that renders the current page
- It acts as a slot where page components are dynamically loaded
- In this project, it always renders `app/pages/index.vue`

---

## Nuxt Content Integration

### Content as Data

Nuxt Content transforms YAML/Markdown files into queryable data. This project uses a **single YAML file** as the content source.

#### File Structure
```
content/
  └── index.yml  → All landing page content
```

#### Content Schema (`content.config.ts`)

Uses **Zod** for runtime validation:

```typescript
export const collections = {
  content: defineCollection({
    source: 'index.yml',     // Source file
    type: 'page',            // Collection type
    schema: z.object({       // Validation schema
      hero: z.object({...}),
      section: z.object({...}),
      features: z.object({...}),
      steps: z.object({...}),
      pricing: z.object({...}),
      testimonials: z.object({...}),
      cta: z.object({...})
    })
  })
}
```

**Benefits of Schema Validation:**
- Type safety at runtime and compile time
- Editor autocomplete for content files
- Validation errors before deployment
- Clear content structure documentation

#### Querying Content

In `app/pages/index.vue`:

```vue
<script setup lang="ts">
const { data: page } = await useAsyncData(
  'index',
  () => queryCollection('content').first()
)
</script>
```

**How it works:**
1. `queryCollection('content')` - Queries the "content" collection defined in `content.config.ts`
2. `.first()` - Gets the first document (our `index.yml`)
3. `useAsyncData()` - Nuxt composable for async data fetching
4. Data is fetched at build time for SSG
5. Result is typed based on Zod schema

#### Content Structure in YAML

The YAML file follows a predictable structure matching the page sections:

```yaml
seo:
  title: "..."
  description: "..."

hero:
  links: [...]

section:
  title: "..."
  description: "..."
  images: {...}
  features: [...]

features:
  title: "..."
  features: [...]

# ... more sections
```

#### Markdown in YAML (MDC)

Content supports **inline markdown syntax**:

```yaml
title: '[Revolutionize]{.text-primary} your coding experience'
```

Rendered with the `<MDC>` component:

```vue
<template #title>
  <MDC :value="page.section.title" unwrap="p" />
</template>
```

The `{.text-primary}` syntax adds CSS classes to the wrapped text, allowing styled content within YAML strings.

---

## Component Architecture

### Component Hierarchy

```
app/
  ├── app.vue                 # Root layout
  ├── components/
  │   ├── AppHeader.vue       # Navigation header with scroll spy
  │   ├── AppFooter.vue       # Footer with newsletter & links
  │   ├── AppLogo.vue         # Logo component
  │   ├── HeroBackground.vue  # Animated gradient SVG
  │   ├── StarsBg.vue         # Lazy-loaded stars background
  │   └── TemplateMenu.vue    # Template switcher dropdown
  └── pages/
      └── index.vue           # Main landing page
```

### Component Types

#### 1. Layout Components

**AppHeader.vue** - Smart navigation with scroll spy
- Uses `useScrollspy()` composable to track section visibility
- Highlights nav items based on scroll position
- Responsive mobile menu
- Integrates logo, template menu, navigation, CTA button, and color mode toggle

**AppFooter.vue** - Static footer with newsletter
- Column-based layout with links
- Newsletter subscription form (UI only, no backend)
- Social media links
- Toast notifications via Nuxt UI

#### 2. Decorative Components

**HeroBackground.vue** - Animated SVG gradient
- Inline SVG with gradient animations
- Responds to page loading state
- Fade-in animation on mount
- Uses `useLoadingIndicator()` for pulse effect

**StarsBg.vue** - Background stars effect
- Lazy-loaded for performance
- Decorative element for CTA section

#### 3. Utility Components

**TemplateMenu.vue** - Template switcher dropdown
- UDropdownMenu with checkbox items
- Links to other Nuxt UI template demos
- Shows current template as checked

**AppLogo.vue** - Reusable logo component
- Likely SVG-based (not provided in files)
- Used in header

### Nuxt UI Components

The page heavily uses Nuxt UI's pre-built components:

| Component | Purpose |
|-----------|---------|
| `UApp` | Root app wrapper with toast support |
| `UHeader` | Responsive header with mobile menu |
| `UNavigationMenu` | Navigation links with active states |
| `UButton` | Styled buttons with variants |
| `UColorModeButton` | Dark/light mode toggle |
| `UPageHero` | Hero section with title/description/CTAs |
| `UPageSection` | Reusable section container |
| `UPageCard` | Card component for features/testimonials |
| `UPricingPlans` | Pricing grid container |
| `UPricingPlan` | Individual pricing card |
| `UPageCTA` | Call-to-action section |
| `UColorModeImage` | Image that swaps based on color mode |
| `USeparator` | Horizontal separator with icon |

These components handle:
- Responsive design
- Dark mode theming
- Accessibility
- Consistent spacing/typography

---

## Visual Design System

### Color Configuration (`app/app.config.ts`)

```typescript
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'orange',
      neutral: 'neutral'
    }
  }
})
```

- **Primary color**: Orange (used for accents, CTAs, highlights)
- **Neutral**: For text, backgrounds, borders

### Color Mode

Uses Nuxt UI's `useColorMode()` composable:
- Automatically persists user preference
- CSS variables update based on mode
- Components adapt styling automatically

### Decorative SVG System

The template uses **dual-mode SVG decorations** that adapt to light/dark themes:

```
public/images/
  ├── light/
  │   ├── line-1.svg through line-7.svg
  │   ├── connect.svg
  │   ├── optimize.svg
  │   └── track.svg
  └── dark/
      └── [same files]
```

**Usage Pattern:**
```vue
<UColorModeImage
  light="/images/light/line-1.svg"
  dark="/images/dark/line-1.svg"
  class="absolute pointer-events-none ..."
/>
```

**Characteristics:**
- Positioned absolutely
- Decorative only (`pointer-events-none`)
- Responsive (hidden on mobile via Tailwind classes)
- Adds visual interest without affecting layout

### Typography & Styling

Uses **Tailwind CSS** via Nuxt UI:
- Utility-first CSS
- Custom styles in `assets/css/main.css`
- Responsive breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Container queries: `@min-[1020px]`, `@max-[1280px]`

---

## Configuration & Build

### Nuxt Config (`nuxt.config.ts`)

```typescript
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',    // Linting
    '@nuxt/image',     // Image optimization
    '@nuxt/ui',        // UI components
    '@nuxt/content'    // Content management
  ],

  css: ['~/assets/css/main.css'],

  // Markdown syntax highlighting
  mdc: {
    highlight: {
      noApiRoute: false  // Enables API route for code highlighting
    }
  },

  // Static site generation
  nitro: {
    prerender: {
      routes: ['/']  // Only prerender homepage
    }
  },

  // ESLint code style
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',    // No trailing commas
        braceStyle: '1tbs'       // One true brace style
      }
    }
  }
})
```

### Build Output

```
.output/
  ├── public/          # Static assets (images, CSS, JS)
  └── server/          # Server-side code (API routes, if any)
```

For static hosting, deploy the `.output/public/` directory.

---

## Data Flow

### Content → Components Flow

```
┌─────────────────────────┐
│   content/index.yml     │
│  (YAML source file)     │
└───────────┬─────────────┘
            │
            │ 1. Validated by
            ▼
┌─────────────────────────┐
│   content.config.ts     │
│   (Zod schema)          │
└───────────┬─────────────┘
            │
            │ 2. Queried by
            ▼
┌─────────────────────────┐
│  app/pages/index.vue    │
│  queryCollection()      │
└───────────┬─────────────┘
            │
            │ 3. Passed to
            ▼
┌─────────────────────────┐
│   Nuxt UI Components    │
│  (UPageHero, etc.)      │
└─────────────────────────┘
```

### Example: Hero Section

**Content (index.yml):**
```yaml
hero:
  links:
    - label: Get started
      icon: i-lucide-arrow-right
      to: https://ui.nuxt.com
      target: _blank
      color: primary
```

**Schema (content.config.ts):**
```typescript
hero: z.object({
  links: z.array(createLinkSchema())
})
```

**Query (pages/index.vue):**
```vue
<script setup>
const { data: page } = await useAsyncData(
  'index',
  () => queryCollection('content').first()
)
</script>
```

**Render (pages/index.vue):**
```vue
<template>
  <UPageHero
    :description="page.description"
    :links="page.hero.links"
  />
</template>
```

**Result:**
The component receives typed data and renders buttons with proper styling, icons, and links.

### SEO Data Flow

```
content/index.yml (seo section)
    ↓
pages/index.vue (useSeoMeta)
    ↓
app/app.vue (default meta tags)
    ↓
<head> tags in rendered HTML
```

Page-specific SEO overrides global defaults via `useSeoMeta()`.

---

## Key Patterns & Best Practices

### 1. Content-First Architecture
- All copy lives in `content/index.yml`
- Content changes don't require code changes
- Non-developers can edit content safely
- Schema validation prevents errors

### 2. Type Safety
- Zod schemas provide runtime validation
- TypeScript for compile-time safety
- Auto-generated types from schemas
- Reduced bugs from invalid data

### 3. Component Composition
- Nuxt UI components handle complex UI
- Custom components for app-specific needs
- Slots for flexible content injection
- Props for data-driven rendering

### 4. Performance Optimization
- Static site generation
- Image optimization via `@nuxt/image`
- Lazy-loaded components (`LazyStarsBg`)
- Minimal JavaScript payload
- CDN-ready static files

### 5. Developer Experience
- Hot Module Replacement in dev
- Type checking with `pnpm typecheck`
- Linting with `pnpm lint`
- Clear error messages from Zod
- Auto-imports for composables/components

### 6. Responsive Design
- Mobile-first approach
- Tailwind breakpoints throughout
- Responsive images (desktop/mobile variants)
- Mobile menu in header
- Container queries for complex layouts

---

## File Organization

```
project-root/
├── .output/                 # Build output (gitignored)
├── app/
│   ├── app.config.ts        # UI configuration (colors)
│   ├── app.vue              # Root layout
│   ├── components/          # Vue components
│   └── pages/               # File-based routes
│       └── index.vue        # Homepage
├── assets/
│   └── css/
│       └── main.css         # Global styles
├── content/
│   └── index.yml            # Content source
├── public/
│   ├── favicon.ico
│   └── images/              # Static images
│       ├── dark/            # Dark mode decorations
│       └── light/           # Light mode decorations
├── content.config.ts        # Content schema definitions
├── nuxt.config.ts           # Nuxt configuration
├── package.json             # Dependencies & scripts
└── tsconfig.json            # TypeScript config
```

---

## Development Workflow

### 1. Content Updates
Edit `content/index.yml` → Save → Hot reload in browser

### 2. Component Changes
Edit `.vue` files → Save → Hot reload

### 3. Configuration Changes
Edit `nuxt.config.ts` or `content.config.ts` → Restart dev server

### 4. Adding New Sections
1. Define schema in `content.config.ts`
2. Add content to `index.yml`
3. Add rendering logic to `pages/index.vue`
4. Create custom components if needed

### 5. Deployment
```bash
pnpm build       # Generate static site
pnpm preview     # Test locally
# Deploy .output/public/ to hosting
```

---

## Summary

This project demonstrates a modern, content-driven approach to landing pages:

- **Nuxt 4** provides the SSR/SSG framework
- **Nuxt Content** turns YAML into queryable data
- **Nuxt UI** supplies production-ready components
- **Zod schemas** ensure content validity
- **Single-page architecture** keeps it simple
- **TypeScript** adds type safety
- **Tailwind CSS** enables rapid styling
- **Static generation** ensures fast loading

The entire page is defined in one YAML file, validated by schemas, and rendered through a component system that handles responsive design, dark mode, and accessibility automatically.