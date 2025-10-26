# Nuxt UI Component Reference & Customization Guide

This skill provides comprehensive reference for all Nuxt UI v4 components, their architecture patterns, and customization best practices.

## When to Use This Skill

Use this skill when:
- Customizing Nuxt UI component styles or behavior
- Understanding component props, slots, and variants
- Looking up component API reference
- Implementing theme customizations
- Working with component categories and patterns

## Component Architecture Overview

### Tailwind Variants System

Nuxt UI components use the **Tailwind Variants API** for styling. This provides:
- **Slots**: Different parts of a component (root, header, body, footer, etc.)
- **Variants**: Dynamic style variations based on props (color, size, variant)
- **Compound Variants**: Styles applied when multiple conditions are met
- **Default Variants**: Default values for variant props

### Component Structure Pattern

Every Nuxt UI component follows this structure:

```typescript
{
  slots: {
    root: 'base styles for root element',
    base: 'alternative to root for simple components',
    // ... additional slots (header, body, footer, etc.)
  },
  variants: {
    color: { primary: '...', secondary: '...', neutral: '...' },
    variant: { solid: '...', outline: '...', soft: '...', subtle: '...', ghost: '...', link: '...' },
    size: { xs: '...', sm: '...', md: '...', lg: '...', xl: '...' }
  },
  compoundVariants: [
    { color: 'primary', variant: 'solid', class: '...' }
  ],
  defaultVariants: {
    color: 'primary',
    variant: 'solid',
    size: 'md'
  }
}
```

## Component Categories (110+ Components)

### Element Components (Basic UI Elements)
- **Alert** - Callouts to draw user attention
- **Avatar** - User image with fallback
- **AvatarGroup** - Stacked avatars
- **Badge** - Status or category labels
- **Banner** - Top-of-page notifications
- **Button** - Interactive button/link element
- **Calendar** - Date selection
- **Card** - Content container with header/body/footer
- **Chip** - Numeric indicators
- **Collapsible** - Expandable content
- **FieldGroup** - Group button-like elements
- **Icon** - Iconify icons
- **Kbd** - Keyboard key display
- **Progress** - Progress indicator
- **Separator** - Visual divider
- **Skeleton** - Loading placeholder

### Form Components
- **Checkbox** - Toggle checked/unchecked
- **CheckboxGroup** - Multiple checkbox selection
- **ColorPicker** - Color selection
- **FileUpload** - File input
- **Form** - Form with validation
- **FormField** - Form element wrapper
- **Input** - Text input
- **InputMenu** - Autocomplete input
- **InputNumber** - Numeric input
- **InputTags** - Tag input
- **PinInput** - PIN code input
- **RadioGroup** - Single option selection
- **Select** - Dropdown selection
- **SelectMenu** - Advanced searchable select
- **Slider** - Range slider
- **Switch** - Toggle switch
- **Textarea** - Multi-line text input

### Navigation Components
- **Breadcrumb** - Hierarchy navigation
- **Link** - Enhanced NuxtLink
- **NavigationMenu** - Menu list
- **Pagination** - Page navigation
- **Stepper** - Step indicator
- **Tabs** - Tabbed content
- **FooterColumns** - Footer link columns

### Overlay Components
- **ContextMenu** - Right-click menu
- **Drawer** - Slide-in panel
- **DropdownMenu** - Click menu
- **Modal** - Dialog window
- **Popover** - Floating content
- **Slideover** - Side panel
- **Toast** - Notification
- **Tooltip** - Hover info

### Layout Components
- **App** - Global app wrapper
- **Container** - Centered content
- **Error** - Error display
- **Footer** - Footer component
- **Header** - Header component
- **Main** - Main content area

### Data Components
- **Accordion** - Collapsible panels
- **Carousel** - Image/content slider
- **Empty** - Empty state display
- **Marquee** - Infinite scroll
- **Table** - Data table
- **Timeline** - Event timeline
- **Tree** - Hierarchical data
- **User** - User info display

### Page Components (Pre-built Page Sections)
- **Page** - Page grid layout
- **PageAnchors** - Anchor list
- **PageAside** - Sticky sidebar
- **PageBody** - Main content
- **PageCard** - Feature card
- **PageColumns** - Multi-column layout
- **PageCTA** - Call-to-action section
- **PageFeature** - Feature showcase
- **PageGrid** - Responsive grid
- **PageHeader** - Page header
- **PageHero** - Hero section
- **PageLinks** - Link list
- **PageList** - Vertical list
- **PageLogos** - Logo showcase
- **PageSection** - Page section

