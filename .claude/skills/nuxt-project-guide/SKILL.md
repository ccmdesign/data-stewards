---
name: nuxt-project-guide
description: This skill should be used when making updates or modifications to the Nuxt UI landing page project. It provides comprehensive documentation on the project architecture, content management system, component structure, and common update patterns. Use this skill when adding new sections, updating content, modifying components, changing visual design, or troubleshooting issues in this specific Nuxt 4 + Nuxt UI v4 + Nuxt Content project.
---

# Nuxt Project Guide

## Overview

This skill provides comprehensive guidance for working with this Nuxt UI landing page boilerplate. The project is a content-driven single-page application built with Nuxt 4, Nuxt UI v4, and Nuxt Content v3, where all page content is defined in a single YAML file and validated through Zod schemas.

## When to Use This Skill

Use this skill when:
- Making any content updates to the landing page
- Adding new sections or features to the page
- Modifying visual design (colors, images, styles)
- Understanding how Nuxt Content, schemas, or data flow works
- Troubleshooting validation errors or build issues
- Updating components or layouts
- Configuring Nuxt settings or modules

## Quick Decision Tree

### "I need to update content"
1. Determine which section needs updating
2. Consult `references/quick-reference.md` → "Content Updates" section
3. Edit `content/index.yml` → corresponding section
4. Changes hot-reload automatically (no restart needed)

### "I need to add a new section"
1. Consult `references/project-overview.md` → "Data Flow" section
2. Follow the pattern: Schema → Content → Component
3. Steps:
   - Define schema in `content.config.ts`
   - Add content to `content/index.yml`
   - Add rendering logic to `app/pages/index.vue`
4. Restart dev server after schema changes

### "I need to change visual design"
1. Identify what needs changing:
   - **Colors**: Edit `app/app.config.ts` (requires restart)
   - **Images**: Add to `public/images/light/` and `public/images/dark/`
   - **Styles**: Edit `app/assets/css/main.css` (hot-reloads)
   - **Layout**: Edit component files in `app/components/`
2. Consult `references/quick-reference.md` → "Visual Design Updates"

### "I need to understand how something works"
1. Consult `references/project-overview.md` for comprehensive documentation
2. Navigate to relevant section:
   - **How Nuxt Builds Pages** - Understanding the build process
   - **Layout System** - How app.vue and layouts work
   - **Nuxt Content Integration** - How YAML becomes queryable data
   - **Component Architecture** - Component hierarchy and patterns
   - **Data Flow** - How content flows through the system

### "I'm getting validation errors"
1. Check terminal output for specific error from Zod
2. Consult `references/project-overview.md` → "Nuxt Content Integration" → "Content Schema"
3. Verify content in `content/index.yml` matches schema in `content.config.ts`
4. Common issues:
   - Missing required fields
   - Wrong data types
   - Invalid enum values
   - Typos in field names

## Core Concepts

### Content-Driven Architecture
All page content lives in `content/index.yml`. This YAML file is:
- Validated against Zod schemas in `content.config.ts`
- Queried in `app/pages/index.vue` using `queryCollection('content').first()`
- Passed as props to Nuxt UI components
- Hot-reloaded in development (no restart needed for content changes)

### Data Flow Pattern
```
content/index.yml
  ↓ validated by
content.config.ts (Zod schemas)
  ↓ queried by
app/pages/index.vue (queryCollection)
  ↓ passed to
Nuxt UI Components
  ↓ rendered as
HTML
```

### Three Types of Changes

**1. Content-Only Changes** (No restart needed)
- Edit `content/index.yml`
- Changes hot-reload automatically
- Examples: Update text, change links, modify descriptions

**2. Schema/Config Changes** (Restart required)
- Edit `content.config.ts`, `nuxt.config.ts`, or `app.config.ts`
- Restart dev server: Stop and run `pnpm dev` again
- Examples: Add new section, change validation rules, update modules

**3. Component Changes** (No restart needed)
- Edit `.vue` files in `app/components/` or `app/pages/`
- Changes hot-reload automatically
- Examples: Update layout, modify styling, change structure

## Working with Content

### Editing Existing Content
1. Open `content/index.yml`
2. Locate the section to edit (hero, features, pricing, etc.)
3. Make changes following YAML syntax
4. Save file - changes appear immediately in browser
5. If validation errors appear, check schema in `content.config.ts`

### Using MDC Syntax for Styled Text
Content supports inline styling with MDC syntax:
```yaml
title: '[Highlighted text]{.text-primary} regular text'
```

This renders "Highlighted text" with the `.text-primary` CSS class applied.

### Common Content Sections
- `seo:` - SEO metadata (title, description)
- `hero:` - Hero section with title, description, and CTA links
- `section:` - Feature showcase section
- `features:` - Features grid
- `steps:` - Step-by-step guide
- `pricing:` - Pricing plans
- `testimonials:` - Customer testimonials
- `cta:` - Final call-to-action section

## Working with Schemas

### Understanding Schemas
Schemas define the structure and validation rules for content. Located in `content.config.ts`, they use Zod for runtime validation.

### Adding a New Section
To add a completely new section to the page:

1. **Define the schema** in `content.config.ts`:
```typescript
myNewSection: createBaseSchema().extend({
  items: z.array(z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty()
  }))
})
```

