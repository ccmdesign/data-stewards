# Design Tokens Reference

This document provides a complete reference of all CSS variables (design tokens) available in Nuxt UI.

## What are Design Tokens?

Design tokens are CSS variables that define the visual design of your application. Nuxt UI uses these tokens to maintain consistency across components and enable easy theming.

All tokens can be customized in your `app/assets/css/main.css` file.

---

## Semantic Color Tokens

### Color Utilities

Nuxt UI provides utility classes for semantic colors that automatically adapt to light/dark mode.

**Available classes:**
- `text-primary`, `bg-primary`, `border-primary`
- `text-secondary`, `bg-secondary`, `border-secondary`
- `text-success`, `bg-success`, `border-success`
- `text-info`, `bg-info`, `border-info`
- `text-warning`, `bg-warning`, `border-warning`
- `text-error`, `bg-error`, `border-error`
- `text-neutral`, `bg-neutral`, `border-neutral`

### CSS Variables

**Light Mode:**
```css
:root {
  --ui-primary: var(--ui-color-primary-500);
  --ui-secondary: var(--ui-color-secondary-500);
  --ui-success: var(--ui-color-success-500);
  --ui-info: var(--ui-color-info-500);
  --ui-warning: var(--ui-color-warning-500);
  --ui-error: var(--ui-color-error-500);
}
```

**Dark Mode:**
```css
.dark {
  --ui-primary: var(--ui-color-primary-400);
  --ui-secondary: var(--ui-color-secondary-400);
  --ui-success: var(--ui-color-success-400);
  --ui-info: var(--ui-color-info-400);
  --ui-warning: var(--ui-color-warning-400);
  --ui-error: var(--ui-color-error-400);
}
```

### Customization Example

Change which shade is used for light/dark modes:

```css [app/assets/css/main.css]
@import "tailwindcss";
@import "@nuxt/ui";

:root {
  /* Use darker shade in light mode */
  --ui-primary: var(--ui-color-primary-700);
}

.dark {
  /* Use lighter shade in dark mode */
  --ui-primary: var(--ui-color-primary-200);
}
```

### Using Solid Colors

For solid black/white (colors without shades):

```css [app/assets/css/main.css]
@import "tailwindcss";
@import "@nuxt/ui";

:root {
  --ui-primary: black;
}

.dark {
  --ui-primary: white;
}
```

---

## Text Color Tokens

### Utility Classes

- `text-dimmed` - Least prominent text
- `text-muted` - Low prominence text
- `text-toned` - Medium-low prominence text
- `text-default` - Normal body text (default)
- `text-highlighted` - High prominence text
- `text-inverted` - Inverted text color (for use with `bg-inverted`)

### CSS Variables

**Light Mode:**
```css
:root {
  --ui-text-dimmed: var(--ui-color-neutral-400);
  --ui-text-muted: var(--ui-color-neutral-500);
  --ui-text-toned: var(--ui-color-neutral-600);
  --ui-text: var(--ui-color-neutral-700);
  --ui-text-highlighted: var(--ui-color-neutral-900);
  --ui-text-inverted: var(--color-white);
}
```

**Dark Mode:**
```css
.dark {
  --ui-text-dimmed: var(--ui-color-neutral-500);
  --ui-text-muted: var(--ui-color-neutral-400);
  --ui-text-toned: var(--ui-color-neutral-300);
  --ui-text: var(--ui-color-neutral-200);
  --ui-text-highlighted: var(--color-white);
  --ui-text-inverted: var(--ui-color-neutral-900);
}
```

### Use Cases

| Token | Use For |
|-------|---------|
| `text-dimmed` | Disabled states, less important info |
| `text-muted` | Secondary text, meta info, timestamps |
| `text-toned` | Labels, captions |
| `text-default` | Body text, paragraphs (default) |
| `text-highlighted` | Headings, important text |
| `text-inverted` | Text on dark backgrounds |

### Customization Example

```css [app/assets/css/main.css]
@import "tailwindcss";
@import "@nuxt/ui";

:root {
  /* Make default text darker */
  --ui-text: var(--ui-color-neutral-900);
}

.dark {
  /* Make dark mode text pure white */
  --ui-text: var(--color-white);
}
```

---

## Background Color Tokens

### Utility Classes

- `bg-default` - Default background
- `bg-muted` - Subtle background
- `bg-elevated` - Slightly elevated surface
- `bg-accented` - Accented background
- `bg-inverted` - Inverted background

### CSS Variables

