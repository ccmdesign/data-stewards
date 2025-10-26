# Nuxt UI Component Selection Guide

A comprehensive reference for selecting the right Nuxt UI components based on UI patterns and use cases.

## Table of Contents

1. [Quick Component Finder](#quick-component-finder)
2. [Layout Patterns](#layout-patterns)
3. [Common UI Patterns](#common-ui-patterns)
4. [Component Decision Trees](#component-decision-trees)
5. [Component Composition Patterns](#component-composition-patterns)

---

## Quick Component Finder

### By Use Case

| Use Case | Recommended Components |
|----------|------------------------|
| Marketing landing page | `PageHero`, `PageFeature`, `PageSection`, `PageCTA`, `Footer` |
| Dashboard/Admin | `DashboardGroup`, `DashboardSidebar`, `DashboardNavbar`, `Table`, `Card` |
| Documentation site | `Page`, `PageBody`, `PageAside`, `ContentNavigation`, `ContentToc`, `Breadcrumb` |
| Blog | `BlogPosts`, `BlogPost`, `PageHeader`, `Container` |
| Authentication | `AuthForm`, `Card`, `Form`, `FormField` |
| E-commerce product | `Card`, `Carousel`, `Button`, `Badge`, `Tabs` |
| Settings page | `Form`, `FormField`, `Switch`, `Select`, `Tabs` |
| Data management | `Table`, `Modal`, `Form`, `Alert`, `Pagination` |

### By UI Element

| UI Element | Component Options | When to Use Each |
|------------|-------------------|------------------|
| **Card-like container** | `Card`, `PageCard` | Use `Card` for generic content; `PageCard` for landing pages with icon/image |
| **Hero section** | `PageHero`, `Container` + custom | Use `PageHero` for full-featured heroes; custom for unique designs |
| **Navigation** | `NavigationMenu`, `Header`, `Breadcrumb` | `NavigationMenu` for links; `Header` for complete headers; `Breadcrumb` for paths |
| **Sidebar** | `DashboardSidebar`, `PageAside` | `DashboardSidebar` for collapsible admin sidebars; `PageAside` for doc navigation |
| **Form input** | `Input`, `Textarea`, `Select`, `Checkbox` | Choose based on input type; always wrap in `FormField` |
| **Button group** | `FieldGroup`, `Tabs` | `FieldGroup` for segmented controls; `Tabs` for view switching |
| **Dialog** | `Modal`, `Slideover`, `Drawer` | `Modal` for center dialogs; `Slideover`/`Drawer` for side panels |
| **Notification** | `Toast`, `Alert`, `Banner` | `Toast` for temporary; `Alert` for inline; `Banner` for persistent |
| **Loading state** | `Skeleton`, `Progress`, `Spinner` | `Skeleton` for content; `Progress` for uploads; `Spinner` for actions |

---

## Layout Patterns

### 1. Marketing Landing Page

**Structure:**
```
Container
├── Header (with NavigationMenu)
├── PageHero
├── PageSection (Features)
│   └── PageGrid
│       └── PageCard (multiple)
├── PageSection (Testimonials)
├── PageSection (Pricing)
│   └── PricingPlans
│       └── PricingPlan (multiple)
├── PageCTA
└── Footer
```

**Key Components:**
- `Container`: Constrains content width
- `Header`: Global navigation with logo and links
- `PageHero`: Large hero with title, description, CTAs
- `PageSection`: Wraps each major section
- `PageCard`: Feature cards with icons
- `PricingPlans`: Grid of pricing tiers
- `Footer`: Footer with links and social

### 2. Dashboard/Admin Interface

**Structure:**
```
DashboardGroup
├── DashboardSidebar
│   ├── NavigationMenu (vertical)
│   └── DashboardSidebarCollapse
├── DashboardPanel
│   ├── DashboardNavbar
│   │   ├── DashboardSidebarToggle
│   │   └── ColorModeButton
│   └── Container
│       └── [Page Content]
```

**Key Components:**
- `DashboardGroup`: Provides sidebar context
- `DashboardSidebar`: Collapsible sidebar with navigation
- `DashboardNavbar`: Top bar with actions
- `Table`: Display data with sorting/filtering
- `Modal`: Forms and detail views
- `Card`: Group related information

### 3. Documentation Site

**Structure:**
```
Page
├── PageHeader
├── PageBody
│   └── [Markdown Content with Prose components]
├── PageAside
│   ├── ContentNavigation
│   └── ContentToc
```

**Key Components:**
- `Page`: Three-column layout (aside, body, aside)
- `PageHeader`: Page title and description
- `ContentNavigation`: Sidebar navigation tree
- `ContentToc`: Table of contents
- `Prose*`: Styled markdown components

### 4. Blog Layout

**Structure:**
```
Container
├── PageHeader
├── BlogPosts (index page)
│   └── [Auto-generated from content]
└── BlogPost (detail page)
    └── [Full article with metadata]
```

**Key Components:**
- `BlogPosts`: Grid of blog post cards
- `BlogPost`: Full article layout with author, date, tags
- `PageHeader`: Page/article title

### 5. E-commerce Product Page

**Structure:**
```
Container
├── Breadcrumb
└── PageColumns
    ├── [Column: Image Carousel]
    │   └── Carousel
    ├── [Column: Product Details]
    │   ├── Badge (New/Sale)
    │   ├── [Title and Price]
    │   ├── Tabs (Description/Reviews)
    │   └── Form (Add to Cart)
    └── [Column: Related Info]
```

**Key Components:**
- `Carousel`: Product images
- `Tabs`: Switch between info sections
- `Badge`: Highlight status
- `Form`: Add to cart with variants

---

## Common UI Patterns

### Authentication Forms

**Login Form:**
```vue
<UAuthForm
  type="login"
  :fields="[
    { name: 'email', type: 'email', label: 'Email', placeholder: 'Enter your email' },
    { name: 'password', type: 'password', label: 'Password', placeholder: 'Enter your password' }
  ]"
  :links="[
    { label: 'Forgot password?', to: '/forgot-password' },
    { label: 'Sign up', to: '/register' }
  ]"
  @submit="onLogin"
/>
```

**Custom Form:**
```vue
<UCard>
  <UForm :state="state" :schema="schema" @submit="onSubmit">
    <UFormField label="Email" name="email">
      <UInput v-model="state.email" type="email" />
    </UFormField>

    <UFormField label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormField>

    <UButton type="submit" block>Sign In</UButton>
  </UForm>
</UCard>
```

### Feature Showcase

**Grid of Features:**
```vue
<UPageSection>
  <template #title>Features</template>
  <template #description>Everything you need to build great products</template>

  <UPageGrid>
    <UPageCard
      v-for="feature in features"
      :key="feature.title"
      :title="feature.title"
      :description="feature.description"
      :icon="feature.icon"
    />
  </UPageGrid>
</UPageSection>
```

### Data Tables with Actions

```vue
<UTable
  :columns="columns"
  :rows="rows"
  :loading="loading"
>
  <template #actions-data="{ row }">
    <UDropdownMenu :items="[
      [{ label: 'Edit', icon: 'i-lucide-pencil', onClick: () => edit(row) }],
      [{ label: 'Delete', icon: 'i-lucide-trash', onClick: () => delete(row) }]
    ]">
      <UButton icon="i-lucide-more-horizontal" variant="ghost" />
    </UDropdownMenu>
  </template>
</UTable>
```

### Modal Form Pattern

```vue
<template>
  <UButton @click="open = true">Add Item</UButton>

  <UModal v-model:open="open" title="Add New Item">
    <UForm :state="state" @submit="onSubmit">
      <UFormField label="Name" name="name">
        <UInput v-model="state.name" />
      </UFormField>

      <template #footer>
        <UButton type="submit">Save</UButton>
        <UButton variant="outline" @click="open = false">Cancel</UButton>
      </template>
    </UForm>
  </UModal>
</template>
```

### Tabbed Content

```vue
<UTabs :items="tabs">
  <template #overview>
    <p>Overview content...</p>
  </template>

  <template #features>
    <p>Features content...</p>
  </template>

  <template #pricing>
    <p>Pricing content...</p>
  </template>
</UTabs>
```

---

## Component Decision Trees

### Navigation Components

```
Need navigation?
├─ Global site navigation
│  ├─ With logo/branding → Header + NavigationMenu
│  └─ Simple links → NavigationMenu
├─ Hierarchical path → Breadcrumb
├─ Section navigation
│  ├─ Dashboard sidebar → DashboardSidebar + NavigationMenu (vertical)
│  └─ Docs sidebar → ContentNavigation
└─ View switching → Tabs
```

### Container Components

```
Need to group content?
├─ Constrain width → Container
├─ Visual card
│  ├─ Landing page feature → PageCard
│  └─ Generic content → Card
├─ Page layout
│  ├─ Documentation → Page (with PageBody/PageAside)
│  └─ Dashboard → DashboardGroup
└─ Section wrapper → PageSection
```

### Form Components

```
Need form input?
├─ Complete auth form → AuthForm
├─ Custom form
│  ├─ Need validation → Form + FormField + [inputs]
│  └─ Simple input → Input/Textarea/Select
├─ Input type
│  ├─ Short text → Input
│  ├─ Long text → Textarea
│  ├─ Single choice → Select or RadioGroup
│  ├─ Multiple choices → CheckboxGroup
│  ├─ True/false → Switch or Checkbox
│  ├─ Number → InputNumber
│  ├─ Date → Calendar (in FormField)
│  ├─ File → FileUpload
│  ├─ Color → ColorPicker
│  └─ Autocomplete → InputMenu or SelectMenu
└─ Grouping → FieldGroup
```

### Overlay Components

```
Need overlay?
├─ User must respond → Modal
├─ Additional context → Popover or Tooltip
├─ Side panel
│  ├─ Settings/filters → Slideover
│  └─ Chat/notifications → Drawer
├─ Context menu → ContextMenu
├─ Dropdown actions → DropdownMenu
└─ Command palette → CommandPalette
```

---

## Component Composition Patterns

### Pattern 1: Feature Section with Icons

**When:** Showcasing 3-6 product features on a landing page

**Components:** `PageSection` > `PageGrid` > `PageCard`

```vue
<UPageSection>
  <template #title>Why Choose Us</template>
  <template #description>Features that make us stand out</template>

  <UPageGrid :cols="3">
    <UPageCard
      title="Fast Performance"
      description="Lightning-fast load times"
      icon="i-lucide-zap"
    />
    <UPageCard
      title="Secure"
      description="Enterprise-grade security"
      icon="i-lucide-shield"
    />
    <UPageCard
      title="Scalable"
      description="Grows with your business"
      icon="i-lucide-trending-up"
    />
  </UPageGrid>
</UPageSection>
```

### Pattern 2: Dashboard Stat Cards

**When:** Showing key metrics/KPIs

**Components:** `PageGrid` > `Card`

```vue
<UPageGrid :cols="4">
  <UCard v-for="stat in stats" :key="stat.label">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-muted">{{ stat.label }}</p>
        <p class="text-2xl font-bold">{{ stat.value }}</p>
      </div>
      <UIcon :name="stat.icon" class="size-8 text-muted" />
    </div>
  </UCard>
</UPageGrid>
```

### Pattern 3: Settings Form with Tabs

**When:** Multiple settings categories

**Components:** `Tabs` > `Form` + `FormField`

```vue
<UTabs :items="[
  { label: 'General', value: 'general' },
  { label: 'Security', value: 'security' },
  { label: 'Notifications', value: 'notifications' }
]">
  <template #general>
    <UForm :state="generalState" @submit="saveGeneral">
      <UFormField label="Display Name" name="name">
        <UInput v-model="generalState.name" />
      </UFormField>
      <!-- More fields -->
    </UForm>
  </template>

  <!-- Other tabs -->
</UTabs>
```

### Pattern 4: Master-Detail View

**When:** List of items with detail panel

**Components:** `Table` + `Slideover` or `Modal`

```vue
<template>
  <UTable
    :rows="items"
    @select="selectedItem = $event"
  />

  <USlideover v-model:open="!!selectedItem">
    <template #header>
      {{ selectedItem?.name }}
    </template>

    <div class="p-4">
      <!-- Item details -->
    </div>
  </USlideover>
</template>
```

### Pattern 5: Multi-Step Form

**When:** Complex forms with multiple steps

**Components:** `Stepper` + `Form`

```vue
<UStepper :items="steps" :model-value="currentStep">
  <template #step-1>
    <UForm :state="step1State" @submit="goToStep2">
      <!-- Step 1 fields -->
    </UForm>
  </template>

  <template #step-2>
    <UForm :state="step2State" @submit="goToStep3">
      <!-- Step 2 fields -->
    </UForm>
  </template>

  <!-- More steps -->
</UStepper>
```

---

## Tips for Component Selection

### Prefer Specialized Components

❌ **Don't:**
```vue
<div class="card">
  <img :src="icon" />
  <h3>{{ title }}</h3>
  <p>{{ description }}</p>
</div>
```

✅ **Do:**
```vue
<UPageCard
  :title="title"
  :description="description"
  :icon="icon"
/>
```

### Use Composition

❌ **Don't duplicate:**
```vue
<UCard>
  <div class="header">...</div>
  <!-- Repeated structure -->
</UCard>
<UCard>
  <div class="header">...</div>
  <!-- Repeated structure -->
</UCard>
```

✅ **Do extract:**
```vue
<StatCard v-for="stat in stats" :key="stat.id" :stat="stat" />
```

### Consider Context

**Landing Page:**
- Use `PageCard` over `Card`
- Use `PageSection` for structure
- Use `PageHero` for heroes

**Dashboard:**
- Use `DashboardGroup` for layout
- Use `Card` for content blocks
- Use `Table` for data

**Documentation:**
- Use `Page` with `PageBody`/`PageAside`
- Use `ContentNavigation` for sidebar
- Use `Prose*` components for content

### Leverage Built-in Features

Many components have built-in features:
- `Table`: sorting, pagination, selection
- `Form`: validation, error handling
- `CommandPalette`: search, keyboard navigation
- `Modal`: focus trap, ESC to close
- `Carousel`: swipe, autoplay, navigation

Use these instead of building custom solutions.

---

## Common Mistakes to Avoid

1. **Using `div` when a component exists**: Check if Nuxt UI has a component before creating custom markup

2. **Over-nesting**: Keep component hierarchy shallow and semantic

3. **Ignoring responsive design**: Use Tailwind responsive classes (`sm:`, `md:`, `lg:`)

4. **Not using `FormField`**: Always wrap form inputs in `FormField` for proper validation

5. **Missing accessibility**: Let Nuxt UI components handle accessibility; don't override ARIA attributes

6. **Inconsistent colors**: Use design tokens (`primary`, `secondary`) instead of direct colors

7. **Reinventing overlays**: Use built-in `Modal`, `Popover`, `Tooltip` instead of custom solutions

---

## Resource Access

For component-specific details:
- **Start here**: `_docs/llm/nuxt-ui/index.md` for navigation and component categories
- **Quick reference**: `_docs/llm/nuxt-ui/components-overview.md` for component list
- **Detailed docs**: `_docs/llm/nuxt-ui/full-docs.md` for full documentation (use grep or selective reading)
- **MCP tools**: `mcp__nuxt-ui-remote__get_component` for live component details