---
name: nuxt-ui-wireframe-builder
description: This skill should be used when users provide wireframes, mockups, UI sketches, Figma links, or interface designs that need to be implemented using Nuxt UI components. The skill helps analyze visual designs and select the most appropriate Nuxt UI components to build production-ready Vue interfaces.
---

# Nuxt UI Wireframe Builder

## Purpose

Assist in translating wireframes, mockups, and UI designs into production-ready Vue components using Nuxt UI v4. Analyze visual designs (images, sketches, text descriptions, or Figma links) and recommend the best Nuxt UI components for each UI element.

## When to Use This Skill

Activate this skill when the user:
- Provides an image of a wireframe or UI mockup
- Shares a Figma design link
- Uploads a sketch or screenshot of an interface
- Describes a UI layout they want to build
- Asks to implement a specific interface pattern (dashboard, landing page, form, etc.)

## Workflow

### Step 1: Analyze the Input

**For Image/Screenshot Inputs:**
1. Examine the overall layout structure
2. Identify distinct sections (header, hero, features, footer, etc.)
3. List all UI elements (buttons, forms, cards, navigation, etc.)
4. Note any interactive components (dropdowns, modals, tooltips)
5. Observe visual hierarchy and spacing

**For Text Descriptions:**
1. Extract key UI elements mentioned
2. Clarify ambiguous requirements with questions
3. Identify the primary use case (marketing, dashboard, documentation, etc.)

**For Figma Links:**
1. Use WebFetch to access the design if publicly available
2. Extract component hierarchy and layout structure
3. Note design tokens (colors, spacing, typography)

### Step 2: Component Selection Strategy

Reference the `references/component-selection-guide.md` for detailed component mapping. Apply these principles:

**Layout Components (Structural):**
- Use `Container` for constraining content width
- Use `Page` with `PageBody` and `PageAside` for documentation-style layouts
- Use `DashboardGroup` with `DashboardSidebar` and `DashboardPanel` for admin interfaces
- Use `Header` and `Footer` for global navigation
- Use `PageSection` for landing page sections

**Content Components:**
- Use `Card` for generic content containers
- Use `PageCard` for feature showcases and testimonials
- Use `PageHero` for landing page heroes
- Use `PageFeature` for highlighting key features
- Use `BlogPost`/`BlogPosts` for blog content

**Navigation Components:**
- Use `NavigationMenu` for primary navigation (header/sidebar)
- Use `Breadcrumb` for hierarchical navigation
- Use `Tabs` for switching between views
- Use `Stepper` for multi-step processes
- Use `ContentNavigation` for documentation navigation

**Form Components:**
- Use `Form` with `FormField` for validated forms
- Use `AuthForm` for login/register flows
- Use `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup` for form inputs
- Use `InputMenu` for autocomplete functionality
- Use `FileUpload` for file inputs

**Feedback Components:**
- Use `Alert` for callouts and notices
- Use `Toast` for notifications (via `useToast()`)
- Use `Modal` for dialogs requiring user attention
- Use `Drawer`/`Slideover` for side panels
- Use `Skeleton` for loading states

**Data Display:**
- Use `Table` for tabular data
- Use `Avatar`/`AvatarGroup` for user representations
- Use `Badge` and `Chip` for labels and counts
- Use `Timeline` for chronological events
- Use `Accordion` for collapsible content

### Step 3: Component Composition

Follow these composition patterns:

1. **Layout-first approach**: Start with structural components
2. **Semantic hierarchy**: Use proper component nesting
3. **Accessibility**: Ensure proper ARIA attributes (Nuxt UI handles most automatically)
4. **Responsive design**: Leverage Tailwind classes for responsiveness
5. **Color mode**: Use `UColorModeImage` for theme-aware assets

### Step 4: Code Generation

Generate Vue single-file components with:

**Script Section:**
```vue
<script setup lang="ts">
// Define reactive state
// Define component logic
// Use composables (useColorMode, useToast, etc.)
</script>
```