**Light Mode:**
```css
:root {
  --ui-bg: var(--color-white);
  --ui-bg-muted: var(--ui-color-neutral-50);
  --ui-bg-elevated: var(--ui-color-neutral-100);
  --ui-bg-accented: var(--ui-color-neutral-200);
  --ui-bg-inverted: var(--ui-color-neutral-900);
}
```

**Dark Mode:**
```css
.dark {
  --ui-bg: var(--ui-color-neutral-900);
  --ui-bg-muted: var(--ui-color-neutral-800);
  --ui-bg-elevated: var(--ui-color-neutral-800);
  --ui-bg-accented: var(--ui-color-neutral-700);
  --ui-bg-inverted: var(--color-white);
}
```

### Use Cases

| Token | Use For |
|-------|---------|
| `bg-default` | Main page background, card backgrounds |
| `bg-muted` | Subtle containers, secondary surfaces |
| `bg-elevated` | Modals, dropdowns, elevated cards |
| `bg-accented` | Highlighted sections, hover states |
| `bg-inverted` | Dark sections on light pages |

### Customization Example

```css [app/assets/css/main.css]
@import "tailwindcss";
@import "@nuxt/ui";

:root {
  /* Use off-white background */
  --ui-bg: var(--ui-color-neutral-50);
}

.dark {
  /* Use deeper black background */
  --ui-bg: var(--ui-color-neutral-950);
}
```

---

## Border Color Tokens

### Utility Classes

- `border-default` - Default border
- `border-muted` - Subtle border
- `border-accented` - Accented border
- `border-inverted` - Inverted border

### CSS Variables

**Light Mode:**
```css
:root {
  --ui-border: var(--ui-color-neutral-200);
  --ui-border-muted: var(--ui-color-neutral-200);
  --ui-border-accented: var(--ui-color-neutral-300);
  --ui-border-inverted: var(--ui-color-neutral-900);
}
```

**Dark Mode:**
```css
.dark {
  --ui-border: var(--ui-color-neutral-800);
  --ui-border-muted: var(--ui-color-neutral-700);
  --ui-border-accented: var(--ui-color-neutral-700);
  --ui-border-inverted: var(--color-white);
}
```

### Use Cases

| Token | Use For |
|-------|---------|
| `border-default` | Card borders, input borders, dividers |
| `border-muted` | Subtle separators, optional borders |
| `border-accented` | Emphasized borders, selected states |
| `border-inverted` | Borders on inverted backgrounds |

### Customization Example

```css [app/assets/css/main.css]
@import "tailwindcss";
@import "@nuxt/ui";

:root {
  /* Use lighter borders */
  --ui-border: var(--ui-color-neutral-100);
}

.dark {
  /* Use more visible borders in dark mode */
  --ui-border: var(--ui-color-neutral-900);
}
```

---

## Border Radius Tokens

### Utility Classes

Nuxt UI overrides Tailwind's default radius utilities with a unified system:

- `rounded-xs`
- `rounded-sm`
- `rounded-md`
- `rounded-lg`
- `rounded-xl`
- `rounded-2xl`
- `rounded-3xl`
- `rounded-full` (unchanged)

### Base Radius Variable

All radius utilities are calculated from a base value:

```css
:root {
  --ui-radius: 0.25rem; /* 4px - default */
}
```

### Radius Scale

The utilities scale based on `--ui-radius`:

| Utility | Calculation |
|---------|-------------|
| `rounded-xs` | `calc(var(--ui-radius) * 0.5)` |
| `rounded-sm` | `calc(var(--ui-radius) * 0.75)` |
| `rounded-md` | `var(--ui-radius)` |
| `rounded-lg` | `calc(var(--ui-radius) * 1.5)` |
| `rounded-xl` | `calc(var(--ui-radius) * 2)` |
| `rounded-2xl` | `calc(var(--ui-radius) * 3)` |
| `rounded-3xl` | `calc(var(--ui-radius) * 4)` |

### Customization Example

Change the base radius to make all components more or less rounded:

```css [app/assets/css/main.css]
@import "tailwindcss";
@import "@nuxt/ui";

:root {
  /* More rounded */
  --ui-radius: 0.5rem; /* 8px */
}

/* Or less rounded */
:root {
  --ui-radius: 0.125rem; /* 2px */
}

/* Or square */
:root {
  --ui-radius: 0;
}
```

---

## Container Token

### Container Max Width

Controls the maximum width of the `UContainer` component:

```css
:root {
  --ui-container: var(--container-7xl); /* default */
}
```

### Available Container Widths

Use standard Tailwind container breakpoints:
- `--container-sm` - 640px
- `--container-md` - 768px
- `--container-lg` - 1024px
- `--container-xl` - 1280px
- `--container-2xl` - 1536px
- `--container-3xl` - 1792px
- `--container-4xl` - 2048px
- `--container-5xl` - 2304px
- `--container-6xl` - 2560px
- `--container-7xl` - 2816px (default)

