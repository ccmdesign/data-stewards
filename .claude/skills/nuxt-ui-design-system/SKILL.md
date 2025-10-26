---
name: nuxt-ui-design-system
description: This skill should be used when working with Nuxt UI's design system, CSS variables, design tokens, component customization, or theming. Use this skill when customizing Nuxt UI components, understanding the color system, working with design tokens, or needing to know component structure (slots, variants, props). This skill provides comprehensive guidance on Tailwind Variants API, semantic colors, CSS variable tokens, and the customization hierarchy.
---

# Nuxt UI Design System

## Overview

This skill provides comprehensive guidance for understanding and customizing Nuxt UI's design system. It covers CSS variables (design tokens), semantic colors, component customization via Tailwind Variants, and the complete customization hierarchy.

## When to Use This Skill

Use this skill when:
- Customizing Nuxt UI component styles
- Understanding CSS variable tokens (colors, text, background, border, radius)
- Working with semantic colors (primary, secondary, success, etc.)
- Needing to know component structure (slots, variants, props)
- Theming an application globally
- Extending the color system with custom colors
- Understanding the customization hierarchy (ui prop vs class prop)
- Finding component documentation or metadata

## Quick Decision Trees

### "I need to customize colors"

1. **Determine the scope:**
   - **Global theme change**: Configure semantic colors in runtime config
   - **Specific component**: Use `color` prop
   - **Custom CSS variable**: Edit design tokens in main.css

2. **For global theme changes:**
   - Consult `references/semantic-colors-guide.md` → "Runtime Configuration"
   - Edit `app.config.ts` (Nuxt) or `vite.config.ts` (Vue)
   - Map semantic colors to Tailwind colors

3. **For CSS variable customization:**
   - Consult `references/design-tokens-reference.md` → Relevant token section
   - Edit `app/assets/css/main.css`
   - Override variables for light/dark modes

### "I need to customize a component"

1. **Determine customization level:**
   - **All instances**: Global config in `app.config.ts`
   - **Single instance**: `ui` prop or `class` prop
   - **New variant/size**: Extend variants in global config

2. **Find component structure:**
   - Use MCP: `mcp__nuxt-ui-remote__get_component_metadata(componentName)`
   - Or visit: https://ui.nuxt.com/docs/components/[component-name]
   - Or check: https://github.com/nuxt/ui/tree/v4/src/theme

3. **Choose customization method:**
   - **Multi-slot changes**: Use `ui` prop
   - **Single property**: Use `class` prop
   - **All instances**: Use global config

4. **Consult guide:**
   - Read `references/component-customization-guide.md`
   - Navigate to relevant section (Slots, Variants, Compound Variants, or Customization Hierarchy)

### "I need to understand design tokens"

1. **Identify token category:**
   - Colors (semantic colors like primary, error)
   - Text (text-default, text-muted, etc.)
   - Background (bg-default, bg-elevated, etc.)
   - Border (border-default, border-accented, etc.)
   - Radius (--ui-radius base value)
   - Layout (container, header height)

2. **Consult reference:**
   - Read `references/design-tokens-reference.md`
   - Navigate to specific token category
   - See examples and customization patterns

### "I need to add a custom color"

1. **Determine if it's a semantic color or theme color:**
   - **Semantic** (like `tertiary`, `accent`): Follow extend colors pattern
   - **Theme color** (like custom brand color): Define in `@theme`

2. **For semantic colors:**
   - Consult `references/semantic-colors-guide.md` → "Extending the Color System"
   - Register in `nuxt.config.ts` or `vite.config.ts`
   - Assign value in `app.config.ts` or `vite.config.ts`

3. **For theme colors:**
   - Consult `references/semantic-colors-guide.md` → "Custom Colors"
   - Define all shades (50-950) in main.css `@theme` block
   - Then use in semantic color config

### "I'm getting a customization error"

1. **Check error type:**
   - **"Color not found"**: Color not defined in theme
   - **"ui prop not working"**: Component may not have slots
   - **Styles not applying"**: Check customization hierarchy
   - **"Default variants not working"**: Config file needs restart