### Dashboard Components
- **DashboardGroup** - Dashboard layout
- **DashboardNavbar** - Dashboard nav
- **DashboardPanel** - Resizable panel
- **DashboardResizeHandle** - Resize handle
- **DashboardSearch** - Dashboard search
- **DashboardSearchButton** - Search trigger
- **DashboardSidebar** - Dashboard sidebar
- **DashboardSidebarCollapse** - Collapse button
- **DashboardSidebarToggle** - Mobile toggle
- **DashboardToolbar** - Toolbar

### Content Components (Nuxt Content Integration)
- **ContentNavigation** - Page navigation
- **ContentSearch** - Content search
- **ContentSearchButton** - Search button
- **ContentSurround** - Prev/next links
- **ContentToc** - Table of contents

### Chat Components (AI Integration)
- **ChatMessage** - Single message
- **ChatMessages** - Message list (Vercel AI SDK compatible)
- **ChatPalette** - Chat overlay
- **ChatPrompt** - Message input
- **ChatPromptSubmit** - Submit button

### Color Mode Components
- **ColorModeAvatar** - Light/dark avatar
- **ColorModeButton** - Mode toggle
- **ColorModeImage** - Light/dark image
- **ColorModeSelect** - Mode selector
- **ColorModeSwitch** - Mode switch

### Pre-built Page Templates
- **AuthForm** - Login/register forms
- **BlogPost** - Blog article
- **BlogPosts** - Blog post grid
- **ChangelogVersion** - Changelog entry
- **ChangelogVersions** - Changelog timeline
- **PricingPlan** - Pricing card
- **PricingPlans** - Pricing grid
- **PricingTable** - Comparison table

### i18n Components
- **LocaleSelect** - Language selector

## Common Component Props Patterns

### Standard Props (Most Components)
```typescript
{
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  variant?: 'solid' | 'outline' | 'soft' | 'subtle' | 'ghost' | 'link'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  class?: string | object
  ui?: { [slot: string]: ClassNameValue }
}
```

### Icon Props Pattern
```typescript
{
  icon?: string | object           // Main icon (position based on leading/trailing)
  leadingIcon?: string | object    // Specific left icon
  trailingIcon?: string | object   // Specific right icon
  leading?: boolean                // Position icon on left
  trailing?: boolean               // Position icon on right
}
```

### Avatar Props Pattern
```typescript
{
  avatar?: {
    src?: string
    alt?: string
    icon?: string | object
    text?: string
    size?: '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
    chip?: boolean | ChipProps
  }
}
```

### Loading State Pattern
```typescript
{
  loading?: boolean                // Manual loading state
  loadingAuto?: boolean           // Auto loading from promise
  loadingIcon?: string | object   // Custom loading icon (default: 'i-lucide-loader-circle')
}
```

### Link Props Pattern (Button, Link components)
```typescript
{
  to?: string | RouteLocation
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  external?: boolean
  active?: boolean
  activeColor?: string
  activeVariant?: string
  activeClass?: string
  inactiveClass?: string
}
```

## Theme Customization Methods

### 1. CSS Variables (Design Tokens)

Located in `assets/css/main.css`:

```css
@import "tailwindcss";
@import "@nuxt/ui";

:root {
  /* Semantic Colors */
  --ui-primary: var(--ui-color-primary-500);
  --ui-secondary: var(--ui-color-secondary-500);

  /* Text Colors */
  --ui-text: var(--ui-color-neutral-700);
  --ui-text-dimmed: var(--ui-color-neutral-400);
  --ui-text-muted: var(--ui-color-neutral-500);
  --ui-text-highlighted: var(--ui-color-neutral-900);

  /* Background Colors */
  --ui-bg: var(--color-white);
  --ui-bg-muted: var(--ui-color-neutral-50);
  --ui-bg-elevated: var(--ui-color-neutral-100);
  --ui-bg-accented: var(--ui-color-neutral-200);

  /* Border Colors */
  --ui-border: var(--ui-color-neutral-200);
  --ui-border-accented: var(--ui-color-neutral-300);

  /* Border Radius */
  --ui-radius: 0.25rem;

  /* Container Width */
  --ui-container: var(--container-7xl);

  /* Header Height */
  --ui-header-height: --spacing(16);
}

.dark {
  --ui-primary: var(--ui-color-primary-400);
  --ui-text: var(--ui-color-neutral-200);
  --ui-bg: var(--ui-color-neutral-900);
  /* ... dark mode overrides */
}
```

**Available CSS Variable Classes:**
- Colors: `text-primary`, `bg-success`, `border-error`, etc.
- Text: `text-dimmed`, `text-muted`, `text-default`, `text-highlighted`, `text-inverted`
- Background: `bg-default`, `bg-muted`, `bg-elevated`, `bg-accented`, `bg-inverted`
- Border: `border-default`, `border-muted`, `border-accented`, `border-inverted`
- Radius: `rounded-xs` through `rounded-3xl` (all based on `--ui-radius`)

