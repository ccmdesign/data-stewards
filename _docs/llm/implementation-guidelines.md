# Implementation Baseline Prompt

This document defines the standard implementation approach for all development tasks in this repository. Follow these guidelines strictly to ensure consistency and maintainability.

## Core Principles

1. **Minimal Code Philosophy**: Write the least amount of custom code possible. Leverage framework defaults.
2. **Framework-First Approach**: Always use built-in functionality before custom implementations.
3. **Clean Separation of Concerns**: Keep presentation, logic, and data handling clearly separated.

## Interface Development Guidelines

### Component Assembly Order (STRICT PRIORITY)

1. **Use NuxtUI Default Components First**
   - Start with the default NuxtUI component that closest matches your needs
   - Explore all available NuxtUI components before considering alternatives
   - Reference: Use `mcp_nuxt-ui_list_components` to discover available components

2. **Customize Using Component Props Only**
   - Use built-in component props for customization (size, variant, color, etc.)
   - DO NOT use props that accept Tailwind classes at this stage
   - Example: `<UButton size="lg" variant="solid" color="primary" />`

3. **Apply Tailwind Classes as Last Resort**
   - Only add Tailwind classes when steps 1 & 2 cannot achieve the desired result
   - When necessary, prefer component class props over direct class attributes
   - Minimize custom styling - question if it's truly needed

### ❌ Bad Example:
```vue
<!-- Jumping straight to custom classes -->
<div class="flex flex-col gap-4 p-6 rounded-lg bg-gray-100">
  <button class="px-4 py-2 bg-blue-500 text-white rounded">Click me</button>
</div>
```

### ✅ Good Example:
```vue
<!-- Using NuxtUI components with built-in props -->
<UCard>
  <UButton size="md" variant="solid" color="primary">Click me</UButton>
</UCard>
```

## Nuxt Framework Guidelines

### 1. Preserve Default Functionality
- NEVER override or bypass Nuxt's default behaviors
- Work WITH the framework, not against it
- If fighting the framework, reconsider your approach

### 2. Leverage Built-in Features
- Use Nuxt's auto-imports (no manual imports for composables, utils, components)
- Utilize Nuxt Content's features for content management
- Prefer file-based routing over programmatic routes
- Use built-in data fetching methods (`useFetch`, `useAsyncData`)

### 3. Minimal JavaScript Rule
- The less custom JS you write, the better
- Question every custom function - can the framework handle it?
- Use computed properties over methods when possible

## View Logic Separation

### 1. Clean Markup
```vue
<template>
  <!-- ❌ BAD: Logic in template -->
  <UCard :title="user.firstName + ' ' + user.lastName">
    <p>{{ new Date(user.createdAt).toLocaleDateString() }}</p>
  </UCard>

  <!-- ✅ GOOD: Clean presentation -->
  <UCard :title="fullName">
    <p>{{ formattedDate }}</p>
  </UCard>
</template>
```

### 2. Data Preparation in Script
```vue
<script setup>
// All data transformation happens here
const fullName = computed(() => `${user.value.firstName} ${user.value.lastName}`)
const formattedDate = computed(() => new Date(user.value.createdAt).toLocaleDateString())

// Deliver ready-to-use values to the template
const displayItems = computed(() => 
  rawItems.value.map(item => ({
    ...item,
    displayTitle: item.title.trim(),
    formattedPrice: `$${item.price.toFixed(2)}`,
    isAvailable: item.stock > 0
  }))
)
</script>
```

### 3. Component Structure Pattern
```vue
<script setup>
// 1. Imports (auto-imported by Nuxt when possible)
// 2. Props/Emits definitions
// 3. Composables
// 4. Reactive state
// 5. Computed properties (all data transformation here)
// 6. Methods (only if absolutely necessary)
// 7. Lifecycle hooks
</script>

<template>
  <!-- Clean, logic-free markup using prepared data -->
</template>
```

## Implementation Checklist

Before implementing any feature:

- [ ] Check if NuxtUI has a component for this use case
- [ ] Review component's built-in props and variants
- [ ] Check if Nuxt/Nuxt Content has built-in functionality
- [ ] Prepare all data transformations in `<script setup>`
- [ ] Ensure template only handles presentation
- [ ] Question every custom class or override
- [ ] Verify you're not duplicating framework functionality

## Common Anti-Patterns to Avoid

1. **Creating custom components that duplicate NuxtUI components**
2. **Writing utility functions that Nuxt already provides**
3. **Adding Tailwind classes before trying component props**
4. **Performing data transformations in templates**
5. **Importing components/composables manually**
6. **Overriding framework defaults without strong justification**

## Quick Reference Decision Tree

```
Need to implement a UI element?
├─ Is there a NuxtUI component? → Use it with default props
│  └─ Need customization? → Use built-in props only
│     └─ Still need changes? → Add minimal Tailwind as last resort
└─ No NuxtUI component? → Consider if truly needed
   └─ Yes → Build with minimal custom code

Need to add functionality?
├─ Does Nuxt/Nuxt Content provide it? → Use built-in feature
└─ No built-in feature? → Implement minimally in composables
```

Remember: Every line of custom code is a future maintenance burden. Default functionality is battle-tested, accessible, and maintained by the community.