2. **Add content** to `content/index.yml`:
```yaml
myNewSection:
  title: "Section Title"
  description: "Section description"
  items:
    - title: "Item 1"
      description: "Description 1"
```

3. **Render in page** at `app/pages/index.vue`:
```vue
<UPageSection
  :title="page.myNewSection.title"
  :description="page.myNewSection.description"
  :items="page.myNewSection.items"
/>
```

4. **Restart dev server** to load new schema

### Modifying Existing Schemas
To change validation rules for existing content:
1. Edit schema in `content.config.ts`
2. Update content in `content/index.yml` to match new rules
3. Restart dev server
4. Check terminal for validation errors

## Working with Components

### Component Locations
- **Layout components**: `app/components/AppHeader.vue`, `app/components/AppFooter.vue`
- **Decorative components**: `app/components/HeroBackground.vue`, `app/components/StarsBg.vue`
- **Utility components**: `app/components/AppLogo.vue`, `app/components/TemplateMenu.vue`
- **Page component**: `app/pages/index.vue` (main landing page)
- **Root layout**: `app/app.vue` (wraps entire app)

### Modifying Components
1. Locate the component file in `app/components/` or `app/pages/`
2. Make changes to template, script, or style sections
3. Save file - changes hot-reload automatically
4. No restart needed for component changes

### Using Nuxt UI Components
The project heavily uses pre-built Nuxt UI components:
- `UPageHero` - Hero sections
- `UPageSection` - Content sections
- `UButton` - Buttons with variants
- `UColorModeImage` - Images that swap based on color mode
- `UPricingPlans` / `UPricingPlan` - Pricing cards
- And many more...

Consult `references/project-overview.md` → "Component Architecture" for complete list and usage.

## Visual Design

### Changing Colors
Edit `app/app.config.ts`:
```typescript
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'orange',  // Change to any Tailwind color
      neutral: 'neutral'
    }
  }
})
```
**Restart required** after this change.

### Adding Dark/Light Mode Images
1. Add light version to `public/images/light/filename.svg`
2. Add dark version to `public/images/dark/filename.svg`
3. Use in components:
```vue
<UColorModeImage
  light="/images/light/filename.svg"
  dark="/images/dark/filename.svg"
/>
```

### Updating Global Styles
Edit `app/assets/css/main.css` with custom CSS. Changes hot-reload automatically.

## Configuration

### Updating Nuxt Config
Edit `nuxt.config.ts` for:
- Adding modules
- Changing build settings
- Configuring prerendering
- ESLint rules
- MDC settings

**Always restart dev server** after config changes.

### Understanding Build Process
- **Development**: `pnpm dev` - Hot reload enabled
- **Production Build**: `pnpm build` - Static site generation
- **Preview**: `pnpm preview` - Test production build locally

The build prerenders the `/` route, creating static HTML ready for deployment.

## Reference Materials

### Quick Reference
Consult `references/quick-reference.md` for:
- Common update patterns
- File location cheat sheet
- When to restart dev server
- Common gotchas
- Quick commands

### Comprehensive Documentation
Consult `references/project-overview.md` for:
- Complete architecture overview
- Detailed explanations of Nuxt, Nuxt Content, and layouts
- Component architecture breakdown
- Visual design system details
- Data flow diagrams
- Development workflow guidance

### When to Use Which Reference

**Use quick-reference.md when:**
- Making routine updates
- Need to quickly locate a file
- Want to verify if restart is needed
- Looking for common patterns

**Use project-overview.md when:**
- Learning how the system works
- Adding new functionality
- Troubleshooting complex issues
- Understanding architecture decisions
- Need detailed technical explanations

## Troubleshooting

### Content Validation Errors
1. Check terminal output for Zod error message
2. Locate the problematic field in `content/index.yml`
3. Compare against schema in `content.config.ts`
4. Fix content to match schema requirements
5. Restart dev server if schema was modified

### Build Errors
1. Check terminal output for specific error
2. Run `pnpm typecheck` to identify TypeScript errors
3. Run `pnpm lint` to identify ESLint errors
4. Consult `references/project-overview.md` for architecture guidance

### Hot Reload Not Working
1. Verify dev server is running (`pnpm dev`)
2. Check if change requires restart (config files do)
3. Try manual browser refresh
4. Restart dev server as last resort

## Best Practices

### Before Making Changes
1. Understand current architecture (consult references)
2. Identify all files that need updating
3. Follow existing patterns in the codebase
4. Know whether restart is required

### After Making Changes
1. Verify changes appear correctly in browser
2. Check terminal for errors or warnings
3. Test in both light and dark modes (if visual changes)
4. Run `pnpm typecheck` and `pnpm lint` before committing

### Content Updates
- Keep YAML properly indented (use 2 spaces)
- Follow existing content structure
- Use MDC syntax for inline styling
- Validate against schema before saving

### Component Updates
- Follow existing component patterns
- Use Nuxt UI components when possible
- Maintain responsive design (test mobile views)
- Use TypeScript for type safety

### Schema Updates
- Update schema first, then content
- Restart dev server after schema changes
- Use descriptive validation errors
- Extend existing schemas when possible (use `.extend()`)
