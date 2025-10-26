# Semantic Colors Guide

This document explains Nuxt UI's semantic color system, how to configure colors at runtime, and how to extend the color palette.

## Philosophy: Semantic vs Specific Colors

Nuxt UI uses **semantic naming** instead of specific color values. This approach makes your UI:
- **Maintainable** - Change themes without touching component code
- **Consistent** - Colors have clear purposes across the application
- **Flexible** - Easily create multiple themes or brand variations

### Bad Practice (Specific Colors)
```vue
<!-- Tightly coupled to specific color -->
<UButton color="blue" />
<UAlert color="red" />
```

### Good Practice (Semantic Colors)
```vue
<!-- Describes purpose, not appearance -->
<UButton color="primary" />
<UAlert color="error" />
```

---

## Available Semantic Colors

Nuxt UI provides 7 semantic colors out of the box:

| Semantic Color | Default Mapping | Purpose |
|----------------|-----------------|---------|
| `primary` | `green` | Main CTAs, active navigation, brand elements, important links |
| `secondary` | `blue` | Secondary buttons, alternative actions, complementary UI |
| `success` | `green` | Success messages, completed states, positive confirmations |
| `info` | `blue` | Info alerts, tooltips, help text, neutral notifications |
| `warning` | `yellow` | Warning messages, pending states, attention-needed items |
| `error` | `red` | Error messages, validation errors, destructive actions |
| `neutral` | `slate` | Text, borders, backgrounds, disabled states |

---

## Using Semantic Colors in Components

All Nuxt UI components that support the `color` prop accept semantic color names:

### Buttons
```vue
<template>
  <UButton color="primary">Save</UButton>
  <UButton color="secondary">Cancel</UButton>
  <UButton color="error">Delete</UButton>
</template>
```

### Alerts
```vue
<template>
  <UAlert color="success" title="Success!" />
  <UAlert color="warning" title="Warning!" />
  <UAlert color="error" title="Error!" />
</template>
```

### Badges
```vue
<template>
  <UBadge color="primary">New</UBadge>
  <UBadge color="info">Beta</UBadge>
  <UBadge color="success">Active</UBadge>
</template>
```

### Any Component with Color Prop
```vue
<template>
  <UCard color="primary" />
  <UChip color="warning" />
  <UProgress color="success" />
</template>
```

---

## Runtime Configuration

You can change which Tailwind color each semantic color maps to at runtime, without restarting your dev server.

### Nuxt Configuration

**File:** `app.config.ts`

```typescript
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',      // Change primary from green to blue
      secondary: 'purple',  // Change secondary from blue to purple
      neutral: 'zinc'       // Change neutral from slate to zinc
    }
  }
})
```

### Vue Configuration

**File:** `vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ui from '@nuxt/ui/vite'

export default defineConfig({
  plugins: [
    vue(),
    ui({
      ui: {
        colors: {
          primary: 'blue',
          secondary: 'purple',
          neutral: 'zinc'
        }
      }
    })
  ]
})
```

---

## Available Color Options

You can map semantic colors to:

### Tailwind Default Colors