### Custom Container Width

Define a custom container size:

```css [app/assets/css/main.css]
@import "tailwindcss";
@import "@nuxt/ui";

@theme {
  /* Define custom container size */
  --container-8xl: 90rem; /* 1440px */
}

:root {
  /* Use custom size */
  --ui-container: var(--container-8xl);
}
```

---

## Header Height Token

### Header Height

Controls the height of the `UHeader` component:

```css
:root {
  --ui-header-height: --spacing(16); /* 4rem / 64px - default */
}
```

### Customization Example

```css [app/assets/css/main.css]
@import "tailwindcss";
@import "@nuxt/ui";

:root {
  /* Taller header */
  --ui-header-height: --spacing(24); /* 6rem / 96px */
}

/* Or shorter header */
:root {
  --ui-header-height: --spacing(12); /* 3rem / 48px */
}
```

---

## Body Element Defaults

Nuxt UI applies default styling to the `<body>` element:

```css
body {
  @apply antialiased text-default bg-default scheme-light dark:scheme-dark;
}
```

This sets:
- `antialiased` - Smooth font rendering
- `text-default` - Default text color
- `bg-default` - Default background color
- `scheme-light` / `dark:scheme-dark` - Color scheme for form controls

---

## Complete Customization Example

Here's a full example customizing multiple tokens:

```css [app/assets/css/main.css]
@import "tailwindcss";
@import "@nuxt/ui";

/* Light mode tokens */
:root {
  /* Semantic colors */
  --ui-primary: var(--ui-color-primary-600);

  /* Text colors */
  --ui-text: var(--ui-color-neutral-800);
  --ui-text-highlighted: var(--ui-color-neutral-950);

  /* Background colors */
  --ui-bg: var(--ui-color-neutral-50);
  --ui-bg-elevated: var(--color-white);

  /* Border colors */
  --ui-border: var(--ui-color-neutral-200);

  /* Border radius */
  --ui-radius: 0.5rem; /* More rounded */

  /* Layout */
  --ui-container: var(--container-6xl);
  --ui-header-height: --spacing(20);
}

/* Dark mode tokens */
.dark {
  /* Semantic colors */
  --ui-primary: var(--ui-color-primary-300);

  /* Text colors */
  --ui-text: var(--ui-color-neutral-100);
  --ui-text-highlighted: var(--color-white);

  /* Background colors */
  --ui-bg: var(--ui-color-neutral-950);
  --ui-bg-elevated: var(--ui-color-neutral-900);

  /* Border colors */
  --ui-border: var(--ui-color-neutral-800);
}
```

---

## Token Hierarchy

Understanding the relationship between tokens:

1. **Tailwind Theme** (`@theme` directive)
   - Defines color palettes, breakpoints, fonts
   - Example: `--color-blue-500`

2. **Semantic Color Aliases** (runtime config)
   - Map semantic names to theme colors
   - Example: `primary: 'blue'` in app.config.ts

3. **CSS Variable Tokens** (customizable)
   - Use semantic aliases to set component colors
   - Example: `--ui-primary: var(--ui-color-primary-500)`

4. **Utility Classes** (generated)
   - Use tokens to style elements
   - Example: `text-primary`, `bg-elevated`

```
@theme colors
    ↓
app.config.ts semantic mapping
    ↓
CSS variable tokens
    ↓
Utility classes
    ↓
Component styles
```

---

## Quick Reference Table

| Category | Token Pattern | Example | Purpose |
|----------|---------------|---------|---------|
| Semantic Colors | `--ui-{color}` | `--ui-primary` | Brand/state colors |
| Text | `--ui-text-{level}` | `--ui-text-muted` | Text hierarchy |
| Background | `--ui-bg-{level}` | `--ui-bg-elevated` | Surface levels |
| Border | `--ui-border-{level}` | `--ui-border-default` | Border colors |
| Radius | `--ui-radius` | `--ui-radius` | Border radius base |
| Container | `--ui-container` | `--ui-container` | Content max-width |
| Header | `--ui-header-height` | `--ui-header-height` | Header height |

---

## Best Practices

1. **Use semantic tokens** - Prefer `text-muted` over `text-neutral-500` for maintainability
2. **Customize base variables** - Change `--ui-radius` instead of individual radius utilities
3. **Test both modes** - Always verify customizations in light and dark modes
4. **Follow the hierarchy** - Customize at the right level (theme → semantic → tokens)
5. **Document changes** - Comment your token customizations for team clarity