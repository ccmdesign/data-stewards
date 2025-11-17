# Component Props Usage Guide

This document outlines the component prop usage patterns based on Figma design specifications and Nuxt UI customization passes.

## Pass 4: Component Prop Customization

Component props are used for per-instance customization. This is the standard way to use Nuxt UI components with built-in variants.

### Button Component

Based on Figma `ButtonPrimary` and `ButtonNeutral` components:

#### Primary Button (Default)
```vue
<UButton color="primary" variant="solid">
  View more
</UButton>
```

#### Neutral Button
```vue
<UButton color="neutral" variant="outline">
  Cancel
</UButton>
```

#### Available Props
- `color`: `'primary' | 'neutral' | 'success' | 'error' | 'warning' | 'info'`
- `variant`: `'solid' | 'outline' | 'soft' | 'ghost'`
- `size`: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`
- `icon`: Icon name for icon-only buttons
- `leading-icon`: Icon before text
- `trailing-icon`: Icon after text

### Card Component

Based on Figma `Card` component structure:

#### Basic Card
```vue
<UCard>
  <template #header>
    <h3>Card Title</h3>
  </template>
  
  Card body content goes here.
  
  <template #footer>
    Footer content
  </template>
</UCard>
```

#### Card Variants
```vue
<!-- Outline (default) -->
<UCard variant="outline">
  Content
</UCard>

<!-- Solid background -->
<UCard variant="solid">
  Content
</UCard>

<!-- Soft background -->
<UCard variant="soft">
  Content
</UCard>

<!-- Subtle background -->
<UCard variant="subtle">
  Content
</UCard>
```

#### Available Props
- `variant`: `'outline' | 'solid' | 'soft' | 'subtle'`
- `ui`: Object to override specific slots (see Pass 5)

### Usage Patterns

#### Pattern 1: Standard Usage (Recommended)
Use component props for all standard variations:
```vue
<UButton color="primary" size="lg" variant="solid">
  Primary Action
</UButton>
```

#### Pattern 2: Semantic Colors
Always use semantic colors, not specific Tailwind colors:
```vue
<!-- ✅ Good -->
<UButton color="primary">Save</UButton>
<UAlert color="error">Error!</UAlert>

<!-- ❌ Bad -->
<UButton class="bg-blue-500">Save</UButton>
```

#### Pattern 3: Component Composition
Combine components using props:
```vue
<UCard>
  <template #header>
    <h2>Title</h2>
  </template>
  
  <p>Content</p>
  
  <template #footer>
    <UButton color="primary">Action</UButton>
  </template>
</UCard>
```

## Customization Hierarchy Reminder

When customizing components, follow this order:

1. **Design Tokens** (Pass 1) - Foundation in `main.css`
2. **Semantic Colors** (Pass 2) - Runtime config in `app.config.ts`
3. **Global Component Defaults** (Pass 3) - Component defaults in `app.config.ts`
4. **Component Props** (Pass 4) - Per-instance customization ← **You are here**
5. **UI Prop** (Pass 5) - Targeted slot overrides
6. **Tailwind Classes** (Pass 6) - Last resort customizations

## Examples from Figma

### ButtonPrimary Pattern
```vue
<!-- Maps to Figma ButtonPrimary -->
<UButton color="primary" variant="solid">
  View more
</UButton>
```

### ButtonNeutral Pattern
```vue
<!-- Maps to Figma ButtonNeutral (icon button) -->
<UButton color="neutral" variant="ghost" icon="i-lucide-sun" square />
```

### Card Pattern
```vue
<!-- Maps to Figma Card component -->
<UCard>
  <template #header>
    <div class="flex items-center gap-2">
      <h3 class="text-xl font-semibold text-highlighted">
        In-Person Intensive
      </h3>
      <UBadge color="primary" variant="soft">5 Days</UBadge>
    </div>
  </template>
  
  <p class="text-muted">
    Immersive experience with faculty and peers...
  </p>
</UCard>
```