### 2. Tailwind Theme Configuration

In `assets/css/main.css`:

```css
@theme {
  /* Fonts */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Colors - Define all shades 50-950 */
  --color-brand-50: #fef2f2;
  --color-brand-100: #fee2e2;
  /* ... 200-900 */
  --color-brand-950: #450a0a;

  /* Breakpoints */
  --breakpoint-3xl: 1920px;
  --breakpoint-4xl: 2560px;
}
```

### 3. Runtime Color Configuration

In `app.config.ts`:

```typescript
export default defineAppConfig({
  ui: {
    // Semantic color mapping
    colors: {
      primary: 'green',      // Use any Tailwind color or custom color
      secondary: 'blue',
      neutral: 'slate',
      // Can add custom semantic colors if registered in nuxt.config.ts
    }
  }
})
```

**Extending Semantic Colors:**

In `nuxt.config.ts`:
```typescript
export default defineNuxtConfig({
  ui: {
    theme: {
      colors: [
        'primary',
        'secondary',
        'tertiary',    // Add custom semantic color
        'info',
        'success',
        'warning',
        'error'
      ]
    }
  }
})
```

Then assign in `app.config.ts`:
```typescript
export default defineAppConfig({
  ui: {
    colors: {
      tertiary: 'indigo'
    }
  }
})
```

### 4. Global Component Theme Overrides

In `app.config.ts`:

```typescript
export default defineAppConfig({
  ui: {
    button: {
      // Override slots
      slots: {
        base: 'font-bold transition-all duration-200'
      },

      // Override or add variants
      variants: {
        size: {
          md: {
            base: 'px-4 py-2.5',
            leadingIcon: 'size-5'
          },
          '2xl': {  // Add new size variant
            base: 'px-6 py-4 text-xl',
            leadingIcon: 'size-8'
          }
        },
        rounded: {  // Add new variant
          true: {
            base: 'rounded-full'
          }
        }
      },

      // Override compound variants
      compoundVariants: [{
        color: 'neutral',
        variant: 'outline',
        class: 'ring-2 ring-offset-2'
      }],

      // Change defaults
      defaultVariants: {
        color: 'neutral',
        variant: 'outline',
        size: 'md'
      }
    },

    input: {
      slots: {
        base: 'border-2 focus:border-primary'
      },
      defaultVariants: {
        variant: 'outline',
        size: 'lg'
      }
    }
  }
})
```

### 5. Component-Level Customization

**Using the `ui` Prop:**
```vue
<template>
  <!-- Override specific slots -->
  <UButton
    :ui="{
      base: 'rounded-full shadow-lg',
      leadingIcon: 'size-6 text-primary',
      label: 'uppercase tracking-wide'
    }"
  >
    Custom Button
  </UButton>

  <UCard
    :ui="{
      root: 'shadow-2xl border-2',
      header: 'bg-primary text-white',
      body: 'p-8'
    }"
  >
    <template #header>Custom Card</template>
    Content here
  </UCard>
</template>
```

**Using the `class` Prop:**
```vue
<template>
  <!-- Override root/base slot classes -->
  <UButton class="font-extrabold rounded-full">
    Styled Button
  </UButton>

  <!-- Tailwind merge handles conflicts -->
  <UInput class="border-4 border-blue-500" />
</template>
```

## Component Customization Best Practices

### 1. Understand Slot Structure
Before customizing, check the component's slot structure:
- Simple components have only `base` slot (e.g., Container)
- Complex components have multiple slots (e.g., Card: root, header, body, footer)

### 2. Use Semantic Colors
Instead of hardcoding colors, use semantic color props:
```vue
<!-- Good: Uses semantic colors -->
<UButton color="primary">Save</UButton>
<UAlert color="error">Error occurred</UAlert>

<!-- Avoid: Hardcoded colors -->
<UButton class="bg-green-500">Save</UButton>
```

### 3. Customize at the Right Level
- **CSS Variables**: For design tokens (colors, spacing, radius)
- **Global Config**: For consistent component defaults across app
- **Component Props**: For instance-specific customization

### 4. Leverage Variants
Create reusable variants instead of repeating `class` or `ui` props:

```typescript
// app.config.ts
export default defineAppConfig({
  ui: {
    button: {
      variants: {
        intent: {
          danger: {
            base: 'bg-red-500 hover:bg-red-600 text-white'
          },
          success: {
            base: 'bg-green-500 hover:bg-green-600 text-white'
          }
        }
      }
    }
  }
})
```

