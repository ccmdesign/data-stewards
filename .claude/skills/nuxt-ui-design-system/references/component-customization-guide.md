# Component Customization Guide

This document explains how Nuxt UI components are structured and how to customize them using the Tailwind Variants API.

## Tailwind Variants API

Nuxt UI components are styled using [Tailwind Variants](https://www.tailwind-variants.org/), a powerful library for creating component variants with Tailwind CSS classes.

### Key Concepts

1. **Slots** - Different parts/elements within a component
2. **Variants** - Dynamic style changes based on props
3. **Compound Variants** - Styles applied when multiple conditions are met
4. **Default Variants** - Default values for variant props
5. **Customization Hierarchy** - Order of style precedence

---

## Understanding Slots

Slots represent distinct HTML elements or sections within a component. They allow flexible content insertion and targeted styling.

### Components with Multiple Slots

Example: **Card Component**

```typescript [src/theme/card.ts]
export default {
  slots: {
    root: 'bg-default ring ring-default divide-y divide-default rounded-lg',
    header: 'p-4 sm:px-6',
    body: 'p-4 sm:p-6',
    footer: 'p-4 sm:px-6'
  }
}
```

Rendered component structure:

```vue [src/runtime/components/Card.vue]
<template>
  <div :class="ui.root({ class: [props.ui?.root, props.class] })">
    <!-- header slot -->
    <div :class="ui.header({ class: props.ui?.header })">
      <slot name="header" />
    </div>

    <!-- body slot (default) -->
    <div :class="ui.body({ class: props.ui?.body })">
      <slot />
    </div>

    <!-- footer slot -->
    <div :class="ui.footer({ class: props.ui?.footer })">
      <slot name="footer" />
    </div>
  </div>
</template>
```

Usage:

```vue
<template>
  <UCard>
    <template #header>
      Card Header
    </template>

    Card Body

    <template #footer>
      Card Footer
    </template>
  </UCard>
</template>
```

### Components with Single Element (No Slots)

Example: **Container Component**

```typescript [src/theme/container.ts]
export default {
  base: 'max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8'
}
```

Rendered component:

```vue [src/runtime/components/Container.vue]
<template>
  <div :class="container({ class: props.class })">
    <slot />
  </div>
</template>
```

**Important:** Components without slots don't have a `ui` prop, only `class` prop.

---

## Understanding Variants

Variants allow dynamic style adjustments based on component props.

### Basic Variant Example

**Avatar Component:**

```typescript [src/theme/avatar.ts]
export default {
  slots: {
    root: 'inline-flex items-center justify-center rounded-full',
    image: 'h-full w-full rounded-[inherit] object-cover'
  },
  variants: {
    size: {
      sm: {
        root: 'size-7 text-sm'
      },
      md: {
        root: 'size-8 text-base'
      },
      lg: {
        root: 'size-9 text-lg'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
}
```

Usage:

```vue
<template>
  <!-- Uses md size (default) -->
  <UAvatar src="https://github.com/nuxt.png" />

  <!-- Explicitly set size -->
  <UAvatar src="https://github.com/nuxt.png" size="sm" />
  <UAvatar src="https://github.com/nuxt.png" size="lg" />
</template>
```

### Multiple Variants

Components can have multiple variant props:

```typescript
{
  variants: {
    size: {
      sm: { /* ... */ },
      md: { /* ... */ },
      lg: { /* ... */ }
    },
    color: {
      primary: { /* ... */ },
      secondary: { /* ... */ },
      neutral: { /* ... */ }
    },
    variant: {
      solid: { /* ... */ },
      outline: { /* ... */ },
      ghost: { /* ... */ }
    }
  }
}
```

---

## Default Variants

The `defaultVariants` property sets default values when no prop is passed.

```typescript
{
  defaultVariants: {
    size: 'md',
    color: 'primary',
    variant: 'solid'
  }
}
```

### Overriding Defaults Globally

**Nuxt:**

```typescript [nuxt.config.ts]
export default defineNuxtConfig({
  ui: {
    theme: {
      defaultVariants: {
        size: 'lg',    // All components default to lg
        color: 'blue'  // All components default to blue
      }
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
        defaultVariants: {
          size: 'lg',
          color: 'blue'
        }
      }
    })
  ]
})
```

---

## Compound Variants

Compound variants apply styles when multiple variant conditions are met simultaneously.

### Example: Button Color + Variant Combinations

```typescript [src/theme/button.ts]
{
  variants: {
    color: {
      primary: '',
      neutral: ''
    },
    variant: {
      solid: '',
      outline: '',
      soft: ''
    }
  },
  compoundVariants: [
    // Specific styling for primary + outline
    {
      color: 'primary',
      variant: 'outline',
      class: 'ring ring-inset ring-primary/50 text-primary hover:bg-primary/10'
    },
    // Specific styling for neutral + outline
    {
      color: 'neutral',
      variant: 'outline',
      class: 'ring ring-inset ring-accented text-default hover:bg-elevated'
    },
    // Specific styling for primary + soft
    {
      color: 'primary',
      variant: 'soft',
      class: 'bg-primary/10 text-primary hover:bg-primary/20'
    }
  ]
}
```

Usage:

```vue
<template>
  <!-- Triggers primary + outline compound variant -->
  <UButton color="primary" variant="outline">
    Primary Outline
  </UButton>

  <!-- Triggers neutral + outline compound variant -->
  <UButton color="neutral" variant="outline">
    Neutral Outline
  </UButton>
</template>
```

---

## Customization Hierarchy

Nuxt UI uses a specific order for applying styles, from lowest to highest priority:

```
1. Base theme (built-in)
   ↓
2. Global config (app.config.ts / vite.config.ts)
   ↓
3. Variant styles (resolved from props)
   ↓
4. ui prop (per-component override)
   ↓
5. class prop (highest priority)
```

### 1. Base Theme (Built-in)

The default component styles defined in `src/theme/`.

```typescript [src/theme/button.ts]
export default {
  slots: {
    base: 'rounded-md font-medium inline-flex items-center'
  }
}
```

### 2. Global Config

Override theme globally for all instances of a component.

**Nuxt:**

```typescript [app.config.ts]
export default defineAppConfig({
  ui: {
    button: {
      slots: {
        base: 'font-bold'  // Override font-medium with font-bold
      },
      variants: {
        size: {
          md: {
            base: 'px-6 py-3'  // Override default padding
          }
        }
      }
    }
  }
})
```

**Vue:**

```typescript [vite.config.ts]
export default defineConfig({
  plugins: [
    vue(),
    ui({
      ui: {
        button: {
          slots: {
            base: 'font-bold'
          },
          variants: {
            size: {
              md: {
                base: 'px-6 py-3'
              }
            }
          }
        }
      }
    })
  ]
})
```

### 3. Variant Styles

Automatically applied based on component props like `size`, `color`, `variant`.

```vue
<template>
  <!-- size="lg" applies the lg variant styles -->
  <UButton size="lg">Large Button</UButton>
</template>
```

### 4. UI Prop

Override specific slots on a per-component basis.

```vue
<template>
  <UButton
    :ui="{
      base: 'font-black',  // Override base slot
      leadingIcon: 'size-6'  // Override leadingIcon slot
    }"
  >
    Custom Button
  </UButton>
</template>
```

The `ui` prop takes priority over global config and variants:

```vue
<template>
  <!-- Even though size="md" would apply size-5 to icon,
       ui prop overrides it with size-3 -->
  <UButton
    size="md"
    trailing-icon="i-lucide-arrow-right"
    :ui="{ trailingIcon: 'size-3' }"
  >
    Button
  </UButton>
</template>
```

### 5. Class Prop

The `class` prop has the highest priority and overrides the `root` or `base` slot.

```vue
<template>
  <!-- class prop overrides all other styles on root/base -->
  <UButton class="font-bold rounded-full">
    Button
  </UButton>

  <UCard class="border-2 border-primary">
    Card
  </UCard>
</template>
```

---

## Practical Customization Examples

### Example 1: Customize All Buttons Globally

**Goal:** Make all buttons bold and slightly larger

```typescript [app.config.ts]
export default defineAppConfig({
  ui: {
    button: {
      slots: {
        base: 'font-bold'  // All buttons now bold
      },
      variants: {
        size: {
          md: {
            base: 'px-5 py-2.5 text-base'  // Slightly larger md size
          }
        }
      },
      defaultVariants: {
        size: 'md',
        variant: 'solid'
      }
    }
  }
})
```

Now all buttons use these styles:

```vue
<template>
  <!-- Automatically uses custom styles -->
  <UButton>Save</UButton>
  <UButton>Cancel</UButton>
</template>
```

### Example 2: Create a Special Button Style

**Goal:** One-off custom button without affecting all buttons

```vue
<template>
  <UButton
    :ui="{
      base: 'font-black uppercase tracking-wider',
      label: 'text-sm'
    }"
    class="rounded-full px-8"
  >
    Special CTA
  </UButton>
</template>
```

### Example 3: Override Compound Variant

**Goal:** Change the outline neutral button style globally

```typescript [app.config.ts]
export default defineAppConfig({
  ui: {
    button: {
      compoundVariants: [
        {
          color: 'neutral',
          variant: 'outline',
          class: 'ring-2 ring-default hover:bg-muted'  // New style
        }
      ]
    }
  }
})
```

### Example 4: Customize Card Slots

**Goal:** Add custom padding and background to card sections

```vue
<template>
  <UCard
    :ui="{
      root: 'shadow-lg',
      header: 'bg-muted p-6',
      body: 'p-8',
      footer: 'bg-elevated p-6 border-t border-default'
    }"
  >
    <template #header>Header</template>
    Body content
    <template #footer>Footer</template>
  </UCard>
</template>
```

### Example 5: Responsive Variants

**Goal:** Different button size on mobile vs desktop

```vue
<template>
  <UButton
    class="text-sm sm:text-base px-3 py-1.5 sm:px-4 sm:py-2"
  >
    Responsive Button
  </UButton>
</template>
```

---

## Finding Component Theme Structure

### Method 1: Documentation

Visit the component's documentation page and check the **Theme** section.

Example: https://ui.nuxt.com/docs/components/button#theme

### Method 2: GitHub Source

Browse the theme files directly:

https://github.com/nuxt/ui/tree/v4/src/theme

Example: https://github.com/nuxt/ui/blob/v4/src/theme/button.ts

### Method 3: MCP Tools (Claude Code)

Use the Nuxt UI MCP tools to fetch component metadata:

```
mcp__nuxt-ui-remote__get_component_metadata(componentName: "Button")
```

This returns:
- All available props
- Prop types and default values
- Available slots
- Component description

---

## Common Customization Patterns

### Pattern 1: Theme All Components

Create a consistent look across your app:

```typescript [app.config.ts]
export default defineAppConfig({
  ui: {
    // Override multiple components
    button: {
      slots: {
        base: 'font-semibold shadow-sm'
      }
    },
    card: {
      slots: {
        root: 'shadow-md hover:shadow-lg transition-shadow'
      }
    },
    input: {
      slots: {
        base: 'rounded-lg border-2'
      }
    }
  }
})
```

### Pattern 2: Component Wrapper

Create a reusable wrapper with custom defaults:

```vue [components/PrimaryButton.vue]
<template>
  <UButton
    color="primary"
    size="lg"
    :ui="{
      base: 'font-bold uppercase tracking-wide'
    }"
    v-bind="$attrs"
  >
    <slot />
  </UButton>
</template>
```

Usage:

```vue
<template>
  <PrimaryButton>Click Me</PrimaryButton>
</template>
```

### Pattern 3: Dynamic UI Prop

Compute ui prop based on component state:

```vue
<script setup>
import { computed } from 'vue'

const props = defineProps<{ isError: boolean }>()

const cardUI = computed(() => ({
  root: props.isError
    ? 'ring-2 ring-error bg-error/5'
    : 'ring-1 ring-default bg-default'
}))
</script>

<template>
  <UCard :ui="cardUI">
    Content
  </UCard>
</template>
```

### Pattern 4: Extending Variants

Add new variant options to a component:

```typescript [app.config.ts]
export default defineAppConfig({
  ui: {
    button: {
      variants: {
        // Add new size option
        size: {
          '2xl': {
            base: 'px-8 py-4 text-xl'
          }
        },
        // Add new variant option
        variant: {
          neon: {
            base: 'bg-primary text-white shadow-lg shadow-primary/50'
          }
        }
      }
    }
  }
})
```

Usage:

```vue
<template>
  <UButton size="2xl" variant="neon">
    Big Neon Button
  </UButton>
</template>
```

---

## Tips & Best Practices

### 1. Use tailwind-merge

Nuxt UI uses `tailwind-merge` under the hood, so conflicting classes are automatically resolved:

```vue
<template>
  <!-- font-bold overrides font-medium -->
  <UButton class="font-bold">
    Button
  </UButton>
</template>
```

### 2. Inspect Rendered HTML

Use browser DevTools to see the final computed classes:

```html
<button class="rounded-md font-bold px-4 py-2 bg-primary">
  Button
</button>
```

### 3. Start with Global Config

For consistent styling, start with global config before using `ui` prop:

```typescript [app.config.ts]
// ✅ Good: Consistent across app
export default defineAppConfig({
  ui: {
    button: {
      slots: { base: 'font-bold' }
    }
  }
})
```

```vue
<!-- ❌ Bad: Repetitive -->
<template>
  <UButton :ui="{ base: 'font-bold' }">Save</UButton>
  <UButton :ui="{ base: 'font-bold' }">Cancel</UButton>
  <UButton :ui="{ base: 'font-bold' }">Delete</UButton>
</template>
```

### 4. Use ui Prop for One-Offs

Reserve `ui` prop for special cases:

```vue
<template>
  <!-- Regular buttons use global styles -->
  <UButton>Save</UButton>
  <UButton>Cancel</UButton>

  <!-- Special hero CTA uses custom styles -->
  <UButton
    :ui="{ base: 'text-xl px-8 py-4 font-black' }"
  >
    Get Started
  </UButton>
</template>
```

### 5. Use class Prop for Simple Overrides

For single-property changes, `class` prop is cleaner:

```vue
<template>
  <!-- ✅ Simple and clear -->
  <UButton class="rounded-full">Button</UButton>

  <!-- ❌ Overkill -->
  <UButton :ui="{ base: 'rounded-full' }">Button</UButton>
</template>
```

### 6. Document Custom Variants

If you add custom variants, document them:

```typescript [app.config.ts]
export default defineAppConfig({
  ui: {
    button: {
      variants: {
        // Custom "impact" size for hero CTAs
        size: {
          impact: {
            base: 'px-12 py-6 text-2xl font-black'
          }
        }
      }
    }
  }
})
```

### 7. Test Responsiveness

Always test custom styles at different breakpoints:

```vue
<template>
  <UButton class="text-sm sm:text-base lg:text-lg">
    Responsive Button
  </UButton>
</template>
```

---

## Troubleshooting

### Styles Not Applying

**Problem:** Custom styles don't appear

**Solutions:**
1. Check if you're overriding the correct slot
2. Verify Tailwind classes are valid
3. Use browser DevTools to inspect computed classes
4. Ensure global config changes trigger rebuild

### Conflicting Classes

**Problem:** Multiple classes fighting each other

**Solution:** Trust `tailwind-merge` to resolve conflicts:

```vue
<!-- Last conflicting class wins -->
<template>
  <UButton class="text-sm text-lg">
    <!-- Renders with text-lg -->
    Button
  </UButton>
</template>
```

### Component Doesn't Have ui Prop

**Problem:** Trying to use `ui` prop on component without slots

**Solution:** Use `class` prop instead:

```vue
<!-- ❌ Won't work (Container has no slots) -->
<UContainer :ui="{ base: 'max-w-5xl' }" />

<!-- ✅ Correct -->
<UContainer class="max-w-5xl" />
```

### Default Variants Not Working

**Problem:** Global default variants not applying

**Nuxt Solution:**
- Check `nuxt.config.ts` → `ui.theme.defaultVariants`
- Restart dev server after config changes

**Vue Solution:**
- Check `vite.config.ts` → `ui({ theme: { defaultVariants } })`
- Restart dev server after config changes

---

## Quick Reference

### Customization Methods

| Method | Scope | Priority | Best For |
|--------|-------|----------|----------|
| Global config | All instances | Low | Consistent theming |
| Variant props | Single instance | Medium | Standard variations |
| `ui` prop | Single instance | High | Special cases |
| `class` prop | Single instance | Highest | Simple overrides |

### Configuration Locations

| Framework | Global Config | Theme Registration |
|-----------|---------------|-------------------|
| Nuxt | `app.config.ts` | `nuxt.config.ts` |
| Vue | `vite.config.ts` | `vite.config.ts` |

### Common Slot Names

| Component Type | Common Slots |
|----------------|--------------|
| Layout | `root`, `header`, `body`, `footer` |
| Form | `root`, `label`, `input`, `error`, `help` |
| Button | `base`, `label`, `leadingIcon`, `trailingIcon` |
| Single element | `base` (only) |