Any color from the [Tailwind CSS default palette](https://tailwindcss.com/docs/colors):

- `slate`, `gray`, `zinc`, `neutral`, `stone`
- `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`

### Custom Colors

Colors you define in your theme using the `@theme` directive:

```css [app/assets/css/main.css]
@import "tailwindcss";
@import "@nuxt/ui";

@theme static {
  /* Define custom brand color with all shades */
  --color-brand-50: #fef2f2;
  --color-brand-100: #fee2e2;
  --color-brand-200: #fecaca;
  --color-brand-300: #fca5a5;
  --color-brand-400: #f87171;
  --color-brand-500: #ef4444;
  --color-brand-600: #dc2626;
  --color-brand-700: #b91c1c;
  --color-brand-800: #991b1b;
  --color-brand-900: #7f1d1d;
  --color-brand-950: #450a0a;
}
```

Then use it in config:

```typescript [app.config.ts]
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'brand'  // Use custom brand color
    }
  }
})
```

### Important Rules

1. **Must have all shades** - Every color must define shades from `50` to `950`
2. **Can't use solid colors in config** - Colors like `black`, `white` don't have shades
   - To use solid colors, set them via CSS variables (see Design Tokens Reference)
3. **Must exist in theme** - Color must be defined before you can use it

---

## Extending the Color System

You can add additional semantic colors beyond the defaults (e.g., adding a `tertiary` color).

### Step 1: Register the New Color

**Nuxt:**
```typescript [nuxt.config.ts]
export default defineNuxtConfig({
  ui: {
    theme: {
      colors: [
        'primary',
        'secondary',
        'tertiary',  // Add new semantic color
        'info',
        'success',
        'warning',
        'error'
      ]
    }
  }
})
```

**Vue:**
```typescript [vite.config.ts]
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ui from '@nuxt/ui/vite'

export default defineConfig({
  plugins: [
    vue(),
    ui({
      theme: {
        colors: [
          'primary',
          'secondary',
          'tertiary',  // Add new semantic color
          'info',
          'success',
          'warning',
          'error'
        ]
      }
    })
  ]
})
```

### Step 2: Assign a Color Value

**Nuxt:**
```typescript [app.config.ts]
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      secondary: 'purple',
      tertiary: 'indigo'  // Map to Tailwind color
    }
  }
})
```

**Vue:**
```typescript [vite.config.ts]
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ui from '@nuxt/ui/vite'

export default defineConfig({
  plugins: [
    vue(),
    ui({
      theme: {
        colors: ['primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'error']
      },
      ui: {
        colors: {
          primary: 'blue',
          secondary: 'purple',
          tertiary: 'indigo'
        }
      }
    })
  ]
})
```

### Step 3: Use the New Color

```vue
<template>
  <UButton color="tertiary">
    Special Action
  </UButton>

  <!-- Also available as utility classes -->
  <div class="text-tertiary bg-tertiary border-tertiary">
    Content
  </div>
</template>
```

---

## Real-World Examples

### Multi-Brand Application

Support multiple brands with different color schemes:

```typescript [app.config.ts]
// Brand A config
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      secondary: 'cyan',
      neutral: 'slate'
    }
  }
})

// Brand B config
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'purple',
      secondary: 'pink',
      neutral: 'zinc'
    }
  }
})
```

### Accessibility-Focused Colors

Use highly contrasting colors for better accessibility:

```typescript [app.config.ts]
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',      // WCAG AAA compliant
      secondary: 'teal',
      error: 'red',
      success: 'green',
      warning: 'amber',     // Better contrast than yellow
      info: 'sky',
      neutral: 'slate'
    }
  }
})
```

### Monochromatic Theme

Use variations of a single color:

```typescript [app.config.ts]
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      secondary: 'sky',      // Lighter blue
      info: 'indigo',        // Related hue
      success: 'teal',       // Related hue
      warning: 'amber',
      error: 'red',
      neutral: 'slate'
    }
  }
})
```

---

## Color Variants in Components

Nuxt UI components use semantic colors through their `color` prop, which determines:
- Background colors
- Text colors
- Border colors
- Hover/active states
- Focus rings

These are all derived from the single semantic color name.

### Example: Button Color Variants

```vue
<template>
  <!-- All use the "primary" semantic color -->
  <UButton color="primary" variant="solid">Solid Primary</UButton>
  <UButton color="primary" variant="outline">Outline Primary</UButton>
  <UButton color="primary" variant="soft">Soft Primary</UButton>
  <UButton color="primary" variant="ghost">Ghost Primary</UButton>

  <!-- Each variant uses different shades of primary color -->
</template>
```

Internally, each variant uses different shades:
- **Solid**: Uses `primary-500` background with white text
- **Outline**: Uses `primary-500` border with `primary` text
- **Soft**: Uses `primary-50` background with `primary-700` text
- **Ghost**: Uses transparent background with `primary` text

All automatically adjust for light/dark mode.

---

## Best Practices

### 1. Use Semantic Colors Everywhere

**Good:**
```vue
<UButton color="primary">Save</UButton>
<UButton color="error">Delete</UButton>
```

**Bad:**
```vue
<UButton class="bg-blue-500">Save</UButton>
<UButton class="bg-red-500">Delete</UButton>
```

### 2. Map Colors Based on Purpose

**Good:**
```typescript
{
  primary: 'blue',      // Calm, trustworthy
  error: 'red',         // Danger, stop
  success: 'green',     // Go, success
  warning: 'amber'      // Caution
}
```

**Bad:**
```typescript
{
  primary: 'red',       // Aggressive for primary actions
  error: 'green',       // Confusing, wrong association
  success: 'blue'       // Weak success feedback
}
```

### 3. Limit Custom Semantic Colors

Only add new semantic colors if they serve a clear purpose:

**Good reasons:**
- `tertiary` for a third tier of actions
- `accent` for highlighting special features
- `brand` specifically for logo/brand colors

**Bad reasons:**
- `lightblue` - Too specific, defeats semantic purpose
- `button1`, `button2` - Not semantic, just naming colors
- `mycolor` - Unclear purpose

### 4. Test in Both Light and Dark Modes

Always verify your color choices work in both modes:

```vue
<template>
  <div>
    <UButton color="primary">Test Primary</UButton>
    <!-- Toggle color mode to test -->
    <UColorModeButton />
  </div>
</template>
```

### 5. Consider Color Blindness

Ensure your color system isn't the only way to convey information:

```vue
<template>
  <!-- Good: Icon + color -->
  <UAlert color="error" icon="i-lucide-alert-circle">
    Error message
  </UAlert>

  <!-- Bad: Color only -->
  <div class="text-error">
    Error message
  </div>
</template>
```

### 6. Document Your Color Meanings

If you add custom semantic colors, document their purpose:

```typescript [app.config.ts]
export default defineAppConfig({
  ui: {
    colors: {
      // Core brand color for primary CTAs and navigation
      primary: 'blue',

      // Secondary actions and alternative CTAs
      secondary: 'purple',

      // Special promotions and featured content (custom)
      accent: 'pink',

      // Neutral elements, text, and borders
      neutral: 'slate'
    }
  }
})
```

---

## Troubleshooting

### "Color not found" Error

**Problem:** Using a color that doesn't exist in your theme

```typescript
// ❌ Error: 'mycolor' is not defined
colors: {
  primary: 'mycolor'
}
```

**Solution:** Define the color in your theme first

```css [app/assets/css/main.css]
@theme static {
  --color-mycolor-50: #...;
  --color-mycolor-100: #...;
  /* ... all shades 50-950 ... */
  --color-mycolor-950: #...;
}
```

### Solid Colors Don't Work

**Problem:** Trying to use `black` or `white` in config

```typescript
// ❌ Error: 'black' doesn't have shades
colors: {
  primary: 'black'
}
```

**Solution:** Set via CSS variables instead

```css [app/assets/css/main.css]
:root {
  --ui-primary: black;
}

.dark {
  --ui-primary: white;
}
```

### Colors Don't Update

**Problem:** Changed colors in app.config.ts but UI didn't update

**Nuxt Solution:** Hot-reload should work automatically, but try:
1. Save the file again
2. Restart dev server if needed

**Vue Solution:** Vite config changes require full restart:
1. Stop dev server (Ctrl+C)
2. Run `npm run dev` again

### Wrong Shades in Dark Mode

**Problem:** Color looks wrong in dark mode

**Solution:** Adjust the shade used via CSS variables

```css [app/assets/css/main.css]
/* Default uses -500 in light, -400 in dark */
:root {
  --ui-primary: var(--ui-color-primary-600);  /* Darker in light */
}

.dark {
  --ui-primary: var(--ui-color-primary-300);  /* Lighter in dark */
}
```

---

## Quick Reference

### Configuration Locations

| Task | Nuxt File | Vue File |
|------|-----------|----------|
| Map semantic colors | `app.config.ts` | `vite.config.ts` (ui.ui.colors) |
| Register new colors | `nuxt.config.ts` | `vite.config.ts` (ui.theme.colors) |
| Define custom colors | `app/assets/css/main.css` | `src/assets/main.css` |
| Override shades | `app/assets/css/main.css` | `src/assets/main.css` |

### Default Color Mappings

```typescript
{
  primary: 'green',
  secondary: 'blue',
  success: 'green',
  info: 'blue',
  warning: 'yellow',
  error: 'red',
  neutral: 'slate'
}
```

### Common Tasks Cheatsheet

**Change primary color:**
```typescript [app.config.ts]
export default defineAppConfig({
  ui: { colors: { primary: 'blue' } }
})
```

**Add tertiary color:**
```typescript [nuxt.config.ts + app.config.ts]
// 1. Register
export default defineNuxtConfig({
  ui: { theme: { colors: [..., 'tertiary'] } }
})

// 2. Assign
export default defineAppConfig({
  ui: { colors: { tertiary: 'indigo' } }
})
```

**Use solid colors:**
```css [main.css]
:root { --ui-primary: black; }
.dark { --ui-primary: white; }
```