2. **Consult troubleshooting:**
   - `references/semantic-colors-guide.md` → "Troubleshooting"
   - `references/component-customization-guide.md` → "Troubleshooting"

---

## Core Concepts

### Design System Philosophy

Nuxt UI's design system is built on three key principles:

1. **Semantic Naming** - Colors describe purpose (primary, error) not appearance (blue, red)
2. **CSS Variables as Tokens** - Centralized design tokens for consistency
3. **Tailwind Variants** - Flexible component customization via slots and variants

### Customization Hierarchy

Understanding the order of style precedence (lowest to highest):

```
Base Theme
   ↓
Global Config (app.config.ts)
   ↓
Variant Props (size="lg")
   ↓
UI Prop (:ui="{ ... }")
   ↓
Class Prop (class="...")
```

### Token System

```
@theme Colors (Tailwind palette)
    ↓
Semantic Colors (runtime config)
    ↓
CSS Variable Tokens (--ui-primary)
    ↓
Utility Classes (text-primary)
    ↓
Component Styles
```

---

## Using MCP Tools for Component Discovery

The Nuxt UI MCP server provides tools to fetch component information programmatically.

### Get Component Metadata

Retrieve complete metadata including props, slots, default values:

```
mcp__nuxt-ui-remote__get_component_metadata(componentName: "Button")
```

Returns:
- `props` - All available props with types and defaults
- `slots` - Available content slots
- `description` - Component purpose
- `documentation_url` - Link to docs

Example usage:
```
Question: "What props does the Card component accept?"
Action: Use mcp__nuxt-ui-remote__get_component_metadata(componentName: "Card")
Result: Shows all Card props including variant, ui, as, etc.
```

### Get Component Documentation

Retrieve full documentation page content:

```
mcp__nuxt-ui-remote__get_component(componentName: "Button")
```

Returns:
- Full component documentation
- Usage examples
- Theme configuration
- Props table

### List All Components

See all available components:

```
mcp__nuxt-ui-remote__list_components()
```

### Get Documentation Pages

Fetch specific documentation pages:

```
mcp__nuxt-ui-remote__get_documentation_page(path: "/docs/getting-started/theme/design-system")
```

Use for:
- `/docs/getting-started/theme/design-system`
- `/docs/getting-started/theme/css-variables`
- `/docs/getting-started/theme/components`

---

## Reference Materials

### Design Tokens Reference

**File:** `references/design-tokens-reference.md`

**Use when:**
- Need to know which CSS variables are available
- Want to customize text/background/border colors
- Need to change border radius system
- Want to adjust container or header sizes
- Need examples of token customization

**Contents:**
- Complete CSS variable reference
- Semantic color tokens
- Text color hierarchy
- Background levels
- Border colors
- Border radius system
- Layout tokens
- Customization examples

### Semantic Colors Guide

**File:** `references/semantic-colors-guide.md`

**Use when:**
- Understanding semantic vs specific colors
- Configuring colors at runtime
- Adding custom semantic colors
- Defining custom theme colors
- Troubleshooting color issues

**Contents:**
- Semantic color philosophy
- Runtime configuration (Nuxt & Vue)
- Available Tailwind colors
- Extending the color system
- Custom color definitions
- Real-world examples
- Best practices
- Troubleshooting

### Component Customization Guide

**File:** `references/component-customization-guide.md`

**Use when:**
- Need to understand Tailwind Variants
- Customizing component slots
- Working with variants and compound variants
- Understanding ui prop vs class prop
- Global vs per-component customization
- Finding component structure

**Contents:**
- Tailwind Variants API explanation
- Slots deep-dive
- Variants and default variants
- Compound variants
- Customization hierarchy
- Practical examples
- Common patterns
- Tips and best practices
- Troubleshooting

---

## Best Practices

### 1. Start with Semantic Colors

Use semantic colors instead of specific Tailwind colors in components:

**Good:**
```vue
<UButton color="primary">Save</UButton>
<UAlert color="error">Error!</UAlert>
```

**Bad:**
```vue
<UButton class="bg-blue-500">Save</UButton>
<UAlert class="bg-red-500">Error!</UAlert>
```

### 2. Customize at the Right Level

Choose the appropriate customization method:

