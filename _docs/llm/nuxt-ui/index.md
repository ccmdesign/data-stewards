# Nuxt UI Documentation Index

> This index helps Claude Code navigate Nuxt UI documentation efficiently by providing a structured overview and navigation guide.

## Documentation Files

### 📋 Quick Reference
**File:** `components-overview.md`
**Description:** Complete list of all 100+ Nuxt UI components with descriptions and categories
**Use:** Quick lookup of available components

### 📚 Full Documentation
**File:** `full-docs.md` (1.4MB, 55K+ lines)
**Description:** Comprehensive documentation including all components, guides, and examples
**Use:** Deep reference when detailed information is needed
**Note:** Large file - use selective reading with grep or specific sections

## Component Categories

Components are organized into these categories:

### Layout Components
**Category:** `layout`
**Components:** App, Container, Error, Footer, Header, Main
**Use Case:** Page structure and global layout

### Form Components
**Category:** `form`
**Components:** Form, FormField, Input, Textarea, Select, SelectMenu, Checkbox, CheckboxGroup, RadioGroup, Switch, FileUpload, InputMenu, InputNumber, InputTags, ColorPicker, PinInput, Slider
**Use Case:** All form inputs and validation

### Navigation Components
**Category:** `navigation`
**Components:** NavigationMenu, Breadcrumb, CommandPalette, FooterColumns, Link, Pagination, Stepper, Tabs
**Use Case:** Site navigation, menus, and wayfinding

### Overlay Components
**Category:** `overlay`
**Components:** Modal, Slideover, Drawer, DropdownMenu, ContextMenu, Popover, Toast, Tooltip
**Use Case:** Dialogs, dropdowns, and floating UI

### Page Components
**Category:** `page`
**Components:** Page, PageBody, PageAside, PageHeader, PageHero, PageSection, PageCard, PageFeature, PageCTA, PageGrid, PageColumns, PageList, PageLinks, PageAnchors, PageLogos, AuthForm, BlogPost, BlogPosts, ChangelogVersion, ChangelogVersions, PricingPlan, PricingPlans, PricingTable
**Use Case:** Pre-built page sections for landing pages, blogs, pricing, etc.

### Dashboard Components
**Category:** `dashboard`
**Components:** DashboardGroup, DashboardSidebar, DashboardPanel, DashboardNavbar, DashboardToolbar, DashboardSearch, DashboardSearchButton, DashboardSidebarCollapse, DashboardSidebarToggle, DashboardResizeHandle
**Use Case:** Admin interfaces and dashboards

### Data Display Components
**Category:** `data`
**Components:** Table, Accordion, Carousel, Empty, Marquee, Timeline, Tree, User
**Use Case:** Displaying structured data and lists

### Element Components
**Category:** `element`
**Components:** Alert, Avatar, AvatarGroup, Badge, Banner, Button, Calendar, Card, Chip, Collapsible, FieldGroup, Icon, Kbd, Progress, Separator, Skeleton
**Use Case:** Basic UI elements and building blocks

### Content Components
**Category:** `content`
**Components:** ContentNavigation, ContentSearch, ContentSearchButton, ContentSurround, ContentToc
**Use Case:** Nuxt Content integration for documentation sites

### Chat Components
**Category:** `chat`
**Components:** ChatMessage, ChatMessages, ChatPalette, ChatPrompt, ChatPromptSubmit
**Use Case:** AI chat interfaces with Vercel AI SDK integration

### Color Mode Components
**Category:** `color-mode`
**Components:** ColorModeAvatar, ColorModeButton, ColorModeImage, ColorModeSelect, ColorModeSwitch
**Use Case:** Dark/light mode support

### i18n Components
**Category:** `i18n`
**Components:** LocaleSelect
**Use Case:** Internationalization

## Documentation Sections in full-docs.md

The full documentation file contains these major sections:

1. **Introduction** (Lines 1-130)
   - What is Nuxt UI
   - Core technologies (Reka UI, Tailwind CSS v4, Tailwind Variants)
   - Key features

2. **Installation** (Lines 132-573)
   - Nuxt installation guide
   - Vue installation guide (Vite, Laravel, AdonisJS)
   - Configuration options

3. **Migration Guides** (Lines 1253-2003)
   - Migration to v4 from Nuxt UI Pro
   - Migration to v3 from v2
   - Breaking changes and upgrade paths

4. **Getting Started Guides** (Lines ~600-1250)
   - Contribution guide
   - Component creation guides
   - Documentation templates

5. **Theme & Design System** (Lines ~2000-5000)
   - Design system overview
   - CSS variables and design tokens
   - Component customization
   - Tailwind Variants API

6. **Integrations** (Lines ~5000-7000)
   - Icons (Nuxt Icon / Iconify)
   - Fonts (Nuxt Fonts)
   - Color Mode (Nuxt Color Mode / VueUse)
   - i18n (50+ locales)
   - Content (Nuxt Content)
   - MCP Server
   - LLMs.txt

7. **Component Documentation** (Lines ~7000-55000)
   - 100+ individual component docs
   - Each includes: description, props, slots, events, examples, theme

8. **Composables** (Near end)
   - defineShortcuts
   - useFormField
   - useOverlay
   - useToast

## Search Strategies

### Finding a Specific Component

**Method 1: Use MCP Tool**
```
mcp__nuxt-ui-remote__get_component({ componentName: "Button" })
```

**Method 2: Grep the full docs**
```
grep -n "^# Button$" _docs/llm/nuxt-ui/full-docs.md
```

**Method 3: Check components-overview**
Load `components-overview.md` and search for the component

### Finding Components by Use Case

Refer to the **Component Categories** section above to find components by category.

### Getting Theme/Customization Info

Search full-docs.md for:
- "Design System" (design tokens and colors)
- "CSS Variables" (theming system)
- "Customize components" (Tailwind Variants API)

### Getting Integration Info

Search full-docs.md for specific integrations:
- "Icons" for Iconify integration
- "Color Mode" for dark/light mode
- "i18n" for internationalization
- "Content" for Nuxt Content integration

## Quick Tips for Claude

1. **For component selection:** Check the Component Categories section first
2. **For specific component API:** Use MCP `get_component` tool
3. **For implementation examples:** Check full-docs.md component sections
4. **For layout patterns:** Reference Page and Dashboard component categories
5. **For forms:** Use Form + FormField pattern with appropriate input components
6. **For overlays:** Modal (center), Slideover/Drawer (side), Popover (floating)

## File Paths

All documentation is located in: `_docs/llm/nuxt-ui/`

- `index.md` (this file) - Navigation and overview
- `components-overview.md` - Component list with categories
- `full-docs.md` - Complete documentation (large file, use selectively)

## Usage Pattern

When building UI with Nuxt UI:
1. **Analyze the design** - Identify UI patterns (form, dashboard, landing page, etc.)
2. **Match to categories** - Use the component categories above to find candidates
3. **Select components** - Choose the most appropriate component for each element
4. **Reference details** - Use MCP tools or full-docs.md for specific API details
5. **Compose** - Build the interface with proper component composition