**Template Section:**
```vue
<template>
  <!-- Use proper Nuxt UI component structure -->
  <!-- Apply Tailwind classes for custom styling -->
  <!-- Use slots where appropriate -->
</template>
```

**Style Section (if needed):**
```vue
<style scoped>
/* Only add styles that cannot be achieved with Tailwind */
</style>
```

### Step 5: Best Practices

**Component Selection:**
- Prefer specialized components over generic ones (e.g., `PageCard` over `Card` for landing pages)
- Use composition over duplication (extract reusable patterns)
- Consider the component's intended use case from documentation

**Styling:**
- Use Nuxt UI's design tokens (primary, secondary, neutral, etc.)
- Leverage the `ui` prop for component-specific customization
- Use Tailwind utility classes for spacing and layout
- Respect the project's existing color scheme

**Accessibility:**
- Nuxt UI components are accessible by default
- Add `aria-label` for icon-only buttons
- Ensure proper heading hierarchy
- Use semantic HTML through Nuxt UI components

**Performance:**
- Lazy load images with `NuxtImg` or `NuxtPicture`
- Use `Skeleton` for loading states
- Consider code splitting for large components

## Component Documentation Access

Access comprehensive Nuxt UI documentation through:
- **Documentation Index**: `_docs/llm/nuxt-ui/index.md` - Navigation guide with component categories and search strategies
- **Components Overview**: `_docs/llm/nuxt-ui/components-overview.md` - Quick reference list of all 100+ components
- **Full Documentation**: `_docs/llm/nuxt-ui/full-docs.md` - Complete docs (large file, use selectively with grep or Read tool with offset)
- **MCP Tools**:
  - Use `mcp__nuxt-ui-remote__get_component` for specific component details
  - Use `mcp__nuxt-ui-remote__list_components` to explore available components

**Recommended Approach:**
1. Start with `index.md` to understand structure and find component categories
2. Use MCP tools for quick component lookups
3. Reference `full-docs.md` only when detailed examples or theme information is needed

## Examples

**Example 1: Simple Landing Hero**
```vue
<script setup lang="ts">
const links = [{
  label: 'Get Started',
  color: 'primary',
  size: 'lg'
}, {
  label: 'Learn More',
  color: 'neutral',
  variant: 'outline',
  size: 'lg'
}]
</script>

<template>
  <UPageHero
    title="Welcome to Our Product"
    description="Build faster, ship sooner, and scale effortlessly."
    :links="links"
  />
</template>
```

**Example 2: Dashboard Layout**
```vue
<template>
  <UDashboardGroup>
    <UDashboardSidebar>
      <UNavigationMenu :items="navigation" orientation="vertical" />
    </UDashboardSidebar>

    <UDashboardPanel>
      <UDashboardNavbar>
        <template #left>
          <h1>Dashboard</h1>
        </template>
      </UDashboardNavbar>

      <slot />
    </UDashboardPanel>
  </UDashboardGroup>
</template>
```

**Example 3: Contact Form**
```vue
<script setup lang="ts">
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Invalid email'),
  message: z.string().min(10, 'Message too short')
})

const state = reactive({
  email: '',
  message: ''
})

async function onSubmit() {
  // Handle form submission
}
</script>

<template>
  <UForm :state="state" :schema="schema" @submit="onSubmit">
    <UFormField label="Email" name="email">
      <UInput v-model="state.email" type="email" />
    </UFormField>

    <UFormField label="Message" name="message">
      <UTextarea v-model="state.message" />
    </UFormField>

    <UButton type="submit">Send Message</UButton>
  </UForm>
</template>
```

## Output Format

Provide output in this structure:

1. **Analysis Summary**: Brief overview of the design
2. **Component Recommendations**: List of Nuxt UI components with rationale
3. **Implementation Code**: Complete Vue component code
4. **Notes**: Any important considerations or alternatives

## Reference Files

Load `references/component-selection-guide.md` for detailed component selection patterns and decision trees when building complex interfaces.