- **All instances**: Global config
- **Multiple instances**: Create wrapper component
- **Single instance**: `ui` prop or `class` prop

### 3. Use Design Tokens

Leverage CSS variables for consistent theming:

```css
/* Good: Uses tokens */
.my-element {
  color: var(--ui-text);
  background: var(--ui-bg-elevated);
}

/* Bad: Hardcoded colors */
.my-element {
  color: #333;
  background: #f5f5f5;
}
```

### 4. Test Both Color Modes

Always verify customizations work in light and dark modes:

```css
:root {
  --ui-primary: var(--ui-color-primary-600);
}

.dark {
  --ui-primary: var(--ui-color-primary-300);
}
```

### 5. Document Custom Additions

Comment custom colors, variants, or patterns:

```typescript [app.config.ts]
export default defineAppConfig({
  ui: {
    colors: {
      // Main brand color for primary CTAs
      primary: 'blue',

      // Custom accent for promotional content
      accent: 'pink'
    }
  }
})
```

### 6. Use MCP Tools for Discovery

Instead of guessing component structure, use MCP tools:

```
// Find component props/slots
mcp__nuxt-ui-remote__get_component_metadata(componentName: "Card")

// Get full documentation
mcp__nuxt-ui-remote__get_component(componentName: "Button")
```

### 7. Follow Tailwind Best Practices

Use Tailwind utilities correctly:

- Responsive: `text-sm sm:text-base lg:text-lg`
- State: `hover:bg-primary active:bg-primary/80`
- Dark mode: `dark:bg-elevated dark:text-highlighted`

---

## Quick Reference

### Configuration Files

| Task | Nuxt | Vue |
|------|------|-----|
| Semantic colors | `app.config.ts` | `vite.config.ts` (ui.ui.colors) |
| Register colors | `nuxt.config.ts` | `vite.config.ts` (ui.theme.colors) |
| Default variants | `nuxt.config.ts` | `vite.config.ts` (ui.theme.defaultVariants) |
| Global component theme | `app.config.ts` | `vite.config.ts` (ui.ui) |
| CSS variables | `app/assets/css/main.css` | `src/assets/main.css` |

### Customization Quick Lookup

| Need | Method | Priority |
|------|--------|----------|
| All instances of component | Global config in app.config.ts | Medium |
| Single component, multi-slot | `ui` prop | High |
| Single component, simple | `class` prop | Highest |
| Change primary color | app.config.ts colors | - |
| Add tertiary color | nuxt.config.ts + app.config.ts | - |
| Override token | main.css CSS variables | - |

### MCP Tools Quick Reference

```
// Component metadata (props, slots)
mcp__nuxt-ui-remote__get_component_metadata(componentName: "Button")

// Full component docs
mcp__nuxt-ui-remote__get_component(componentName: "Card")

// List all components
mcp__nuxt-ui-remote__list_components()

// Get design system docs
mcp__nuxt-ui-remote__get_documentation_page(path: "/docs/getting-started/theme/design-system")
```

### Common CSS Variables

```css
/* Semantic colors */
--ui-primary, --ui-secondary, --ui-success, --ui-error

/* Text */
--ui-text, --ui-text-muted, --ui-text-highlighted

/* Background */
--ui-bg, --ui-bg-muted, --ui-bg-elevated

/* Border */
--ui-border, --ui-border-accented

/* Layout */
--ui-radius, --ui-container, --ui-header-height
```

---

## Getting Help

### If you're stuck:

1. **Check the relevant reference:**
   - Colors → `semantic-colors-guide.md`
   - Tokens → `design-tokens-reference.md`
   - Components → `component-customization-guide.md`

2. **Use MCP tools for discovery:**
   - Get component metadata
   - Fetch documentation pages

3. **Check official docs:**
   - https://ui.nuxt.com/docs/getting-started/theme/design-system
   - https://ui.nuxt.com/docs/getting-started/theme/css-variables
   - https://ui.nuxt.com/docs/getting-started/theme/components

4. **Inspect with DevTools:**
   - See computed classes
   - Verify CSS variables
   - Check element structure

5. **Verify configuration:**
   - Check syntax in config files
   - Restart dev server for config changes
   - Ensure colors exist in theme