```vue
<UButton intent="danger">Delete</UButton>
```

### 5. Use Compound Variants for Complex Combinations
When styles depend on multiple props:

```typescript
compoundVariants: [
  {
    size: 'lg',
    variant: 'solid',
    class: 'shadow-xl'
  }
]
```

## Working with Specific Component Types

### Form Components with Validation

```vue
<script setup>
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

const state = reactive({
  email: '',
  password: ''
})

async function onSubmit() {
  console.log('Submitting', state)
}
</script>

<template>
  <UForm :schema="schema" :state="state" @submit="onSubmit">
    <UFormField name="email" label="Email">
      <UInput v-model="state.email" type="email" />
    </UFormField>

    <UFormField name="password" label="Password">
      <UInput v-model="state.password" type="password" />
    </UFormField>

    <UButton type="submit" loading-auto>
      Submit
    </UButton>
  </UForm>
</template>
```

### Overlay Components (Modal, Slideover)

```vue
<script setup>
const isOpen = ref(false)
</script>

<template>
  <UButton @click="isOpen = true">Open Modal</UButton>

  <UModal
    v-model:open="isOpen"
    title="Modal Title"
    description="Modal description"
    :ui="{
      content: 'max-w-4xl',
      header: 'bg-primary text-white'
    }"
  >
    <template #body>
      <p>Modal content</p>
    </template>

    <template #footer>
      <div class="flex gap-2 justify-end">
        <UButton variant="outline" @click="isOpen = false">Cancel</UButton>
        <UButton>Confirm</UButton>
      </div>
    </template>
  </UModal>
</template>
```

### Icon Usage

```vue
<template>
  <!-- Using Iconify icons (requires @nuxt/icon) -->
  <UButton icon="i-lucide-rocket">Launch</UButton>
  <UButton leading-icon="i-heroicons-arrow-left">Back</UButton>
  <UButton trailing-icon="i-heroicons-arrow-right">Next</UButton>

  <!-- Icon-only button -->
  <UButton icon="i-lucide-settings" square />
</template>
```

### Color Mode Adaptive Components

```vue
<template>
  <!-- Image changes based on color mode -->
  <UColorModeImage
    light="/logo-light.png"
    dark="/logo-dark.png"
    alt="Logo"
  />

  <!-- Avatar changes based on color mode -->
  <UColorModeAvatar
    light="/avatar-light.jpg"
    dark="/avatar-dark.jpg"
  />

  <!-- Manual color mode toggle -->
  <UColorModeButton />
  <UColorModeSelect />
  <UColorModeSwitch />
</template>
```

## Quick Reference: Common Customizations

### Border Radius Changes
```css
/* assets/css/main.css */
:root {
  --ui-radius: 0.5rem;  /* More rounded */
}
```

### Container Width
```css
:root {
  --ui-container: var(--container-6xl);  /* Narrower */
}
```

### Default Button Styles
```typescript
// app.config.ts
export default defineAppConfig({
  ui: {
    button: {
      defaultVariants: {
        color: 'neutral',
        variant: 'outline'
      }
    }
  }
})
```

### Loading Icon
```typescript
// app.config.ts - Change globally
export default defineAppConfig({
  ui: {
    icons: {
      loading: 'i-lucide-loader'
    }
  }
})
```

### Form Input Styles
```typescript
export default defineAppConfig({
  ui: {
    input: {
      slots: {
        base: 'focus:ring-2 focus:ring-primary'
      },
      variants: {
        variant: {
          outline: {
            base: 'border-2'
          }
        }
      }
    }
  }
})
```

## Component Discovery Tools

The Nuxt UI MCP server provides tools for component discovery:

1. **list_components()** - Get all 110+ components with categories
2. **get_component(name)** - Get full documentation for a component
3. **get_component_metadata(name)** - Get props, slots, and events
4. **search_components_by_category(category)** - Filter by category

## Key Architecture Insights

1. **All styling uses Tailwind Variants** - No CSS-in-JS or style objects
2. **Semantic color system** - Always use color props, not hardcoded colors
3. **Slots-based customization** - Every visual part is a customizable slot
4. **CSS variable foundation** - All colors/spacing use CSS variables for theming
5. **Tailwind merge integration** - Class conflicts are automatically resolved
6. **Type-safe props** - Full TypeScript support with detailed prop types
7. **Composable-driven** - Use `useOverlay()`, `useToast()`, etc. for programmatic control

## Resources

- Component Docs: https://ui.nuxt.com/docs/components
- Theme Customization: https://ui.nuxt.com/docs/getting-started/theme
- GitHub Source: https://github.com/nuxt/ui/tree/v4/src/theme
- Tailwind Variants: https://www.tailwind-variants.org/
